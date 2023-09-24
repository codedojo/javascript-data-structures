using System;
using System.Linq;

namespace ads2_m6_btree
{
    public class BTree<T>
        where T : IComparable<T>
    {
        // The minimal degree of the tree
        private readonly int MinimalDegree;

        // The root node. Null until the first item is added
        // Only ever assigned to in Add
        private BTreeNode<T> Root;

        public BTree(int minimalDegree = 7)
        {
            MinimalDegree = minimalDegree;
        }

        // The number of items in the tree
        public int Count
        {
            get;
            private set;
        }

        // The current height of the tree
        // Grows in SplitRootNode, shrinks in PushDownMinimalRoot
        public int Height
        {
            get;
            private set;
        }

        /*
         * Adds the value to the B-Tree
         */
        public void Add(T value)
        {
            // If the tree is empty, allocate a new root
            // and add the value to it
            if (Count == 0)
            {
                Root = new BTreeNode<T>(MinimalDegree,
                    new T[] { value },
                    new BTreeNode<T>[0]);
            }
            else
            {
                // If the root is full we need to split it
                // before we insert into it (we only insert
                // into non-full nodes)
                if (Root.Full)
                {
                    SplitRootNode(Root);
                }

                // Now that we know the root is not full
                // we can insert into it
                InsertNonFull(Root, value);
            }

            Count++;
        }

        #region Add internal methods


        /*
         * By the time we call this function we _know_ that
         * the node is non-full because we split before calling
         * this.
         */
        private void InsertNonFull(BTreeNode<T> node, T value)
        {
            // if this is a leaf node, add the value
            // we only add values to leaf nodes
            if (node.Leaf)
            {
                // add the value in sort order
                node.Values.Insert(ChildIndex(node, value), value);
            }
            else
            {
                // find the child where the value would be added
                int childIndex = ChildIndex(node, value);
                BTreeNode<T> child = node.Children[childIndex];

                // if that child node is full the split it
                if (child.Full)
                {
                    SplitChildNode(node, childIndex);

                    // re-find the child node where the value would be added
                    child = node.Children[ChildIndex(node, value)];
                }

                // insert the node into our non-full child
                InsertNonFull(child, value);
            }
        }

        /*
         * Splits a child node by pulling the middle node up from it
         * into the current (parent) node.
         * 
         *       [3          9]
         *  [1 2] [4 5 6 7 8] [10 11] 
         *  
         *  splitting [4 5 6 7 8] would pull 6 up to its parent
         *  
         *      [3     6     9]
         *  [1 2] [4 5] [7 8] [10 11] 
         */
        private void SplitChildNode(BTreeNode<T> parent, int childIndex)
        {
            BTreeNode<T> child = parent.Children[childIndex];

            // the child value index we'll split at (6)
            int middleIndex = child.Values.Count / 2;

            // [4 5]
            var left = new BTreeNode<T>(MinimalDegree,
                child.Values.Take(middleIndex),
                child.Children.Take(middleIndex + 1));

            // [7 8]
            var right = new BTreeNode<T>(MinimalDegree,
                child.Values.TakeLast(middleIndex),
                child.Children.TakeLast(middleIndex + 1));

            // add 6 to [3, 9] making [3, 6, 9]
            parent.Values.Insert(childIndex, child.Values[middleIndex]);

            // remove [4 5 6 7 8]
            parent.Children.RemoveAt(childIndex);

            // add the child point to [4, 5] and [7, 8]
            // add right first to maintain ordering
            parent.Children.Insert(childIndex, right);
            parent.Children.Insert(childIndex, left);

            parent.Validate();
            left.Validate();
            right.Validate();
        }

        /*
         * Splits the root by pushing down left 
         * and right children keeping only a middle value
         * in the root
         * 
         *  [1 2 3 4 5] 
         *  
         *  becomes
         *  
         *      [3]
         *  [1 2] [4 5]
         */
        private void SplitRootNode(BTreeNode<T> node)
        {
            // the middle index of the root (3)
            int middleIndex = node.Values.Count / 2;

            // the next left child [1 2]
            var left = new BTreeNode<T>(MinimalDegree,
                node.Values.Take(middleIndex),
                node.Children.Take(middleIndex + 1));

            // the new right child [4 5]
            var right = new BTreeNode<T>(MinimalDegree,
                node.Values.TakeLast(middleIndex),
                node.Children.TakeLast(middleIndex + 1));

            // Remove [1 2] and [4 5] from the root
            node.Values.RemoveRange(0, middleIndex);
            node.Values.RemoveRange(1, middleIndex);

            // clear all the root node children
            // (the left and right nodes have those children)
            node.Children.Clear();

            // Add the new left and right children
            node.Children.Add(left);
            node.Children.Add(right);

            node.Validate();

            // Splitting the root is the only
            // way that the height grows
            Height++;

        }

        #endregion


        /*
         * If the value exists in the tree, remove it.
         * If the value exists more than once, remove the 
         * first instance.
         * 
         * Returns true if a value was removed, false otherwise
         * 
         */
        public bool Remove(T value)
        {
            // true if we removed a value
            bool removed = RemoveFromNode(Root, value);
            if (removed)
            {
                Count--;

                // if this was our last node, null our Root
                // so we don't hold a reference to it
                if (Count == 0)
                {
                    Root = null;
                }
            }

            return removed;
        }

        #region Remove internal methods

        private bool RemoveFromNode(BTreeNode<T> node, T value)
        {
            // case 1: leaf node
            if (node.Leaf)
            {
                return RemoveValueFromLeaf(node, value);
            }

            // case 2: non-leaf but we found the value
            if (node.Values.Contains(value))
            {
                return RemoveFromNode(PushDown(node, value), value);
            }

            // case 3: find where it would be, ensure the child isn't minimal,
            //         and head to that node to remove if it exists 
            int childIndex = ChildIndex(node, value);
            BTreeNode<T> child = node.Children[childIndex];

            if (child.Minimal)
            {
                child = RotateOrPushDown(node, childIndex, value);
            }

            return RemoveFromNode(child, value);
        }

        private BTreeNode<T> RotateOrPushDown(BTreeNode<T> parent, int childIndex, T value)
        {
            // child is minimal and needs a node

            BTreeNode<T> child = parent.Children[childIndex];

            if (childIndex > 0 && !parent.Children[childIndex - 1].Minimal)
            {
                return RotateRight(parent, child, childIndex);
            }
            else if (childIndex + 1 < parent.Children.Count && !parent.Children[childIndex + 1].Minimal)
            {
                return RotateLeft(parent, child, childIndex);
            }
            else if (parent.Values.Count == 1 && parent == Root)
            {
                //      [3]
                // [1 2]   [4 5]

                // [1 2 3 4 5]

                return PushDownMinimalRoot();
            }
            else
            {
                return PushDown(parent, parent.Values[childIndex]);
            }
        }

        private BTreeNode<T> RotateRight(BTreeNode<T> parent, BTreeNode<T> child, int childIndex)
        {
            // the left sibling has a node to spare
            BTreeNode<T> left = parent.Children[childIndex - 1];
            T valueToPromote = left.Values.Last();
            T rootValueToMoveRight = parent.Values[childIndex - 1];

            // move the left sibling last node to root value
            parent.Values[childIndex - 1] = valueToPromote;

            // move the root value and children to the node
            child.Values.Insert(0, rootValueToMoveRight);

            // remove the value and child from the left sibling
            left.Values.RemoveAt(left.Values.Count - 1);

            if (!left.Leaf)
            {
                child.Children.Insert(0, left.Children.Last());
                left.Children.RemoveAt(left.Children.Count - 1);
            }

            child.Validate();

            return child;
        }

        private BTreeNode<T> RotateLeft(BTreeNode<T> parent, BTreeNode<T> child, int childIndex)
        {
            // right sibling has one to spare
            BTreeNode<T> right = parent.Children[childIndex + 1];
            T valueToPromote = right.Values.First();
            T rootValueToMoveLeft = parent.Values[childIndex];

            // move the right sibling first node to root value
            parent.Values[childIndex] = valueToPromote;

            // move the root value and children to the node
            child.Values.Add(rootValueToMoveLeft);

            // remove the value and child from the left sibling
            right.Values.RemoveAt(0);

            if (!right.Leaf)
            {
                child.Children.Add(right.Children.First());
                right.Children.RemoveAt(0);
            }

            child.Validate();
            return child;
        }

        private BTreeNode<T> PushDownMinimalRoot()
        {
            BTreeNode<T> left = Root.Children[0];
            BTreeNode<T> right = Root.Children[1];

            T rootValue = Root.Values[0];
            Root.Values.Clear();
            Root.Values.AddRange(left.Values);
            Root.Values.Add(rootValue);
            Root.Values.AddRange(right.Values);

            Root.Children.Clear();
            Root.Children.AddRange(left.Children);
            Root.Children.AddRange(right.Children);

            Root.Validate();

            Height--;

            return Root;
        }

        private BTreeNode<T> PushDown(BTreeNode<T> node, T value)
        {
            int index = ChildIndex(node, value);

            BTreeNode<T> left = node.Children[index];
            BTreeNode<T> right = node.Children[index + 1];

            left.Values.Add(value);
            left.Values.AddRange(right.Values);
            left.Children.AddRange(right.Children);

            // remove the value from the parent
            node.Values.RemoveAt(index);

            // remove the right child
            node.Children.RemoveAt(index + 1);

            node.Validate();
            left.Validate();

            return left;
        }

        private bool RemoveValueFromLeaf(BTreeNode<T> node, T value)
        {
            return node.Values.Remove(value);
        }

        #endregion



        public bool Contains(T value)
        {
            return Contains(value, Root);
        }

        #region Contains internal methods

        private bool Contains(T value, BTreeNode<T> node)
        {
            // this performs a binary search
            int index = ChildIndex(node, value);
            if(index < node.Values.Count && EqualTo(node.Values[index], value))
            {
                return true;
            }

            if (node.Leaf)
            {
                return false;
            }

            return Contains(value, node.Children[index]);
        }

        private bool EqualTo(T left, T right)
        {
            return left.CompareTo(right) == 0;
        }

        #endregion

        internal int ChildIndex(BTreeNode<T> node, T value)
        {
            int index = node.Values.BinarySearch(value);
            if (index < 0) index = ~index;

            return index;
        }
    }
}
 