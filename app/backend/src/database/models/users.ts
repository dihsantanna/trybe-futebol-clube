import { Model, DataTypes } from 'sequelize';
import db from '.';

class Users extends Model {
  declare id: number;

  public username!: string;

  public role!: string;

  public email!: string;

  public password!: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
  tableName: 'users',
});

export default Users;
