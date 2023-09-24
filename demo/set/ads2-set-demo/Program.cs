using System;
using System.IO;
using System.Linq;
using DataStructures;
using DataStructures.Set.Tree;

namespace ads2_set_demo
{
    class Program
    {
        static void Main(string[] args)
        {
            // Conference,Team,Club
            ISet<Team> teams = loadFromCsv<Team>("../../../teams.csv",
                (data) => new Team(data[0], data[1], data[2]));

            //Season,Club (grouped),Club,First Name,Last Name,Position,Total Compensation,Base Salary
            ISet<PlayerYearlyData> stats = loadFromCsv<PlayerYearlyData>("../../../players.csv",
                (data) => new PlayerYearlyData(
                    int.Parse(data[0]),
                    new Player(data[3], data[4]),
                    teams.First(t => t.Code == data[2])));

            ISet<Player> players = new Set<Player>(stats.Select(s => s.Player));

            // How many teams are there?
            Console.WriteLine($"Loaded {teams.Count} teams.");

            // How many players are there in total?
            Console.WriteLine($"Loaded {players.Count} players.");

            // How many statistics have we loaded?
            Console.WriteLine($"Loaded {stats.Count} stats.");

            // How many players we active in 2014 and 2018?
            var p2014 = new Set<Player>(stats.Where(p => p.Year == 2014).Select(p => p.Player));
            var p2018 = new Set<Player>(stats.Where(p => p.Year == 2018).Select(p => p.Player));

            Console.WriteLine($"There were {p2014.Count} player active in 2014");
            Console.WriteLine($"There were {p2014.Count} player active in 2018");
            Console.WriteLine($"There were {p2014.Intersection(p2018).Count} players active in both 2014 and 2018");

            // How many players have ever played for the Western conference?
            var pWestern = new Set<Player>(stats.Where(s => teams.Where(t => t.Conference == "Western").Contains(s.Team)).Select(s => s.Player));
            var pEastern = new Set<Player>(stats.Where(s => teams.Where(t => t.Conference == "Eastern").Contains(s.Team)).Select(s => s.Player));

            var pBoth = pWestern.Intersection(pEastern);

            // players who only played in a single conference
            var pEasternOnly = players.Difference(pWestern);
            var pWesternOnly = players.Difference(pEastern);

            // How many players have only ever played for one conference?
            var pOnlyOne = pEastern.SymmetricDifference(pWestern);

            Console.WriteLine($"{pWestern.Count} have played for the Western conference" );
            Console.WriteLine($"{pEastern.Count} have played for the Eastern conference");
            Console.WriteLine($"{pBoth.Count} have played for the both the Western and Eastern conferences");
            Console.WriteLine($"{pOnlyOne.Count} have played for only a single conference");
            Console.WriteLine($"    {pEasternOnly.Count} have played for only for the Eastern conference");
            Console.WriteLine($"    {pWesternOnly.Count} have played for only for the Western conference");

            // answer some team-level questions
            var galaxy = new Set<Player>(stats.Where(s => s.Team.Code == "LA").Select(s => s.Player));
            var sounders = new Set<Player>(stats.Where(s => s.Team.Code == "SEA").Select(s => s.Player));

            Console.WriteLine($"{galaxy.Count} players have played for the Galaxy");
            Console.WriteLine($"{sounders.Count} players have played for SEA");
            Console.WriteLine($"{sounders.Union(galaxy).Count} unique players between both teams");
            Console.WriteLine($"{sounders.Intersection(galaxy).Count} have played for both");

            foreach(var p in sounders.Intersection(galaxy))
            {
                Console.WriteLine($"    {p}");
            }
        }

        static ISet<T> loadFromCsv<T>(string csvFilePath, Func<string[], T> func)
            where T: IComparable<T>
        {
            ISet<T> result = new Set<T>();

            using (var file = File.OpenText(csvFilePath))
            {
                // skip the header line
                file.ReadLine();

                // read yearl player data
                while (!file.EndOfStream)
                {
                    string line = file.ReadLine().Trim();
                    if (string.IsNullOrEmpty(line))
                    {
                        continue;
                    }

                    string[] data = line.Split(new char[] { ',' });
                    T item = func(data);

                    if (item != null)
                    {
                        result.Add(item);
                    }
                }
            }

            return result;
        }
    }
}
