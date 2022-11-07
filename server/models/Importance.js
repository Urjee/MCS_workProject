module.exports = (sequelize, Sequelize) => {
    const Importance = sequelize.define('Importance', {
        importanceID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        importanceName: {
            type: Sequelize.STRING,
        },
      
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

    Importance.associate = () => {
       
        Importance.hasMany('UserReq', {foreignKey : 'importanceID'});
    };
    return Importance;
};