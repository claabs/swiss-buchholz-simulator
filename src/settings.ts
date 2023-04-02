export interface MatchupProbability<T extends string> {
  teamA: T;
  teamB: T;
  bo1TeamAWinrate: number;
  bo3TeamAWinrate: number;
}

export type RmrEuATeam =
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

export const rmrEuASeeding: Record<string, RmrEuATeam> = {
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

export const rmrEuAProbabilities: MatchupProbability<RmrEuATeam>[] = [
  {
    teamA: 'VP',
    teamB: 'MOUZ',
    bo1TeamAWinrate: 0.6,
    bo3TeamAWinrate: 0.6,
  },
  {
    teamA: 'VP',
    teamB: 'fnatic',
    bo1TeamAWinrate: 0.65,
    bo3TeamAWinrate: 0.65,
  },
  {
    teamA: 'VP',
    teamB: 'Navi',
    bo1TeamAWinrate: 0.35,
    bo3TeamAWinrate: 0.35,
  },
  {
    teamA: 'VP',
    teamB: 'FaZe',
    bo1TeamAWinrate: 0.4,
    bo3TeamAWinrate: 0.4,
  },
  {
    teamA: 'VP',
    teamB: 'Sprout',
    bo1TeamAWinrate: 0.85,
    bo3TeamAWinrate: 0.85,
  },
  {
    teamA: 'VP',
    teamB: 'BNE',
    bo1TeamAWinrate: 0.6,
    bo3TeamAWinrate: 0.6,
  },
  {
    teamA: 'VP',
    teamB: 'B8',
    bo1TeamAWinrate: 0.8,
    bo3TeamAWinrate: 0.95,
  },
  {
    teamA: 'VP',
    teamB: 'Viperio',
    bo1TeamAWinrate: 0.8,
    bo3TeamAWinrate: 0.95,
  },
  {
    teamA: 'VP',
    teamB: 'Into the Breach',
    bo1TeamAWinrate: 0.8,
    bo3TeamAWinrate: 0.95,
  },
  {
    teamA: 'VP',
    teamB: '1Win',
    bo1TeamAWinrate: 0.7,
    bo3TeamAWinrate: 0.85,
  },
  {
    teamA: 'VP',
    teamB: 'Apeks',
    bo1TeamAWinrate: 0.5,
    bo3TeamAWinrate: 0.65,
  },
  {
    teamA: 'VP',
    teamB: 'GamerLegion',
    bo1TeamAWinrate: 0.5,
    bo3TeamAWinrate: 0.65,
  },
  {
    teamA: 'VP',
    teamB: 'OG',
    bo1TeamAWinrate: 0.5,
    bo3TeamAWinrate: 0.55,
  },
  {
    teamA: 'VP',
    teamB: 'Falcons',
    bo1TeamAWinrate: 0.7,
    bo3TeamAWinrate: 0.85,
  },
  {
    teamA: 'VP',
    teamB: 'SAW',
    bo1TeamAWinrate: 0.7,
    bo3TeamAWinrate: 0.85,
  },
  {
    teamA: 'MOUZ',
    teamB: 'fnatic',
    bo1TeamAWinrate: 0.5,
    bo3TeamAWinrate: 0.6,
  },
  {
    teamA: 'MOUZ',
    teamB: 'Navi',
    bo1TeamAWinrate: 0.5,
    bo3TeamAWinrate: 0.45,
  },
  {
    teamA: 'MOUZ',
    teamB: 'FaZe',
    bo1TeamAWinrate: 0.4,
    bo3TeamAWinrate: 0.3,
  },
  {
    teamA: 'MOUZ',
    teamB: 'Sprout',
    bo1TeamAWinrate: 0.65,
    bo3TeamAWinrate: 0.75,
  },
  {
    teamA: 'MOUZ',
    teamB: 'BNE',
    bo1TeamAWinrate: 0.6,
    bo3TeamAWinrate: 0.7,
  },
  {
    teamA: 'MOUZ',
    teamB: 'B8',
    bo1TeamAWinrate: 0.6,
    bo3TeamAWinrate: 0.75,
  },
  {
    teamA: 'MOUZ',
    teamB: 'Viperio',
    bo1TeamAWinrate: 0.6,
    bo3TeamAWinrate: 0.75,
  },
  {
    teamA: 'MOUZ',
    teamB: 'Into the Breach',
    bo1TeamAWinrate: 0.6,
    bo3TeamAWinrate: 0.75,
  },
  {
    teamA: 'MOUZ',
    teamB: '1Win',
    bo1TeamAWinrate: 0.55,
    bo3TeamAWinrate: 0.7,
  },
  {
    teamA: 'MOUZ',
    teamB: 'Apeks',
    bo1TeamAWinrate: 0.5,
    bo3TeamAWinrate: 0.6,
  },
  {
    teamA: 'MOUZ',
    teamB: 'GamerLegion',
    bo1TeamAWinrate: 0.5,
    bo3TeamAWinrate: 0.6,
  },
  {
    teamA: 'MOUZ',
    teamB: 'OG',
    bo1TeamAWinrate: 0.5,
    bo3TeamAWinrate: 0.5,
  },
  {
    teamA: 'MOUZ',
    teamB: 'Falcons',
    bo1TeamAWinrate: 0.55,
    bo3TeamAWinrate: 0.7,
  },
  {
    teamA: 'MOUZ',
    teamB: 'SAW',
    bo1TeamAWinrate: 0.55,
    bo3TeamAWinrate: 0.7,
  },
];
