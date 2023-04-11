//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//文件管理
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("files",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            pid:{
                type: Sequelize.STRING,
                comment: '父id',
            },
            downUrl:{
                type: Sequelize.STRING,
                comment: '文件下载链接',
            },
            preUrl:{
                type: Sequelize.STRING,
                comment: '文件预览链接',
            },
            icon:{
                type: Sequelize.STRING,
                comment: 'icon',
                defaultValue: 'https://s1.ax1x.com/2023/01/11/pSnKiH1.png'
            },
            ext:{
                type: Sequelize.STRING,
                comment: '文件后缀',
            },
            name:{
                type: Sequelize.STRING,
                comment: '文件名称',
            },
            size:{
                type: Sequelize.STRING,
                comment: '文件大小',
            },
            mimetype:{
                type: Sequelize.STRING,
                comment: '文档类别',
            },
            type: {
                type: Sequelize.INTEGER,
                comment: '文件类型',
                defaultValue: 1
            },
            status: {
                type: Sequelize.BOOLEAN,
                comment: '状态',
                defaultValue: true
            },
            content: {
                type: Sequelize.TEXT("long"),
                comment: '备注',
            },
        }, {
            tableName: 'mg_files'
        });
};
