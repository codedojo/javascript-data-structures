using System;
using System.Linq;
using Xunit;
using DataStructures;

namespace set_tests
{
    public class TestCaseData<T>
    {
        public T[] Left;
        public T[] Right;
        public T[] Expected;
    }

    public static class SetCompare
    {
        public static void AssertEqual<T>(T[] expected, ISet<T> actual)
            where T: IComparable<T>
        {
            Assert.Equal(expected.Length, actual.Count);

            var l = expected.OrderBy(i => i).ToArray();
            var r = actual.OrderBy(i => i).ToArray();

            for(int i = 0; i < l.Length; i++)
            {
                Assert.Equal(l[i], r[i]);
            }
        }
    }
}
