
const {DATABASE} = require("../config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(DATABASE.DB, DATABASE.USER, DATABASE.PASSWORD, {
    host: DATABASE.HOST,
    dialect: DATABASE.dialect,
    operatorsAliases: false,
    timezone: '+08:00', //东八时区
    pool: {
        max: DATABASE.pool.max,
        min: DATABASE.pool.min,
        acquire: DATABASE.pool.acquire,
        idle: DATABASE.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;//引入

db.sequelize = sequelize;//实例

// 获取映射文件路径
// let modelsPath = path.join(process.cwd(),"/models");
// console.log("ok",modelsPath)

// db.users = require("./users.model.js")(sequelize, Sequelize);
db.article = require("./article.model.js")(sequelize, Sequelize);
db.files = require("./files.model.js")(sequelize, Sequelize);


module.exports = db;
