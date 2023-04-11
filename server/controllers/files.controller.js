const db = require("../models");
const config = require("../config");
const logger = require("../utils/utils.logger");
const DAO = require("../dao/DAO");
const Files = db.files;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const chalk = require("chalk");

// size：初始文件大小
function getfilesize(size) {
    if (!size)
        return "";

    var num = 1024.00; //byte

    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "K"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

function walkSync(currentDirPath, callback) {
    fs.readdirSync(currentDirPath, {withFileTypes: true}).forEach(function (dirent) {
        var filePath = path.join(currentDirPath, dirent.name);
        if (dirent.isFile()) {
            callback(filePath, dirent);
        } else if (dirent.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}


// Create and Save a new Files 上传文件
exports.create = (req, res) => {
    //单图上传
    /*    let uploadDir = multer({dest: 'uploads_files/files'}).single('file') //存放文件夹
        uploadDir(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // 发生错误
                console.log(chalk.bold.red(`【文件上传失败】 *** 地址：${req.method} ${req.baseUrl + req.path}`))
                return res.status(605).sendResult({data: null, code: 500, message: '上传文件失败'})
            } else if (err) {
                console.log(chalk.bold.red(`【文件上传失败】 ***  地址：${req.method} ${req.baseUrl + req.path}`))
                return res.status(605).sendResult({data: null, code: 500, message: '上传文件失败'})
            }
            const pm = req.file;
            let fileExtArray = pm.originalname.split(".");
            let ext = fileExtArray[fileExtArray.length - 1];
            let targetPath = pm.destination + '/' + pm.originalname;
            let mimetype = pm.mimetype;
            let imgName = pm.originalname;
            let size = getfilesize(pm.size);
            let fileArr = []
            walkSync('uploads_files/files', function (filePath, stat) {
                fileArr.push(stat.name)
            });

            if (fileArr.includes(imgName)) {
                console.log(chalk.bold.red(`【文件上传失败】 ${imgName} *** 文件名重复，请修改后再重新上传 地址：${req.method} ${req.baseUrl + req.path}`))
                return res.status(605).sendResult({
                    data: null, code: 605, message: '文件名重复，请修改后再重新上传'
                })
            }
            //为上传成功的文件重命名（上传的文件默认不是文件的原名称）
            fs.rename(path.join(process.cwd(), "/" + req.file.path), path.join(process.cwd(), targetPath), function (err) {
                if (err) {
                    console.log(chalk.bold.red(`【文件上传失败】 ${imgName} *** 上传文件失败 地址：${req.method} ${req.baseUrl + req.path}`))
                    return res.status(605).sendResult({data: null, code: 500, message: '上传文件失败'})
                }
                let newFile = {
                    content: pm.content,
                    downUrl: `${config.RUN.BASEURL}/api/v1/files/findOne?id=${imgName}`,
                    preUrl: `${config.RUN.BASEURL}/api/v1/files/preview?p=${imgName}&&mimetype=${mimetype || ext}`,
                    pid: pm.pid || '',
                    icon: pm.icon || '',
                    ext: ext,
                    mimetype: mimetype,
                    name: imgName,
                    size: size,
                    type: pm.type || 1,
                    status: pm.status || true,
                }
                DAO.create(Files, newFile, (data => {
                    res.sendResult({
                        data, code: 200, message: '上传成功'
                    })
                }))
            })
        })*/

    //多图上传
    let uploadDir = multer({dest: 'uploads_files/files'}).array('file', 5) //存放文件夹 多图上传 最多5份文件
    uploadDir(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // 发生错误
            console.log(chalk.bold.red(`【文件上传失败】 *** 地址：${req.method} ${req.baseUrl + req.path}`))
            return res.status(605).sendResult({data: null, code: 500, message: '上传文件失败'})
        } else if (err) {
            console.log(chalk.bold.red(`【文件上传失败】 ***  地址：${req.method} ${req.baseUrl + req.path}`))
            return res.status(605).sendResult({data: null, code: 500, message: '上传文件失败'})
        }
        if (req.files.length === 0) return res.status(605).sendResult({data: null, code: 605, message: '上传文件不能为空'})
        const pm = req.files;
        let fileInfos = [];
        let fileArr = []
        let noFileArr = [] //未上传的
        walkSync('uploads_files/files', function (filePath, stat) {
            fileArr.push(stat.name)
        });
        for (var i in pm) {
            let file = pm[i];
            let fileInfo = {};
            //获取文件基本信息
            fileInfo.fileExtArray = file.originalname.split(".");
            fileInfo.ext = file.originalname.split(".")[file.originalname.split(".").length - 1];
            fileInfo.mimetype = file.mimetype;
            fileInfo.originalname = file.originalname;
            fileInfo.size = getfilesize(file.size);
            fileInfo.targetPath = file.destination + '/' + file.originalname;
            fileInfo.path = file.path;
            fs.renameSync(path.join(process.cwd(), "/" + fileInfo.path), path.join(process.cwd(), fileInfo.targetPath))
            //分离已存在的文件则不入库
            if (fileArr.includes(file.originalname)) {
                noFileArr.push(fileInfo.originalname);
            } else {
                fileInfos.push(fileInfo);
            }
        }
        //构建数据入库
        let newFileArr = []
        for (const fileArrElement of fileInfos) {
            let newFile = {
                content: fileArrElement.content || '',
                downUrl: `${config.RUN.BASEURL}/api/v1/files/findOne?id=${fileArrElement.originalname}`,
                preUrl: `${config.RUN.BASEURL}/api/v1/files/preview?p=${fileArrElement.originalname}&&mimetype=${fileArrElement.mimetype || fileArrElement.ext}`,
                pid: fileArrElement.pid || '',
                icon: fileArrElement.icon || '',
                ext: fileArrElement.ext,
                mimetype: fileArrElement.mimetype,
                name: fileArrElement.originalname,
                size: fileArrElement.size,
                type: fileArrElement.type || 1,
                status: fileArrElement.status || true,
            }
            newFileArr.push(newFile)
        }
        Files.bulkCreate(newFileArr).then(_t => {
            res.sendResult({
                data: {success: _t, errFiles: noFileArr || []},
                code: noFileArr.length ? 605 : 200,
                message: noFileArr.length ? '文件上传失败或者文件名已存在' : '上传成功'
            })
        })
    })
};

// Retrieve all Files from the database.
exports.findAll = (req, res) => {
    const pm = req.body;
    DAO.list(Files, pm, list => {
        res.sendResult(list)
    })
};

// Find a single Files with an id //下载文件
exports.findOne = (req, res, next) => {
    let name = req.query.id;
    name = decodeURI(name)
    let url = path.resolve(process.cwd(), `uploads_files/files/${name}`)
    //判断该文件是否存在
    fs.access(url, function (err) {
        if (!err) {
            res.set({
                "Content-type": "application/octet-stream",
                "Content-Disposition": "attachment;filename=" + encodeURI(name),
                'Content-Length': fs.statSync(url).size
            });
            let fReadStream = fs.createReadStream(url);
            fReadStream.pipe(res)
        } else {
            console.log(chalk.bold.red(`【文件不存在】 ${name} *** 文件不存在 地址：${req.method} ${req.baseUrl + req.path}`))
            res.status(605).sendResult({data: {}, code: 605, message: '文件不存在'})
        }
    })


};

// Update a Files by the id in the request
exports.update = (req, res) => {
    const pm = req.body;
    // 请求验证
    DAO.update(Files, pm, {id: pm.id}, data => {
        res.sendResult(data)
    })
};

// Delete a Files with the specified id in the request
exports.delete = (req, res) => {
    const pm = req.body;
    // 请求验证
    if (!pm.id) return res.sendResult({data: '', code: 605, message: "ID不能为空！"})
    let url = path.resolve(process.cwd(), `uploads_files/files/${pm.name}`)
    //删除 static 目录下的目标文件
    fs.unlink(url, function (err) {
        if (err) {
            console.log(chalk.bold.red(`【文件不存在】 ${pm.name} *** 文件不存在 地址：${req.method} ${req.baseUrl + req.path}`))
            console.log(err)
            return res.status(605).sendResult({data: {}, code: 605, message: '文件不存在'})
        }
        DAO.delete(Files, {id: pm.id}, data => {
            res.sendResult(data)
        })
    })
};
// preview a Files with the specified id in the request
exports.preview = (req, res) => {
    let {p, mimetype} = req.query
    if (!p) return res.sendResult({data: '', code: 605, message: "参数错误"});
    let fileExtArray = p.split(".")
    let ext = mimetype || fileExtArray[fileExtArray.length - 1];
    const filePath = path.resolve(process.cwd(), `uploads_files/files/${p}`);
    res.setHeader("Content-Type", ext);
    //格式必须为 binary 否则会出错
    fs.readFile(filePath, "binary", function (err, content) {
        if (err) {
            logger.error(`【预览资源不存在】 ${req.method} ${req.baseUrl + req.path} *** 响应：${JSON.stringify({
                data: null,
                code: err.status || 500,
                message: err.message || '资源不存在'
            })}`);
            return res.sendResult({data: null, code: 500, message: "资源不存在"});
        }
        //格式必须为 binary，否则会出错
        res.write(content, "binary");
        res.end();
    })


};


