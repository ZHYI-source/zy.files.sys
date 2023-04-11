import {get, post} from "./http";

export const dirArticleList = (data) =>
  get("/mg/api/v1/article/list", data);

export const dirArticleCreate = (data) =>
  post("/mg/api/v1/article/create", data);

export const dirArticleUpdate = (data) =>
  post("/mg/api/v1/article/update", data);

export const dirArticleDelete = (data) =>
  post("/mg/api/v1/article/delete", data);


export const dirFilesList = (data) =>
  post("/mg/api/v1/files/list", data);


export const dirFilesDelete = (data) =>
  post("/mg/api/v1/files/delete", data);


export const dirFilesCreate = (data) =>
  post("/mg/api/v1/files/create", data);

export const dirFilesSliceMerge = (data) =>
  post("/mg/api/v1/files/sliceMerge", data);

export const dirFilesUpdate = (data) =>
  post("/mg/api/v1/files/update", data);

export const dirFilesFindOne = (id) =>
  get(`/mg/api/v1/files/findOne?id=${id}`, null, {responseType: 'blob'});



