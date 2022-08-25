const Organization = require("./Organization");

module.exports = (sequelize, Sequelize) => {
    const Work = sequelize.define('Work', {
        work_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        
        organizationID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Organizations',
                key: 'organizationID'
            },
        },
        create_user: {
            type: Sequelize.STRING,
        },
        date: {
            type: Sequelize.DATEONLY,
        },
        performedTime: {
            type: Sequelize.DATEONLY,
        },
        importance_id: {
            type: Sequelize.INTEGER,
        },
        stateID: {
            type: Sequelize.INTEGER,
        },
        planTime: {
            type: Sequelize.TIME,
        },
        realTime: {
            type: Sequelize.TIME,
        },
        execution_worker: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    Work.associate = () => {
        Work.belongsTo('Organization', { foreignKey: 'organizationID'});
    };
    return Work;
};