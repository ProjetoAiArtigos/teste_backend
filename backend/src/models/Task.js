import { Model, DataTypes } from 'sequelize';

export default class Task extends Model {
    static init(sequelize) {
        return super.init(
            {
                title: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                description: {
                    type: DataTypes.TEXT,
                },
                status: {
                    type: DataTypes.STRING,
                    defaultValue: 'pending',
                },
            },
            {
                sequelize,
                modelName: 'Task',
                tableName: 'tasks',
                timestamps: true
            }
        );
    }
}
