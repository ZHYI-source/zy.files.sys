const express = require('express');
const router = express.Router();
const Article = require("../../../controllers/article.controller");

/**
 * 创建文章信息
 * @route POST /api/v1/article/create
 * @group 文章管理 - Operations about article
 * @param {string} username.query.required - 请输入文章名
 * @param {string} password.query.required - 请输入密码
 * @param {string} nickName - 请输入昵称
 * @param {number} verificationCode - 请输入验证码
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/create", Article.create);
/**
 * 删除文章信息
 * @route POST /api/v1/article/delete
 * @group 文章管理 - delete of article
 * @param {number} id - 请输入文章ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Article.delete);
/**
 * 查询文章信息列表
 * @route GET /api/v1/article/list
 * @group 文章管理 - list of article
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get("/list", Article.findAll);
/**
 * 更新文章信息列表
 * @route POST /api/v1/article/update
 * @group 文章管理 - list of article
 * @param {string} username.query.required - 请输入文章名
 * @param {string} password.query.required - 请输入密码
 * @param {string} nickName - 请输入昵称
 * @param {number} verificationCode - 请输入验证码
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Article.update);

/**
 * 删除全部文章信息
 * @route POST /api/v1/article/deleteAll
 * @group 文章管理 - list of article
 * @returns {object} 200 - An array of user info
 * @returns {object} 500 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/deleteAll", Article.deleteAll);


module.exports = router;
