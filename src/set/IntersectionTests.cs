using Xunit;
using System;
using System.Collections.Generic;
using System.Collections;
using DataStructures;
using DataStructures.Set.Tree;

namespace set_tests
{

    public class IntersectionTests
    {
        [Theory]
        [ClassData(typeof(IntersectionTestIntData))]
        public void IntTests(TestCaseData<int> data)
        {
            intersectionTest<int>(new Set<int>(data.Left), new Set<int>(data.Right), data.Expected);
        }

        [Theory]
        [ClassData(typeof(IntersectionTestStringData))]
        public void StringTests(TestCaseData<string> data)
        {
            intersectionTest<string>(new Set<string>(data.Left), new Set<string>(data.Right), data.Expected);
        }

        private void intersectionTest<T>(DataStructures.ISet<T> left, DataStructures.ISet<T> right, T[] expected)
            where T : IComparable<T>
        {
            DataStructures.ISet<T> actual = left.Intersection((DataStructures.ISet<T>)right);
            SetCompare.AssertEqual<T>(expected, actual);

        }
    }

    public class IntersectionTestStringData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[]{new TestCaseData<string>
            {
                    Left = new string[] { "James", "Robert", "John", "Mark" },
                    Right = new string[] { "Elizabeth", "Amy" },
                    Expected = new string[] { }
            } };

            yield return new object[] { new TestCaseData<string>
            {
                    Left = new string[] { "James", "Robert", "John", "Mark" },
                    Right = new string[] { "John", "Steven", "James", "Reba" },
                    Expected = new string[] { "James", "John" }
            } };
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }

    public class IntersectionTestIntData : IEnumerable<object[]>
    {
        public IEnumerator<object[]> GetEnumerator()
        {
            yield return new object[]{ new TestCaseData<int>
                {
                    Left = new int[] { 1, 2, 3, 4 },
                    Right = new int[] { 5, 6, 7, 8 },
                    Expected = new int[] {  }
                }};
            yield return new object[]{ new TestCaseData<int>
                {
                    Left = new int[] { 1, 2, 3, 4 },
                    Right = new int[] { 1, 2, 5, 6 },
                    Expected = new int[] { 1, 2 }
                }};
            yield return new object[]{ new TestCaseData<int>
                {
                    Left = new int[] { 1, 2, 3, 4 },
                    Right = new int[] { },
                    Expected = new int[] { }
                }};
            yield return new object[]{ new TestCaseData<int>
                {
                    Left = new int[] { },
                    Right = new int[] { 1, 2, 3, 4 },
                    Expected = new int[] { }
                }};
            yield return new object[]{ new TestCaseData<int>
                {
                    Left = new int[] { },
                    Right = new int[] { },
                    Expected = new int[] { }
                } };

        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();

    }
}
