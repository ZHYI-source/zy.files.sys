module.exports = {
    //数据库配置
    DATABASE:{
        // pro
        HOST: "114.117.164.181",
        USER: "mg_open",
        PASSWORD: "w7TdAxFWX8CncWrH",
        DB: "mg_open",
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    },
    //运行配置
    RUN:{
        PORT:3001,
        BASEURL:'http://www.zhouyi.run:3001', // pro
        ISSHOWROUTER:false,//打印台是否展示路由表
        SIGN_KEY : 'gLR+JUuKR/R5KrA1gr4ukg==',//密钥AE对称加过密 token密钥
        ISSYNCHTABLE:true,//是否需要同步的所有表模型
        SYNCHTABLE:'',//需要同步更新字段的表模型 ‘article’
    },

};
