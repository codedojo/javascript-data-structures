using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace ads2_m6_btree
{
    public class BTreeNode<T>
        where T : IComparable<T>
    {
        private readonly int MinimalDegree;

        internal readonly List<T> Values;
        internal readonly List<BTreeNode<T>> Children;

        public BTreeNode(int degree, IEnumerable<T> values, IEnumerable<BTreeNode<T>> children)
        {
            MinimalDegree = degree;
            Values = new List<T>(values);
            Children = new List<BTreeNode<T>>(children);

            Validate();
        }

        public bool Leaf
        {
            get
            {
                return Children.Count == 0;
            }
        }

        public bool Full
        {
            get
            {
                return Values.Count == (2 * MinimalDegree) - 1;
            }
        }

        public bool Minimal
        {
            get
            {
                return Values.Count == MinimalDegree - 1;
            }
        }

        [Conditional("DEBUG")]
        internal void Validate()
        {
            if (Values.Count == 0)
            {
                throw new Exception("Every node must have at least one value");
            }

            if (Children.Count > 0)
            {
                if (Values.Count != Children.Count - 1)
                {
                    throw new Exception("The number of values must be one less than the number of children");
                }
            }

            if (Values.Count >= ((2 * MinimalDegree) + 1))
            {
                throw new Exception("The number of values exceeds the degree limit");
            }
        }

    }
}
