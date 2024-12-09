import { Model, DataTypes } from 'sequelize';

export default class User extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
                timestamps: true,
            }
        );
    }

    static associate(models) {
        this.hasMany(models.Task, { foreignKey: 'user_id', as: 'tasks' });
    }
}
