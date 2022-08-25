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
        organizationID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Organizations',
                key: 'organizationID'
            },
        },  
        subWorkID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'SubWorks',
                key: 'subWorkID'
            },
        }, 
        importanceID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'Importance',
                key: 'importanceID'
            },
        }, 
        planTime: {
            type: Sequelize.TIME,
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
        stateID: {
            type: Sequelize.INTEGER,
            references:{
                model: 'States',
                key: 'stateID'
            },
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