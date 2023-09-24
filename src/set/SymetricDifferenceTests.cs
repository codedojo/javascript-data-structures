using Xunit;
using System;
using System.Collections.Generic;
using System.Collections;
using DataStructures;
using DataStructures.Set.Tree;

namespace set_tests
{
    
    public class SymetricDifferenceTests
    {
        [Theory]
        [ClassData(typeof(SymetricDifferenceTestIntData))]
        public void IntTests(TestCaseData<int> data)
        {
            symetricDifferenceTest<int>(new Set<int>(data.Left), new Set<int>(data.Right), data.Expected);
        }

        [Theory]
        [ClassData(typeof(SymmetricDifferenceTestStringData))]
        public void StringTests(TestCaseData<string> data)
        {
            symetricDifferenceTest<string>(new Set<string>(data.Left), new Set<string>(data.Right), data.Expected);
        }

        private void symetricDifferenceTest<T>(DataStructures.ISet<T> left, DataStructures.ISet<T> right, T[] expected)
            where T : IComparable<T>
        {
            DataStructures.ISet<T> actual = left.SymmetricDifference((DataStructures.ISet<T>)right);
            SetCompare.AssertEqual<T>(expected, actual);
        }
    }

    public class SymetricDifferenceTestIntData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[] { new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { 5, 6, 7, 8 },
                Expected = new int[] { 1, 2, 3, 4, 5, 6, 7, 8 }
            } };
            yield return new object[] {  new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { 1, 2, 5, 6 },
                Expected = new int[] { 3, 4, 5, 6 }
            } };
            yield return new object[] {  new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { },
                Expected = new int[] { 1, 2, 3, 4 }
            } };
            yield return new object[] {  new TestCaseData<int>
            {
                Left = new int[] { },
                Right = new int[] { 1, 2, 3, 4 },
                Expected = new int[] { 1, 2, 3, 4 }
            } };
            yield return new object[] {  new TestCaseData<int>
            {
                Left = new int[] { },
                Right = new int[] { },
                Expected = new int[] { }
            } };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }


    public class SymmetricDifferenceTestStringData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[]{new TestCaseData<string>
            {
                Left = new string[] { "James", "Robert", "John", "Mark" },
                Right = new string[] { "Elizabeth", "Amy" },
                Expected = new string[] { "Amy", "Elizabeth", "James", "John", "Mark", "Robert" }
            } };

            yield return new object[] { new TestCaseData<string>
            {
                Left = new string[] { "James", "Robert", "John", "Mark" },
                Right = new string[] { "John", "Steven", "James", "Reba" },
                Expected = new string[] { "Mark", "Reba", "Robert", "Steven" }
            } };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}
