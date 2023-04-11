const db = require("../models");
const logger = require("../utils/utils.logger");
const DAO = require("../dao/DAO");
const Article = db.article;

// Create and Save a new user
exports.create = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!req.body.url) return res.sendResult({data: '', code: 500, message: "链接不能为空！"})
    if (!req.body.name) return res.sendResult({data: '', code: 500, message: "文章名称不能为空！"})
    //
    // Create a user
    const article = {
        url: req.body.url,
        name: req.body.name,
    };

    Article.findOne({where: {'name': pm.name}}).then(singleUser => {
        if (singleUser && singleUser.id) return res.sendResultAto(null, 605, '文章已存在！')
        DAO.create(Article, article, data => {
            logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
            res.sendResult(data)
        })
    })


};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Article, pm, list => {
        res.sendResult(list)
    })
};

// Find a single Article with an id
exports.findOne = (req, res) => {
    const pm = req.body;
    DAO.findOne(Article, pm, data => {
        res.sendResult(data)
    })
};

// Update a Article by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 500, message: "ID不能为空！"})
    DAO.update(Article, pm, {id: pm.id}, data => {
        res.sendResult(data)
    })

};

// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 500, message: "ID不能为空！"})
    DAO.delete(Article, {id: pm.id}, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })

};

// Delete all Article from the database.
exports.deleteAll = (req, res) => {
    const pm = req.body;
    DAO.deleteAll(Article, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};

// Delete Article from the database.
exports.query = (req, res) => {
    const pm = req.body;
    let sql = 'SELECT * FROM `users`'
    DAO.doQuery(sql, data => {
        logger.debug(`${req.method} ${req.baseUrl + req.path} *** 参数：${JSON.stringify(pm)}; 响应：${JSON.stringify(data)}`);
        res.sendResult(data)
    })
};
