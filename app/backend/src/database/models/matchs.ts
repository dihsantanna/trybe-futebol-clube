import { Model, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './clubs';

class Matchs extends Model {
  declare id: number;

  public homeTeam!: number;

  public homeTeamGoals!: number;

  public awayTeam!: number;

  public awayTeamGoals!: number;

  public inProgress!: boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
  tableName: 'matchs',
});

Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'homeClub' });
Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'awayClub' });

Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'homeMatch' });
Clubs.hasMany(Matchs, { foreignKey: 'id', as: 'awayMatch' });

export default Matchs;
