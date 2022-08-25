const User = require("./User");

module.exports = (sequelize, Sequelize) => {
    const SubWork = sequelize.define('SubWork', {
        subWorkID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        subWorkName: {
            type: Sequelize.STRING,
        },
        organizationID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Organizations',
                key: 'organizationID'
            },
        },
        stateID: {
            type: Sequelize. INTEGER,
            references:{
                model: 'States',
                key: 'stateID'
            },
        },
        date: {
            type: Sequelize.DATE,
        },
        work_id: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Works',
                key: 'work_id'
            },
        },
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false
    });

    SubWork.associate = () => {
        SubWork.hasMany('WorkUser', {foreignKey : 'subWorkID'});
        SubWork.hasMany('WorkRequest', {foreignKey: 'subWorkID'});
        SubWork.hasMany('State', {foreignKey: 'subWorkID'});
        SubWork.hasMany('UserReq', {foreignKey: 'subWorkID'});


    };

    return SubWork;
};
