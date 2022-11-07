const Organization = require("./Organization");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        UserID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        password: {
            type: Sequelize.STRING,
        },
        
        firstname: {
            type: Sequelize.STRING,
        },
        lastname: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.INTEGER,
        }, 
        email: {
            type: Sequelize.STRING,
        },
        isAdmin: {
            type: Sequelize.INTEGER,
            // defaultValue: 0
        },
        isActive: {
            type: Sequelize.STRING,
        },
        organizationID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Organizations',
                key: 'organizationID'
            },
        },
        departmentID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Departments',
                key:'departmentID'
            },
        },
        job: {
            type: Sequelize.STRING,
        },
        headID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'UserID'
            }
        },
       
        jobTitle: {
            type: Sequelize.INTEGER
        }     
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

    User.associate = () => {
        User.hasMany('UserReq',{foreignKey: 'UserID'});
        User.hasMany('Users',{foreignKey: 'UserID'});
        User.belongsTo('Organization', { foreignKey: 'organizationID' });
        User.belongsTo('Department', {foreignKey: 'departmentID'});
    };
    return User;
};