using System;
using System.Diagnostics.CodeAnalysis;

namespace ads2_set_demo
{
    class Player : IComparable<Player>
    {
        public readonly string First;
        public readonly string Last;

        public Player(string first, string last)
        {
            First = first;
            Last = last;
        }

        public int CompareTo([AllowNull] Player other)
        {
            if (other == null)
                return -1;

            int c = string.Compare(First, other.First, StringComparison.InvariantCultureIgnoreCase);
            if (c != 0) return c;

            return string.Compare(Last, other.Last, StringComparison.InvariantCultureIgnoreCase);
        }

        public override string ToString()
        {
            return $"{First} {Last}".Trim();
        }
    }
}
