import { Model, DataTypes } from 'sequelize';
import sequelize from './index';

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'users',
    timestamps: false
  }
);

export default User;