const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const chalk = require('chalk'); // https://www.npmjs.com/package/chalk
const logger = require("./utils/utils.logger");
const config = require("./config")
const db = require("./models");
// 路由加载
const mount = require('mount-routes')
const app = express()

//处理请求参数解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//数据库同步模型
config.RUN.ISSYNCHTABLE&&db.sequelize.sync();
config.RUN.SYNCHTABLE&&db[config.RUN.SYNCHTABLE].sync({ alter: true })
// 设置跨域和相应数据格式
app.all('/api/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, token')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    if (req.method == 'OPTIONS') res.send(200)
    /*让options请求快速返回*/
    else next()

})

// 使用swagger API 文档
// https://www.npmjs.com/package/express-swagger-generator
const expressSwagger = require('express-swagger-generator')(app)
const options = require('./utils/swagger') //配置信息
expressSwagger(options)

// 统一响应机制
const UnifiedResponse = require('./utils/utils.resextra')
app.use(UnifiedResponse)

// const admin_passport = require('./utils/utils.permission')

// 设置 passport 验证路径 ('/api/private/' 开头的都需要进行token)
// app.use('/api/private/*', admin_passport.tokenAuth)

//token 有效性中间件
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        logger.error(`${req.method} ${req.baseUrl + req.path} *** 响应：${JSON.stringify({
            data: null,
            code: err.status || 401,
            message: err.message || 'token错误'
        })}`);
        res.send({data: null, code: err.status || 401, message: err.message || 'token错误'})
    }
})

// 带路径的用法并且可以打印出路有表  true 代表展示路由表在打印台
mount(app, path.join(process.cwd(), '/routes'), config.RUN.ISSHOWROUTER)

// 处理无响应 如果没有路径处理就返回 Not Found
app.use(function (req, res) {
    res.sendResult({data: null, code: 404, message: 'Not Found'})
})

app.listen(config.RUN.PORT, () => {
    console.log(chalk.bold.green(`项目启动成功: ${config.RUN.BASEURL}`));
    console.log(chalk.bold.green(`swagger文档:  ${config.RUN.BASEURL}/swagger`));
})

module.exports = app
