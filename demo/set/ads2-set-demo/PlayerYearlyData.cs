using System;
using System.Diagnostics.CodeAnalysis;

namespace ads2_set_demo
{
    class PlayerYearlyData : IComparable<PlayerYearlyData>
    {
        public readonly int Year;
        public readonly Player Player;
        public readonly Team Team;

        public PlayerYearlyData(int year, Player player, Team team)
        {
            Year = year;
            Player = player;
            Team = team;
        }

        public int CompareTo([AllowNull] PlayerYearlyData other)
        {
            if (other == null)
            {
                return -1;
            }

            int c = Year.CompareTo(other.Year);
            if (c != 0) return c;

            c = Player.CompareTo(other.Player);
            if (c != 0) return c;

            c = Team.CompareTo(other.Team);
            return c;
        }
    }
}
