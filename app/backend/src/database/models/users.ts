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
  id: DataTypes.INTEGER,
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
});

export default Users;
