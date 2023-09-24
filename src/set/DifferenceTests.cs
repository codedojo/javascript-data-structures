using System;
using System.Collections.Generic;
using System.Collections;
using Xunit;
using DataStructures;
using DataStructures.Set.Tree;

namespace set_tests
{
    public class DifferenceTests
    {
        [Theory]
        [ClassData(typeof(DifferenceTestData))]
        public void IntTests(TestCaseData<int> data)
        {
            differenceTest<int>(new Set<int>(data.Left), new Set<int>(data.Right), data.Expected);
        }

        [Theory]
        [ClassData(typeof(DifferenceTestStringData))]
        public void StringTests(TestCaseData<string> data)
        {
            differenceTest<string>(new Set<string>(data.Left), new Set<string>(data.Right), data.Expected);
        }

        private void differenceTest<T>(Set<T> left, Set<T> right, T[] expected)
            where T : IComparable<T>
        {
            var actual = left.Difference(right);
            SetCompare.AssertEqual<T>(expected, actual);
        }
    }

    public class DifferenceTestStringData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[]{new TestCaseData<string>
            {
                Left = new string[] { "James", "Robert", "John", "Mark" },
                Right = new string[] { "Elizabeth", "Amy" },
                Expected = new string[] { "James", "John", "Mark", "Robert" }
            } };

            yield return new object[] { new TestCaseData<string>
            {
                Left = new string[] { "James", "Robert", "John", "Mark" },
                Right = new string[] { "John", "Steven", "James", "Reba" },
                Expected = new string[] { "Mark", "Robert" }
            } };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }

    public class DifferenceTestData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[] {new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { 5, 6, 7, 8 },
                Expected = new int[] { 1, 2, 3, 4 }
            } };
            yield return new object[] {new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3 },
                Right = new int[] { 1, 7, 8 },
                Expected = new int[] { 2, 3 }
            }};
            yield return new object[] {new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { 1, 2, 5, 6 },
                Expected = new int[] { 3, 4 }
            }};
            yield return new object[] {new TestCaseData<int>
            {
                Left = new int[] { 1, 2, 3, 4 },
                Right = new int[] { },
                Expected = new int[] { 1, 2, 3, 4 }
            }};
            yield return new object[] {new TestCaseData<int>
            {
                Left = new int[] { },
                Right = new int[] { 1, 2, 3, 4 },
                Expected = new int[] { }
            }};
            yield return new object[] {new TestCaseData<int>
            {
                Left = new int[] { },
                Right = new int[] { },
                Expected = new int[] { }
            } };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }
}