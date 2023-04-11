const express = require('express');
const router = express.Router();
const Files = require("../../../controllers/files.controller");

/**
 * 创建文件管理信息
 * @route POST /api/v1/files/create
 * @group 文件管理管理（管理端） - Operations files-admin
 * @param {string} files_content - 请输入文件管理内容
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.post("/create", Files.create);

/**
 * 下载文件
 * @route GET /api/v1/files/findOne
 * @group 文件管理管理（管理端） - Operations files-admin
 * @param {string} files_content - 请输入下载文件名
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */

router.get("/findOne", Files.findOne);


/**
 * 删除文件管理信息
 * @route POST /api/v1/files/delete
 * @group 文件管理管理（管理端） - Operations files-admin
 * @param {number} id - 请输入文件管理ID
 * @param {string} authorization - 请输入token
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/delete", Files.delete);
/**
 * 查询文件管理信息列表
 * @route POST /api/v1/files/list
 * @group 文件管理管理（管理端） - Operations files-admin
 * @param {object} query - 请按固定查询规范
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/list", Files.findAll);
/**
 * 更新文件管理信息列表
 * @route POST /api/v1/files/update
 * @group 文件管理管理（管理端） - Operations files-admin
 * @param {string} files_content - 请输入文件管理内容
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.post("/update", Files.update);


/**
 * 预览文件管理文件信息列表
 * @route GET /api/v1/files/preview
 * @group 文件管理管理（管理端） - Operations files-admin
 * @param {string} files_content - 请输入文件管理内容 p=getTripPdf.pdf&&mimetype=application/pdf
 * @returns {object} 200 - An array of files info
 * @returns {object} 605 - 请求失败
 * @returns {Error}  default - Unexpected error
 */
router.get("/preview", Files.preview);


module.exports = router;
