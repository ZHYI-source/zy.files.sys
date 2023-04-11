const db = require("../models");
const logger = require("../utils/utils.logger");
const {aes} = require('../utils/utils.crypto')
const Users = db.users;
const jwt = require('jsonwebtoken')

exports.login=function (pm, cb) {
    //登录逻辑
 Users.findOne({where:{username:pm.username,}}).then(data => {
        logger.debug('login => username:%s,password:%s', pm.username, aes.en(pm.password));
        if (aes.en(pm.password) === data.password){
            // 生成token
            let token = 'Bearer ' + jwt.sign(
                {
                    username:pm.username,
                    password:pm.password,
                    admin: true
                },
                process.env["SIGN_KEY"],
                {
                    expiresIn: 3600 * 24 * 3
                }
            )
            let userInfo = {username: data.username,nickName:data.nickName}
            cb({userInfo, token})
            return
        }
        cb(null,'密码错误！')
    }).catch(err => {
        logger.error(JSON.stringify(err))
        cb(null,'用户不存在！请联系管理员添加')
    })
}
