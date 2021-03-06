import { Model, DataTypes } from 'sequelize';
import db from '.';

class Clubs extends Model {
  declare id: number;

  public clubName!: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  clubName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'club',
  timestamps: false,
  tableName: 'clubs',
});

export default Clubs;
