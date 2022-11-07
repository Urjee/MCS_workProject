module.exports = (sequelize, Sequelize) => {
    const Organization = sequelize.define('Organization', {
        organizationID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        organizationName: {
            type: Sequelize.STRING,
        },
        organizationRegister: {
            type: Sequelize.INTEGER,
        },
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });

    Organization.associate = () => {
        Organization.hasMany('User', {foreignKey : 'organizationID'});
        Organization.hasMany('UserReq',{foreignKey : 'organizationID'})
        Organization.hasMany('Department', {foreignKey: 'organizationID'});
    };

    return Organization;
};
