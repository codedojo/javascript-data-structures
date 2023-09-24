using Xunit;
using ads2_m6_btree;

namespace ads2_m6_btree_tests
{
    public class BTreeTests
    {
        [Fact]
        public void AddingToRoot()
        {
            BTree<int> ints = new BTree<int>(3);

            ints.Add(4);
            ints.Add(2);
            ints.Add(1);
            ints.Add(3);

            Assert.Equal(4, ints.Count);
            Assert.True(ints.Contains(1));
            Assert.True(ints.Contains(2));
            Assert.True(ints.Contains(3));
            Assert.True(ints.Contains(4));
            Assert.Equal(0, ints.Height);

        }

        [Fact]
        public void SplitRoot()
        {
            BTree<int> ints = new BTree<int>(3);

            for(int i = 1; i < 8; i++)
            {
                ints.Add(i);
            }

            Assert.Equal(7, ints.Count);
            Assert.True(ints.Contains(1));
            Assert.True(ints.Contains(2));
            Assert.True(ints.Contains(3));
            Assert.True(ints.Contains(4));
            Assert.True(ints.Contains(5));
            Assert.True(ints.Contains(6));
            Assert.True(ints.Contains(7));
            Assert.Equal(1, ints.Height);

        }

        [Fact]
        public void SplitChild()
        {
            BTree<int> ints = new BTree<int>(3);

            for (int i = 1; i < 12; i++)
            {
                ints.Add(i);
            }

            Assert.Equal(11, ints.Count);
            for(int i = 1; i < 12; i++)
            {
                Assert.True(ints.Contains(i));
            }


            //     [3    6]
            //[1 2] [4 5] [7 8 9 10 11]
            //
            //  becomes (it happens twice but this is the last one)
            //
            //     [3    6     9]
            //[1 2] [4 5] [7 8] [10 11 12]
            ints.Add(12);

            Assert.Equal(12, ints.Count);
            for (int i = 1; i < 13; i++)
            {
                Assert.True(ints.Contains(i));
            }
        }

        [Fact]
        public void RemoveFromLeafRoot()
        {
            BTree<int> ints = new BTree<int>();

            // [1 2 3]
            for (int i = 1; i < 4; i++)
            {
                ints.Add(i);
            }

            // [1 3]
            ints.Remove(2);

            Assert.Equal(2, ints.Count);
            Assert.True(ints.Contains(1));
            Assert.False(ints.Contains(2));
            Assert.True(ints.Contains(3));
        }

        [Fact]
        public void RemoveFromNonMinimalNonRootLeaf()
        {
            BTree<int> ints = new BTree<int>(3);

            //     [3    6     9]
            //[1 2] [4 5] [7 8] [10 11 12]
            for (int i = 1; i < 13; i++)
            {
                ints.Add(i);
            }

            Assert.Equal(12, ints.Count);
            ints.Remove(12);

            Assert.Equal(11, ints.Count);
            for (int i = 1; i < 12; i++)
            {
                Assert.True(ints.Contains(i));
            }

            Assert.False(ints.Contains(12));
        }

        [Fact]
        public void RemoveFromNonMinimalNonLeaf()
        {
            BTree<int> ints = new BTree<int>(3);

            //     [3    6     9]
            //[1 2] [4 5] [7 8] [10 11 12]
            for (int i = 1; i < 13; i++)
            {
                ints.Add(i);
            }

            Assert.Equal(12, ints.Count);
            ints.Remove(6);

            Assert.Equal(11, ints.Count);
            for (int i = 1; i < 6; i++)
            {
                Assert.True(ints.Contains(i));
            }
            for (int i = 7; i < 13; i++)
            {
                Assert.True(ints.Contains(i));
            }

            Assert.False(ints.Contains(6));
        }

        [Fact]
        public void RemoveRotateRightFromMinimalLeaf()
        {
            BTree<int> ints = new BTree<int>(3);

            ints.Add(5);
            ints.Add(1);
            ints.Add(2);
            ints.Add(7);
            ints.Add(8);
            //      [5]
            // [1, 2] [7, 8]

            ints.Add(4);
            //      [5]
            // [1, 2, 4] [7, 8]

            ints.Remove(7);

            //      [4]
            // [1, 2] [5, 8]

            Assert.Equal(5, ints.Count);
            Assert.True(ints.Contains(1));
            Assert.True(ints.Contains(2));
            Assert.True(ints.Contains(4));
            Assert.True(ints.Contains(5));
            Assert.True(ints.Contains(8));
            Assert.False(ints.Contains(7));
        }

        [Fact]
        public void RemoveRotateLeftFromMinimalLeaf()
        {
            BTree<int> ints = new BTree<int>(3);

            ints.Add(5);
            ints.Add(1);
            ints.Add(2);
            ints.Add(7);
            ints.Add(8);
            //      [5]
            // [1, 2] [7, 8]

            ints.Add(6);
            //      [5]
            // [1, 2] [6, 7, 8]

            ints.Remove(2);

            //      [6]
            // [1, 5] [7, 8]

            Assert.Equal(5, ints.Count);
            Assert.True(ints.Contains(1));
            Assert.True(ints.Contains(5));
            Assert.True(ints.Contains(6));
            Assert.True(ints.Contains(7));
            Assert.True(ints.Contains(8));
            Assert.False(ints.Contains(2));
        }

        [Fact]
        public void Add10000()
        {
            BTree<int> ints = new BTree<int>();

            for(int i = 0; i < 10000; i++)
            {
                ints.Add(i);
            }

            Assert.Equal(10000, ints.Count);

            for (int i = 0; i < 10000; i++)
            {
                Assert.True(ints.Contains(i));
            }
        }

        [Fact]
        public void Remove10000()
        {
            BTree<int> ints = new BTree<int>();

            for (int i = 0; i < 10000; i++)
            {
                ints.Add(i);
            }

            for (int i = 0; i < 10000; i++)
            {
                Assert.True(ints.Remove(i));
            }

            Assert.Equal(0, ints.Count);
        }

        [Fact]
        public void Remove50000()
        {
            const int count = 50000;
            BTree<int> ints = new BTree<int>();
            Assert.Equal(0, ints.Height);

            for (int i = 0; i < count; i++)
            {
                ints.Add(i);
            }

            Assert.Equal(count, ints.Count);

            for (int i = 0; i < count; i++)
            {
                Assert.True(ints.Remove(i));
            }

            Assert.Equal(0, ints.Count);
            Assert.Equal(0, ints.Height);
        }

        [Fact]
        public void Remove50000BigDegree()
        {
            const int count = 50000;
            BTree<int> ints = new BTree<int>(50);
            Assert.Equal(0, ints.Height);

            for (int i = 0; i < count; i++)
            {
                ints.Add(i);
            }

            Assert.Equal(count, ints.Count);

            for (int i = 0; i < count; i++)
            {
                Assert.True(ints.Remove(i));
            }

            Assert.Equal(0, ints.Count);
            Assert.Equal(0, ints.Height);
        }
    }
}
