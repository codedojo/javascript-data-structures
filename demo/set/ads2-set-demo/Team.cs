using System;
using System.Diagnostics.CodeAnalysis;

namespace ads2_set_demo
{
    class Team : IComparable<Team>
    {
        public Team(string conf, string name, string code)
        {
            Conference = conf;
            Name = name;
            Code = code;
        }

        public readonly string Conference;
        public readonly string Code;
        public readonly string Name;

        public int CompareTo([AllowNull] Team other)
        {
            if (other == null)
                return -1;

            return Code.CompareTo(other.Code);
        }
    }
}
