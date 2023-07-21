import {FileApi} from "../api";
import {_fileInfoStore} from "./fileInfo.ts";
import {_configStore} from "./config.ts";

export  const API_BASE_PATH = "http://127.0.0.1:8081/api";
export const FileAPI = new FileApi()
export const ConfigStore = new _configStore()
export const FileInfoStore = new _fileInfoStore();