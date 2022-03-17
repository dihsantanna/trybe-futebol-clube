import { Model, DataTypes} from 'sequelize';
import db from '.';

class Clubs extends Model {
  declare id: number;
  public clubName!: string;
}

Clubs.init({
  id: DataTypes.INTEGER,
  club_name: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Clubs',
  timestamps: false,
});

export default Clubs;
