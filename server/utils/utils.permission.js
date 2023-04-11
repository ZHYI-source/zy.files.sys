const expressJwt = require('express-jwt')
const SIGN_KEY = require('../config').RUN.SIGN_KEY
/**
 * token验证函数
 *
 * @param  {[type]}   req  请求对象
 * @param  {[type]}   res  响应对象
 * @param  {Function} next 传递事件函数
 */
exports.tokenAuth = expressJwt({
    secret: SIGN_KEY,
    algorithms: ['HS256'],
    credentialsRequired: true, //对没有携带token的 接口也抛出错误
})

