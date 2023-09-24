using AVLTree;
using Xunit;

namespace AVLTreeTests
{
    public class RemoveTests
    {
        [Fact]
        public void Remove_Head()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //     4
            //   /   \
            //  2     6
            // / \   / \
            //1   3 5   7
            //           \
            //            8


            tree.Add(4);
            tree.Add(5);
            tree.Add(2);
            tree.Add(7);
            tree.Add(3);
            tree.Add(6);
            tree.Add(1);
            tree.Add(8);

            tree.Remove(4);

            //     5
            //   /   \
            //  2     6
            // / \     \
            //1   3     7
            //           \
            //            8

            int[] expected = new[] { 1, 3, 2, 8, 7, 6, 5, };

            int index = 0;
            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void Remove_Head_Line_Right()
        {
            AVLTree<int> tree = new AVLTree<int>();

            // 1
            //  \
            //   2
            //    \
            //     3


            tree.Add(1);
            tree.Add(2);
            tree.Add(3);

            tree.Remove(1);

            // 2
            //  \
            //   3


            int[] expected = new[] { 3, 2 };

            int index = 0;

            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void Remove_Head_Line_Left()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //     3
            //    /
            //   2
            //  /
            // 1


            tree.Add(3);
            tree.Add(2);
            tree.Add(1);

            tree.Remove(3);

            //   2
            //  /
            // 1

            int[] expected = new[] { 1, 2 };

            int index = 0;

            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }



        [Fact]
        public void Remove_Head_Only_Node()
        {
            AVLTree<int> tree = new AVLTree<int>();

            tree.Add(4);

            Assert.True(tree.Remove(4), "Remove should return true for found node");

            foreach (int item in tree)
            {
                Assert.True(false, "An empty tree should not enumerate any values");
            }
        }

        [Fact]
        public void Remove_Node_No_Left_Child()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //        4
            //       / \
            //      2   5
            //     / \   \
            //    1   3   7
            //           / \
            //          6   8

            tree.Add(4);
            tree.Add(5);
            tree.Add(2);
            tree.Add(7);
            tree.Add(3);
            tree.Add(6);
            tree.Add(1);
            tree.Add(8);

            Assert.True(tree.Remove(5), "Remove should return true for found node");

            //         4
            //       /  \
            //      2     7
            //     / \   / \
            //    1   3  6  8

            int[] expected = new[] { 1, 3, 2, 6, 8, 7, 4, };

            int index = 0;

            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void Remove_Node_Right_Leaf()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //         4
            //       /   \
            //      2     6
            //     / \   / \
            //    1   3 5   7
            //               \
            //               8

            tree.Add(4);
            tree.Add(5);
            tree.Add(2);
            tree.Add(7);
            tree.Add(3);
            tree.Add(6);
            tree.Add(1);
            tree.Add(8);

            Assert.True(tree.Remove(8), "Remove should return true for found node");

            //         4
            //       /   \
            //      2     6
            //     / \   / \
            //    1   3 5   7

            int[] expected = new[] { 1, 3, 2, 5, 7, 6, 4, };

            int index = 0;

            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void Remove_Node_Left_Leaf()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //         4
            //       /   \
            //      2     6
            //     / \   / \
            //    1   3 5   7
            //               \
            //               8

            tree.Add(4);
            tree.Add(5);
            tree.Add(2);
            tree.Add(7);
            tree.Add(3);
            tree.Add(6);
            tree.Add(1);
            tree.Add(8);

            Assert.True(tree.Remove(1), "Remove should return true for found node");

            //        4
            //      /   \
            //    2      6
            //     \    / \
            //      3  5   7
            //              \
            //               8

            int[] expected = new[] { 3, 2, 5, 8, 7, 6, 4 };

            int index = 0;

            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }


        [Fact]
        public void Remove_Current_Right_Has_No_Left()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //       5 
            //     /   \
            //    3     7
            //   / \   / \
            //  2   4 6   8
            // /
            //1

            tree.Add(4);
            tree.Add(6);
            tree.Add(5);
            tree.Add(2);
            tree.Add(7);
            tree.Add(3);
            tree.Add(1);
            tree.Add(8);

            Assert.True(tree.Remove(4), "Remove should return true for found node");

            //     5 
            //   /   \
            //  2     7
            // / \   / \
            //1   3 6   8

            int[] expected = new[] { 1, 3, 2, 6, 8, 7, 5, };

            int index = 0;

            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void Remove_Current_Has_No_Right()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //         4
            //       /   \
            //      2     8 
            //     / \    /
            //    1   3  6
            //          / \
            //         5   7   

            tree.Add(4);
            tree.Add(2);
            tree.Add(1);
            tree.Add(3);
            tree.Add(8);
            tree.Add(6);
            tree.Add(7);
            tree.Add(5);

            Assert.True(tree.Remove(8), "Remove should return true for found node");

            //         4
            //       /   \
            //      2      6 
            //     / \    / \
            //    1   3  5   7

            int[] expected = new[] { 1, 3, 2, 5, 7, 6, 4, };

            int index = 0;

            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void Remove_Current_Right_Has_Left()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //         4
            //       /    \
            //      2      6 
            //     / \    / \
            //    1   3  5   8
            //              /
            //             7

            tree.Add(4);
            tree.Add(2);
            tree.Add(1);
            tree.Add(3);
            tree.Add(6);
            tree.Add(5);
            tree.Add(8);
            tree.Add(7);

            Assert.True(tree.Remove(6), "Remove should return true for found node");

            //         4
            //       /    \
            //      2      7 
            //     / \    / \
            //    1   3  5   8

            int[] expected = new[] { 1, 3, 2, 5, 8, 7, 4, };

            int index = 0;

            tree.PostOrderTraversal(item => Assert.Equal(expected[index++], item));
        }

        [Fact]
        public void Remove_From_Empty()
        {
            AVLTree<int> tree = new AVLTree<int>();
            Assert.False(tree.Remove(10));
        }

        [Fact]
        public void Remove_Missing_From_Tree()
        {
            AVLTree<int> tree = new AVLTree<int>();

            //         4
            //       /   \
            //      2     8 
            //     / \    /
            //    1   3  6
            //          / \
            //         5   7   

            int[] values = new[] { 4, 2, 1, 3, 8, 6, 7, 5 };

            foreach (int i in values)
            {
                Assert.False(tree.Contains(10), "Tree should not contain 10");
                tree.Add(i);
            }
        }
    }
}
