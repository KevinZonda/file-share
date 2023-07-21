import {FileApi} from "../api";
import {_fileInfoStore} from "./fileInfo.ts";
import {_configStore} from "./config.ts";

export  const API_BASE_PATH = "https://sigma.kevinzonda.com/funcs/file-share/api";
export const FileAPI = new FileApi()
export const ConfigStore = new _configStore()
export const FileInfoStore = new _fileInfoStore();