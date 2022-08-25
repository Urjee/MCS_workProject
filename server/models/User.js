const Organization = require("./Organization");
const Request = require("./Request");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        UserID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING,
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
        department: {
            type: Sequelize.STRING,
        },
        job: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING,
        },
        isAdmin: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        organizationID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Organizations',
                key: 'organizationID'
            },
        },
        headID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'UserID'
            }
        }
      
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

    User.associate = () => {
        User.hasMany('Request', { foreignKey: 'UserID'});
        User.hasMany('UserReq',{foreignKey: 'UserID'});
        User.hasMany('Users',{foreignKey: 'UserID'});
        User.belongsTo('Organization', { foreignKey: 'organizationID' });

    };
    
    // Request.associate = () => {
    //     Request.hasMany('User', {foreignKey : 'requestID'});
    // }
    return User;
};