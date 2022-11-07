const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    options: { "requestTimeout": 300000 , encrypt: false,
    trustedconnection: true,
    enableArithAbort : true, 
    instancename :'SQLEXPRESS',
  },
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};
db.Department=require('./Department')(sequelize, Sequelize);
db.Organization = require('./Organization')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Importance= require('./Importance')(sequelize, Sequelize);
db.UserReq = require('./UserReq')(sequelize, Sequelize);
db.File = require('./File')(sequelize, Sequelize);
db.SubWork = require('./SubWork')(sequelize, Sequelize);
db.State=require('./State')(sequelize, Sequelize);
db.Head=require('./Head')(sequelize, Sequelize);
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;