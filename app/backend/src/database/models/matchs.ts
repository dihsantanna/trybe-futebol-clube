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
  id: DataTypes.INTEGER,
  homeTeam: DataTypes.INTEGER,
  homeTeamGoals: DataTypes.INTEGER,
  awayTeam: DataTypes.INTEGER,
  awayTeamGoals: DataTypes.INTEGER,
  inProgress: DataTypes.BOOLEAN,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matchs',
  timestamps: false,
});

Matchs.belongsTo(Clubs, { foreignKey: 'homeTeam', as: 'club' });
Matchs.belongsTo(Clubs, { foreignKey: 'awayTeam', as: 'club' });

Clubs.hasMany(Matchs, { foreignKey: 'homeTeam', as: 'match' });
Clubs.hasMany(Matchs, { foreignKey: 'awayTeam', as: 'match' });

export default Matchs;
