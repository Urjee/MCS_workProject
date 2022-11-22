module.exports = (sequelize, Sequelize) => {
    const UserReq = sequelize.define('UserReq', {
        userReqID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        importanceID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Importance',
                key: 'importanceID'
            },
        },
        file_id: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Files',
                key: 'file_id'
            },
        },
        description:{
            type: Sequelize.STRING,
        },
        subWorkID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'SubWorks',
                key: 'subWorkID'
            },
        },         
        organizationID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Organizations',
                key: 'organizationID'
            },
        }, 
        stateID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'States',
                key: 'stateID'
            },
        },
        createDate: {
            type: Sequelize.STRING,
        },       
        planTime: {
            type: Sequelize.STRING,
        },
        realTime: {
            type: Sequelize.STRING,
        },
        UserID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'UserID'
            }
        },
        DeveloperID: {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'UserID'
            }
        },
        percentOfPerform: {
            type: Sequelize.INTEGER,
        }
        ,
        startDate: {
            type: Sequelize.STRING,
        },
        endDate: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    UserReq.associate = () => {
        UserReq.belongsTo('Organization', { foreignKey: 'organizationID'});
        UserReq.belongsTo('SubWork', { foreignKey: 'subWorkID'});
        UserReq.belongsTo('Files', { foreignKey: 'file_id'});
        UserReq.belongsTo('Importance', { foreignKey: 'importanceID'});    
        UserReq.belongsTo('States', { foreignKey: 'stateID'}); 
        UserReq.belongsTo('Users', { foreignKey: 'UserID'}); 

    };   
        return UserReq;
};