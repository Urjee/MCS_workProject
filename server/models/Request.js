module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define('Request', {
        requestID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        dev_name: {
            type: Sequelize.STRING,
        },  
        planTime: {
            type: Sequelize.TIME,
        },
        realTime: {
            type: Sequelize.TIME,
        },
        description: {
            type: Sequelize.STRING,
        },
        stateID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'States',
                key: 'stateID'
            },
        },
        // requestID, userReqID hoorondoo zorchildoh biluu
        // userReqID: {

        // },
        importanceID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Importance',
                key: 'importanceID'
            }
        },
        file_id: {
            type: Sequelize. INTEGER,
            references: {
                model: 'Files',
                key: 'file_id'
            }
        },
        organizationID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Organizations',
                key: 'organizationID'
            }
        },
        UserID: {
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
    Request.associate = () => {
        Request.belongsTo('States', { foreignKey: 'stateID'});
        Request.belongsTo('Organizations', { foreignKey: 'organizationID'});
        Request.belongsTo('Users', { foreignKey: 'UserID'});
        Request.belongsTo('Files', { foreignKey: 'file_id'});
        Request.belongsTo('Importance', { foreignKey: 'importanceID'});


    };
    return Request;
};