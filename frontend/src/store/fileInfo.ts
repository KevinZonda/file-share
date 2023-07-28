import {makeAutoObservable, runInAction} from "mobx";
import {FileInfoResponse} from "../api";
import {FileAPI} from "./index.ts";

export class _fileInfoStore {
  constructor() {
    makeAutoObservable(this)
  }

  private infoSet: Record<string, FileInfoResponse> = {}
  private _isLoading = false
  public get isLoading() {
    return this._isLoading
  }

  public getInfo(id: string, forced: boolean = false) {
    if (this.infoSet[id] && !forced) {
      return this.infoSet[id]
    }
    runInAction(() => {
      this._isLoading = true
    })
    FileAPI.getFileInfo({id: id}).then(res => {
      runInAction(() => {
        this.infoSet[id] = res.data
      })
    }).finally(() => {
      runInAction(() => {
        this._isLoading = false
      })
    })

    return this.infoSet[id]
  }

  public getInfoWithPassword(id: string, password: string, forced: boolean = false) {
    if (this.infoSet[id] && !forced && (this.infoSet[id].size ?? -1 >= 0)) {
      return this.infoSet[id]
    }
    runInAction(() => {
      this._isLoading = true
    })
    FileAPI.getFileInfo({id: id, password: password}).then(res => {
      runInAction(() => {
        this.infoSet[id] = res.data
      })
    }).finally(() => {
      runInAction(() => {
        this._isLoading = false
      })
    })

    return this.infoSet[id]

  }
}