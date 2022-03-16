import { Model, DataTypes} from 'sequelize';
import db from '.';
import Matchs from './matchs';

class Clubs extends Model {
  declare id: number;
  public clubName!: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'clubs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

Matchs.hasMany(Clubs, { foreignKey: 'homeTeam', as: 'match' });
Matchs.hasMany(Clubs, { foreignKey: 'awayTeam', as: 'match' });

export default Clubs;
