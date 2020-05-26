import AsyncStorage from '@react-native-community/async-storage'
import { v1 as UuidV1 } from 'uuid'
import { IDevice, IUser } from './interface'
import CryptoJS from 'crypto-js'

const DeviceInfo = require('react-native-device-info')
const USER_TAG = 'APP_USER'
//保存登陆后的用户信息
interface User {
    isLogin: boolean
    token: string
}
export const saveCurrentLoginUser = async (user: User) => {
    await AsyncStorage.setItem(USER_TAG, JSON.stringify(user))
}

//获取登录的用户信息
export const getCurrentUser = async (): Promise<IUser> => {
    const currentUser = await AsyncStorage.getItem(USER_TAG)
    try {
        if (currentUser)
            return JSON.parse(currentUser)
    } catch (e) {
        console.log('JSON解析出错', e)
    }
    return { isLogin: false }
}

//清除用户信息
export const clearCurrentUser = async () => {
    await AsyncStorage.removeItem(USER_TAG)
}

//获取设备信息
export const getDeviceInfo = async (): Promise<IDevice> => {
    let deviceId = await DeviceInfo.getDeviceId(),
        phoneModel = await DeviceInfo.getModel(),
        os = await DeviceInfo.getSystemName(),
        osVersion = await DeviceInfo.getSystemVersion(),
        appVersion = await DeviceInfo.getVersion(),
        emei = await DeviceInfo.getUniqueId(),
        prodName = await DeviceInfo.getManufacturer()
    return { deviceId, phoneModel: prodName + phoneModel, os: os === 'IOS' ? 1 : 2, osVersion, appVersion, emei }
}

//生成UUID
export const getUUID = (): string => {
    return UuidV1()
}

//加密登录密码字符串
export const getEncyptionKey = (word: string, keyStr: string, ivStr: string): string => {
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let iv = CryptoJS.enc.Utf8.parse(ivStr)
    let srcs = CryptoJS.enc.Utf8.parse(word);
    const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * 数字金额格式化
 * @param money 要格式化的金额
 * @param decimals 保留几位小数
 * @param dec_point 小数点符号
 * @param thousands_sep 千分位符号
 */
export const moneyFormat = (money: number | string,
    decimals: number = 2,
    dec_point: string = '.',
    thousands_sep: string = ','): string => {
    if (money === null || isNaN(Number(money))) return '金额错误'
    money = (money + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+money) ? 0 : +money,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        s,
        toFixedFix = (n: number, prec: number) => {
            const k = Math.pow(10, prec)
            return '' + parseFloat(Math['ceil'](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k
        }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    const re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + thousands_sep + "$2");
    }

    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec_point)
}