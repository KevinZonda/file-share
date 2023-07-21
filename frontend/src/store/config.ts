import {makeAutoObservable} from "mobx";

export class _configStore {
  public DefaultTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  }

  private _apiKey = ''
  public constructor() {
    const _apiKey = localStorage.getItem("apiKey")
    if (_apiKey) {
      this._apiKey = _apiKey
    }
    makeAutoObservable(this)
  }
  public set ApiKey(apiKey: string) {
    this._apiKey = apiKey
    localStorage.setItem("apiKey", apiKey)
  }
  public get ApiKey() {
    return this._apiKey
  }
}