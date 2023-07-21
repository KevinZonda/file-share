import {makeAutoObservable, runInAction} from "mobx";
import {FileInfoResponse} from "../api/api.ts";
import {FileAPI} from "./index.ts";

export class _fileInfoStore {
  constructor() {
    makeAutoObservable(this)
  }

  private infoSet : Record<string, FileInfoResponse> = {}

  public getInfo(id: string) {
    if (!this.infoSet[id]) {
      FileAPI.getFileInfo({id: id}).then(res => {
        runInAction(() => {
          this.infoSet[id] = res.data
        })
      })
    }
    return this.infoSet[id]
  }
}