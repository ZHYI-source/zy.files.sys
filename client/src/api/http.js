/**
 *@author ZY
 *@date 2022/2/10
 *@Description:请求方式的封装
 */
import request from "@/utils/request";
import service from "../utils/request";

// 封装axios的post请求

export function post(url, params, opt) {
  request.interceptors.request.use(
    config => {
      if (opt){
        config.responseType = opt.responseType
      }
      return config
    },
  )
  return new Promise((resolve, reject) => {
    request.post(url, params).then(response => {
      resolve(response.data)
    })
      .catch((error) => {
        reject(error)
      })
  })
}

// 封装axios的get请求
export function get(url, params, opt) {
  request.interceptors.request.use(
    config => {
      if (opt){
        config.responseType = opt.responseType
      }
      return config
    },
  )
  return new Promise((resolve, reject) => {
    request.get(url, params)
      .then(response => {
        resolve(response.data)
      })
      .catch((error) => {
        reject(error)

      })

  })
}
