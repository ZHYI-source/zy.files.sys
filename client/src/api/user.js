import {get, post} from "./http";

export const getCaptcha = (data) =>
  get("/mg/api/public/v1/captcha", data);
//登录
export const getLogin = (data) =>
  post("/mg/api/public/v1/login ", data);
