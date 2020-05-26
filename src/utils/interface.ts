//设备信息
export interface IDevice {
    deviceId: string,
    phoneModel: string,
    os: number,
    osVersion: string,
    appVersion: string,
    emei: string
}

//用户信息
export interface IUser {
    id?: number
    isLogin: boolean
    access_token?: string | undefined
    expires_in?: number
    refresh_token?: string | undefined
    scope?: string
    token_type?: string
}