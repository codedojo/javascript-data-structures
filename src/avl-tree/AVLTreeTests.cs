using System;
using System.Diagnostics;
using System.Collections.Generic;
using Xunit;

using AVLTree;


namespace AVLTreeTests
{
    public class EnumerationTests
    {
        [Fact]
        public void Enumerator_Of_Single()
        {
            AVLTree<int> tree = new AVLTree<int>();

            foreach (int item in tree)
            {
                Assert.True(false, "An empty tree should not enumerate any values");
            }

            Assert.False(tree.Contains(10), "Tree should not contain 10 yet");

            tree.Add(10);

            Assert.True(tree.Contains(10), "Tree should contain 10");

            int count = 0;
            foreach (int item in tree)
            {
                count++;
                Assert.Equal(1, count);
                Assert.Equal(10, item);
            }
        }

        [Fact]
        public void LeftRotation_Basic()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //  1
            //   \
            //    2
            //     \
            //      3
            tree.Add(1);
            tree.Add(2);
            tree.Add(3);

            //   2
            //  / \
            // 1   3

            int[] expected = new[] { 2, 1, 3 };
            int index = 0;

            tree.PreOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void RightRotation_Basic()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //      3
            //     /
            //    2
            //   /
            //  1
            tree.Add(3);
            tree.Add(2);
            tree.Add(1);

            //   2
            //  / \
            // 1   3

            int[] expected = new[] { 2, 1, 3 };
            int index = 0;

            tree.PreOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void LeftRightRotation_Basic()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //  1
            //   \
            //    3
            //   /
            //  2
            tree.Add(1);
            tree.Add(3);
            tree.Add(2);

            //   2
            //  / \
            // 1   3

            int[] expected = new[] { 2, 1, 3 };
            int index = 0;

            tree.PreOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void RightLeftRotation_Basic()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //   3
            //  /
            // 1
            //  \
            //   2
            tree.Add(3);
            tree.Add(1);
            tree.Add(2);

            //   2
            //  / \
            // 1   3

            int[] expected = new[] { 2, 1, 3 };
            int index = 0;

            tree.PreOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void Add_And_Remove_1k_Unique_Items()
        {
            AVLTree<int> tree = new AVLTree<int>();
            List<int> items = new List<int>();
            
            // add random unique items to the tree
            Random rng = new Random();
            while (items.Count < 1000)
            {
                int next = rng.Next();
                if (!items.Contains(next))
                {
                    items.Add(next);
                    tree.Add(next);

                    Assert.Equal(items.Count, tree.Count);
                }
            }

            // make sure they all exist in the tree
            foreach (int value in items)
            {
                Assert.True(tree.Contains(value), "The tree does not contain the expected value " + value.ToString());
            }

            // remove the item from the tree and make sure it's gone
            foreach (int value in items)
            {
                Assert.True(tree.Remove(value), "The tree does not contain the expected value " + value.ToString());
                Assert.False(tree.Contains(value), "The tree should not have contained the value " + value.ToString());
                Assert.False(tree.Remove(value), "The tree should not have contained the value " + value.ToString());
            }

            // now make sure the tree is empty
            Assert.Equal(0, tree.Count);
        }


        [Fact]
        public void Rotation_Complexish()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //      3
            //     /
            //    2
            //   /
            //  1
            tree.Add(3);
            tree.Add(2);
            tree.Add(1);

            //   2
            //  / \
            // 1   3

            int[] expected = new[] { 2, 1, 3 };
            int index = 0;

            tree.PreOrderTraversal(item => Assert.Equal(expected[index++], item));
            Assert.Equal(index, expected.Length);

            //   2
            //  / \
            // 1   3
            //      \
            //       4

            tree.Add(4);

            expected = new[] { 2, 1, 3, 4};
            index = 0;

            tree.PreOrderTraversal(item => Assert.Equal(expected[index++], item));
            Assert.Equal(index, expected.Length);

            //   2
            //  / \
            // 1   3
            //      \
            //       4
            //        \
            //         5

            tree.Add(5);

            //   2
            //  / \
            // 1   4
            //    /  \
            //   3    5

            expected = new[] { 2, 1, 4, 3, 5 };
            index = 0;

            tree.PreOrderTraversal(item => Assert.Equal(expected[index++], item));
            Assert.Equal(index, expected.Length);

            //   2
            //  / \
            // 1   4
            //    /  \
            //   3    5
            //         \
            //          6

            tree.Add(6);

            //     4
            //    / \
            //   2   5
            //  / \   \
            // 1   3   6

            expected = new[] { 4, 2, 1, 3, 5, 6 };
            index = 0;

            tree.PreOrderTraversal(item => Debug.WriteLine(item));

            tree.PreOrderTraversal(item => Assert.Equal(expected[index++], item));
            Assert.Equal(index, expected.Length);
        }

        [Fact]
        public void InOrder_Delegate()
        {
            AVLTree<int> tree = new AVLTree<int>();

            List<int> expected = new List<int>();
            for (int i = 0; i < 100; i++)
            {
                tree.Add(i);
                expected.Add(i);
            }

            int index = 0;

            tree.InOrderTraversal(item => Assert.Equal(expected[index++], item));
        }
    }
}
