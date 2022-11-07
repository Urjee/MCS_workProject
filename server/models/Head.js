
module.exports = (sequelize, Sequelize) => {
    const Head = sequelize.define('Head', {
        headID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        headName: {
            type: Sequelize.STRING,
        },
    },
        {
            timestamps: false,
            createdAt: false,
            updatedAt: false
    });

    Head.associate = () => {
        Head.hasMany('User', {foreignKey : 'headID'});

    };

    return Head;
};
