const matchsBody = {
  createdInProgress: {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  },
  createdFinished: {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: false,
  },
  withoutHomeTeam: {
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  },
  withoutHomeTeamGoals: {
    homeTeam: 16,
    awayTeam: 8,
    awayTeamGoals: 2,
    inProgress: true,
  },
  withoutAwayTeam: {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeamGoals: 2,
    inProgress: true,
  },
  withoutAwayTeamGoals: {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    inProgress: true,
  },
  withoutInProgress: {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 8,
    awayTeamGoals: 2,
  },
  equalTeams: {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 16,
    awayTeamGoals: 2,
    inProgress: true,
  },
  noExistentHomeTeam: {
    homeTeam: 17,
    homeTeamGoals: 2,
    awayTeam: 16,
    awayTeamGoals: 2,
    inProgress: true,
  },
  noExistentAwayTeam: {
    homeTeam: 16,
    homeTeamGoals: 2,
    awayTeam: 17,
    awayTeamGoals: 2,
    inProgress: true,
  },
};

export default matchsBody;
