//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

//文章信息模型
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("article",
        {
            id: {
                type: Sequelize.UUID,
                notNull: true,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
            },
            url: {
                type: Sequelize.STRING,
                notNull: true,
                notEmpty: true,
                comment: '地址',
                defaultValue: "https://www.bidushe.com/sanwen/81058.html",
            },
            name: {
                type: Sequelize.STRING,
                comment: '文章名称',
                defaultValue: "竹叶青茶洗心尘"
            },

        }, {
            tableName: 'mg_article'
        });
};
