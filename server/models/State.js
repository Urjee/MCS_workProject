const User = require("./User");
const SubWork = require("./SubWork");

module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define('State', {
        stateID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        stateName: {
            type: Sequelize.STRING,
        },
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false
    });

    State.associate = () => {
        State.hasMany('UserReq', {foreignKey : 'stateID'});
        State.hasMany('Request', {foreignKey : 'stateID'});
        State.hasMany('SubWork', {foreignKey : 'stateID'});

    };

    return State;
};
