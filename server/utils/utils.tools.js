//各种通用工具类
let {md5} = require("./utils.crypto");
//时间格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const utilsTools = {
    //生成永不重复的id
    createRandomId: () => {
        return md5((new Date()).getTime() + '-' + Math.random().toString().substr(2, 5)
        ).toString()
    },
    //获取实时时间
    getDate:()=>{
       return new Date().Format("yyyy-MM-dd hh:mm:ss")
    },
    //对象参数为空就删除该属性
    deleteNullObj:(keywords)=>{
        if (!keywords){
            return  keywords
        }
        for(let key in keywords) {
            if(keywords[key] === '') {
                delete keywords[key]
            }
        }
        return keywords
    }

}
module.exports = utilsTools
