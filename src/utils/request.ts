import RequestHandle, { RequestStatus } from 'cy-request'
import { Toast } from '@ant-design/react-native'
import NavigationUtil from './navigationUtil'
import AppConfig from '../../config'
import { getCurrentUser, clearCurrentUser } from './appData'
import { IUser } from './interface'
import BufferUtil from 'buffer'

interface IResponse {
    code: string | number,
    data?: Record<string, any>,
    message?: string
}
class Request extends RequestHandle {
    public static instance: Request
    constructor(){
        super()
        this.setOptions({
            prefix: AppConfig.httpBaseUrl,
            before: this.sendBefore,
            error: this.errorHandle,
            success: this.successHandle
        })
    }
    public static getInstance(){
        if(!Request.instance) Request.instance = new Request()
        return Request.instance
    }
    private async sendBefore(config: any){
        const user: IUser = await getCurrentUser() || {}
        if(user.isLogin){
            config.headers.common['Authorization'] = 'Bearer ' + user.access_token
        }else{
            config.headers.common['Authorization'] = AppConfig.appNameSpace + BufferUtil.Buffer.from(`${AppConfig.appName}:${AppConfig.appSecretkey}`).toString('base64')
        }
        return config
    }
    private restToken(){
        clearCurrentUser()
        NavigationUtil.navigate('Login')
    }
    private errorHandle(error: any){
        const status = (error && error.response) ? error.response.status : null
        let msgInfo = ''
        switch (status) {
            case RequestStatus.REQUEST_ERROR:
                msgInfo = '请求出错'
                break
            case RequestStatus.PERMISSION_DENIED:
                msgInfo = '没有权限'
                break
            case RequestStatus.REQUEST_REFUSE:
                msgInfo = '访问被拒绝'
                break
            case RequestStatus.NOTFOUND:
                msgInfo = '请求地址出错'
                break
            case RequestStatus.TIMEOUT:
                msgInfo = '请求超时'
                break
            case RequestStatus.SERVER_BAD:
                msgInfo = '服务器内部出错'
                break
            case RequestStatus.NETWORK_ERROR:
                msgInfo = '网关出错'
                break
            case RequestStatus.NETWORK_TIMEOUT:
                msgInfo = '网关超时'
                break
            default:
                break
        }
        Toast.info(msgInfo || error.message)
        return {}
    }
    private successHandle(response:IResponse){
        if (!response) return
        const { code, msg } = response.data || {}
        if(code === RequestStatus.SERVER_BAD){
            Toast.info('服务器异常:500', 1)
        } else if(code === RequestStatus.PERMISSION_DENIED){
            Toast.info('身份已过期，请重新登录')
            this.restToken()
        } else{
            if(code !== RequestStatus.REQUEST_SUCCESS_EXTRA) Toast.info(msg || '未知错误', 1)
        }
        return response.data || {}
    }
}

export default Request.getInstance()