type RmrEuATeam =
  | 'VP'
  | 'MOUZ'
  | 'fnatic'
  | 'Navi'
  | 'FaZe'
  | 'Sprout'
  | 'BNE'
  | 'B8'
  | 'Viperio'
  | 'Into the Breach'
  | '1Win'
  | 'Apeks'
  | 'GamerLegion'
  | 'OG'
  | 'Falcons'
  | 'SAW';

interface Matchup<T extends string> {
  teamA: TeamStandingWithDifficulty<T>;
  teamB: TeamStandingWithDifficulty<T>;
}

interface MatchupProbability<T extends string> {
  teamA: T;
  teamB: T;
  teamAWinrate: number;
}

interface TeamStanding<T extends string> {
  name: T;
  seed: number;
  wins: number;
  losses: number;
  pastOpponents: T[];
}

interface TeamStandingWithDifficulty<T extends string> extends TeamStanding<T> {
  difficulty: number;
}

interface QualElimOutput<T extends string> {
  qualified: TeamStanding<T>[];
  eliminated: TeamStanding<T>[];
  competitors: TeamStanding<T>[];
}

const rmrEuASeeding: Record<string, RmrEuATeam> = {
  1: 'VP',
  2: 'MOUZ',
  3: 'fnatic',
  4: 'Navi',
  5: 'FaZe',
  6: 'Sprout',
  7: 'BNE',
  8: 'B8',
  9: 'Viperio',
  10: 'Into the Breach',
  11: '1Win',
  12: 'Apeks',
  13: 'GamerLegion',
  14: 'OG',
  15: 'Falcons',
  16: 'SAW',
};

const rmrEuAProbabilities: MatchupProbability<RmrEuATeam>[] = [
  {
    teamA: 'VP',
    teamB: 'MOUZ',
    teamAWinrate: 0.6,
  },
  {
    teamA: 'VP',
    teamB: 'fnatic',
    teamAWinrate: 0.65,
  },
  {
    teamA: 'VP',
    teamB: 'Navi',
    teamAWinrate: 0.35,
  },
  {
    teamA: 'VP',
    teamB: 'FaZe',
    teamAWinrate: 0.4,
  },
  {
    teamA: 'VP',
    teamB: 'Sprout',
    teamAWinrate: 0.85,
  },
  {
    teamA: 'VP',
    teamB: 'BNE',
    teamAWinrate: 0.6,
  },
  {
    teamA: 'VP',
    teamB: 'B8',
    teamAWinrate: 0.95,
  },
];

const splitStandingsToRecordGroups = <T extends string>(
  teamsStandings: TeamStandingWithDifficulty<T>[]
): Map<number, TeamStandingWithDifficulty<T>[]> =>
  teamsStandings.reduce((groups, teamStanding) => {
    const winDifferential = teamStanding.wins - teamStanding.losses;
    const recordGroup = groups.get(winDifferential);
    if (recordGroup) {
      recordGroup.push(teamStanding);
    } else {
      groups.set(winDifferential, [teamStanding]);
    }
    return groups;
  }, new Map<number, TeamStandingWithDifficulty<T>[]>());

const calculateDifficulties = <T extends string>(
  teamsStandings: TeamStanding<T>[]
): TeamStandingWithDifficulty<T>[] =>
  teamsStandings.map((team) => {
    const difficulty = team.pastOpponents.reduce((differentialSum, opponentName) => {
      const opponentStanding = teamsStandings.find((standing) => standing.name === opponentName);
      if (!opponentStanding) return differentialSum;
      const winDifferential = opponentStanding.wins - opponentStanding.losses;
      return differentialSum + winDifferential;
    }, 0);
    return {
      ...team,
      difficulty,
    };
  });

const sortRecordGroup = <T extends string>(
  recordGroup: TeamStandingWithDifficulty<T>[]
): TeamStandingWithDifficulty<T>[] =>
  recordGroup.sort((teamA, teamB) => {
    const difficultyDiff = teamA.difficulty - teamB.difficulty;
    if (difficultyDiff !== 0) return difficultyDiff;
    return teamA.seed - teamB.seed;
  });

const sortGroup = <T extends string>(
  group: TeamStandingWithDifficulty<T>[]
): TeamStandingWithDifficulty<T>[] =>
  group.sort((teamA, teamB) => {
    const winDifferentialDiff = teamB.wins - teamB.losses - (teamA.wins - teamA.losses);
    if (winDifferentialDiff !== 0) return winDifferentialDiff;
    const difficultyDiff = teamA.difficulty - teamB.difficulty;
    if (difficultyDiff !== 0) return difficultyDiff;
    return teamA.seed - teamB.seed;
  });

const matchRecordGroup = <T extends string>(
  recordGroup: TeamStandingWithDifficulty<T>[]
): Matchup<T>[] => {
  const sortedGroup = sortRecordGroup(recordGroup);
  const matchups: Matchup<T>[] = [];
  while (sortedGroup.length) {
    const teamA = sortedGroup.shift();
    const teamB = sortedGroup.pop();
    if (teamA && teamB) {
      matchups.push({
        teamA,
        teamB,
      });
    }
  }
  return matchups;
};

/**
 * https://github.com/ValveSoftware/csgo/blob/main/major-supplemental-rulebook.md#mid-stage-seed-calculation
 * @param teamsStandings
 */
const calculateMatchups = <T extends string>(teamsStandings: TeamStanding<T>[]): Matchup<T>[] => {
  // 1. Current W-L record in the stage
  // 2. Difficulty Score in the current stage
  // 3. Initial seeding of the current stage
  const teamsStandingsWithDifficulty = calculateDifficulties(teamsStandings);
  const recordGroups = splitStandingsToRecordGroups(teamsStandingsWithDifficulty);
  const matchups: Matchup<T>[] = Array.from(recordGroups.values()).reduce(
    (acc: Matchup<T>[], recordGroup) => acc.concat(matchRecordGroup(recordGroup)),
    []
  );
  return matchups;
};

const simulateMatchup = <T extends string>(
  matchup: Matchup<T>,
  matchupProbabilities: MatchupProbability<T>[]
): TeamStanding<T>[] => {
  const probabilityListing = matchupProbabilities.find(
    (probListing) =>
      (probListing.teamA === matchup.teamA.name && probListing.teamB === matchup.teamB.name) ||
      (probListing.teamA === matchup.teamB.name && probListing.teamB === matchup.teamA.name)
  );
  const teamAWinrate = probabilityListing?.teamAWinrate || 0.5;
  const swapTeams = probabilityListing ? probabilityListing.teamA !== matchup.teamA.name : false;

  const teamAWins = Math.random() <= teamAWinrate;
  const { teamA, teamB } = matchup;
  teamA.pastOpponents.push(teamB.name);
  teamB.pastOpponents.push(teamA.name);
  if (teamAWins && !swapTeams) {
    teamA.wins += 1;
    teamB.losses += 1;
  } else {
    teamA.losses += 1;
    teamB.wins += 1;
  }
  return [teamA, teamB];
};

const simulateMatchups = <T extends string>(
  matchups: Matchup<T>[],
  matchupProbabilities: MatchupProbability<T>[]
): TeamStanding<T>[] =>
  matchups.flatMap((matchup) => simulateMatchup(matchup, matchupProbabilities));

const extractQualElims = <T extends string>(
  teamsStandings: TeamStanding<T>[],
  qualElimMax: number
): QualElimOutput<T> =>
  teamsStandings.reduce(
    (acc, team) => {
      if (team.wins >= qualElimMax) acc.qualified.push(team);
      else if (team.losses >= qualElimMax) acc.eliminated.push(team);
      else acc.competitors.push(team);
      return acc;
    },
    {
      qualified: [] as TeamStanding<T>[],
      eliminated: [] as TeamStanding<T>[],
      competitors: [] as TeamStanding<T>[],
    }
  );

const simulateEvent = <T extends string>(
  seeding: Record<string, T>,
  probabilities: MatchupProbability<T>[],
  qualElimMax = 3
): QualElimOutput<T> => {
  let competitors: TeamStanding<T>[] = Object.entries(seeding).map(([seed, name]) => ({
    name,
    seed: parseInt(seed, 10),
    wins: 0,
    losses: 0,
    pastOpponents: [],
  }));
  const qualified: TeamStanding<T>[] = [];
  const eliminated: TeamStanding<T>[] = [];
  while (competitors.length) {
    const matchups = calculateMatchups(competitors);
    const standings = simulateMatchups(matchups, probabilities);
    const qualElimResult = extractQualElims(standings, qualElimMax);
    competitors = qualElimResult.competitors;
    qualified.push(...qualElimResult.qualified);
    eliminated.push(...qualElimResult.eliminated);
  }
  return {
    qualified,
    eliminated,
    competitors,
  };
};

function main() {
  const { qualified, eliminated } = simulateEvent(rmrEuASeeding, rmrEuAProbabilities);
  const results = [...qualified, ...eliminated];
  const resultsWithDifficulty = calculateDifficulties(results);
  const sortedResults = sortGroup(resultsWithDifficulty);
  console.log(sortedResults);
}

main();
