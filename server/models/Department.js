const User = require("./User");

module.exports = (sequelize, Sequelize) => {
    const Department = sequelize.define('Department', {
        departmentID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        departmentName: {
            type: Sequelize.STRING,
        },
        employeeNum: {
            type: Sequelize.INTEGER,
        },
        organizationID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Organizations',
                key: 'organizationID'
            },
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

    

    Department.associate = () => {
        Department.hasMany('User', {foreignKey : 'departmentID'});
        Department.belongsTo('Organization', { foreignKey: 'organizationID'});
    };

    return Department;
};
