using Xunit;
using System;
using System.Collections.Generic;
using System.Collections;
using DataStructures;
using DataStructures.Set.Tree;


namespace set_tests
{
    
    public class UnionTests
    {
        [Theory]
        [ClassData(typeof(UnionTestIntData))]
        public void IntTests(TestCaseData<int> data)
        {
            unionTest<int>(new Set<int>(data.Left), new Set<int>(data.Right), data.Expected);
        }

        [Theory]
        [ClassData(typeof(UnionTestStringData))]
        public void StringTests(TestCaseData<string> data)
        {
            unionTest<string>(new Set<string>(data.Left), new Set<string>(data.Right), data.Expected);
        }

        private void unionTest<T>(DataStructures.ISet<T> left, DataStructures.ISet<T> right, T[] expected)
            where T: IComparable<T>
        {
            DataStructures.ISet<T> actual = left.Union((DataStructures.ISet<T>)right);
            SetCompare.AssertEqual(expected, actual);
        }
    }

    public class UnionTestIntData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[]{ new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { 5, 6, 7, 8 },
                Expected = new int[] { 1, 2, 3, 4, 5, 6, 7, 8 }
            } };
            yield return new object[]{  new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { 1, 2, 3, 5 },
                Expected = new int[] { 1, 2, 3, 4, 5 },
            } };
            yield return new object[]{  new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { },
                Expected = new int[] { 1, 2, 3, 4 }
            } };
            yield return new object[]{  new TestCaseData<int>
            {
                Left = new int[] { },
                Right = new int[] { 1, 2, 3, 4 },
                Expected = new int[] { 1, 2, 3, 4 }
            } };
            yield return new object[]{  new TestCaseData<int>
            {
                Left = new int[] { },
                Right = new int[] { },
                Expected = new int[] { }
            } };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }


    public class UnionTestStringData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[]{new TestCaseData<string>
            {
                    Left = new string[] { "James", "Robert", "John", "Mark" },
                    Right = new string[] { "Elizabeth", "Amy" },
                    Expected = new string[] { "Amy", "Elizabeth", "James", "John", "Mark", "Robert" }
            } };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
