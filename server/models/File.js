const File = require("./File");

module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define('File', {
        file_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        file_name: {
            type: Sequelize.STRING,
        },
        original_name:{
            type: Sequelize.STRING,
        },
        file_path:{
            type:Sequelize.STRING,
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    });
    File.associate=()=>{
        File.hasMany('UserReq', {foreignKey: 'file_id'});
        File.hasMany('Request', {foreignKey: 'file_id'});
    }
    
    return File;
};