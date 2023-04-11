//模型创建 https://www.sequelize.com.cn/core-concepts/model-basics#%E5%AD%97%E7%AC%A6%E4%B8%B2

const {aes} = require('../utils/utils.crypto')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("users", {
        id: {
            type: Sequelize.UUID,
            notNull: true,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4 // 或 DataTypes.UUIDV1
        },
        username: {
            type: Sequelize.STRING,
            notNull: true,
            notEmpty: true,
            comment: '用户名',
            defaultValue: "admin",
        },
        password: {
            type: Sequelize.STRING,
            notEmpty: true,
            comment: '密码',
            defaultValue: 'Vchs0bbdk2pr/Ac6DsHruw==',
            set(value) {
                // 在数据库中以明文形式存储密码是很糟糕的.
                // 使用适当的aes对称加密更好.
                this.setDataValue('password', aes.en(value));
            }
        },
        nickName: {
            type: Sequelize.STRING,
            defaultValue: "John Doe"
        },
        verificationCode: {
            type: Sequelize.INTEGER
        },
    });
};
