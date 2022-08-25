module.exports = (sequelize, Sequelize) => {
    const Importance = sequelize.define('Importance', {
        importanceID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
        },
      
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

    Importance.associate = () => {
       
        Importance.hasMany('UserReq', {foreignKey : 'importanceID'});
        Importance.hasMany('Request',{foreignKey: 'importanceID'});
    };
    return Importance;
};