import { createRef, RefObject } from 'react'
import { NavigationState } from '@react-navigation/native'

/**
 * @description 非路由模式下进行页面跳转及路由守卫
 * @author zouyonghong
 * @since 20/04/13
 */
class NavigationUtil {
    public static instance: NavigationUtil
    public navigationRef: RefObject<any> = createRef()
    public authorizedRef: RefObject<any> = createRef()
    public static getInstance(): NavigationUtil{
        if(!NavigationUtil.instance) NavigationUtil.instance = new NavigationUtil()
        return NavigationUtil.instance
    }
    public navigate(name: string, params?: Record<string, any> | undefined){
        this.navigationRef?.current && this.navigationRef.current.navigate(name, params)
    }
    public getNavigation(){
        return this.navigationRef.current && this.navigationRef.current
    }
    public navigationStateChange(state: NavigationState | undefined){
        if(!state) return
        const currentRouteName = this.getActiveRouteName(state),
            preState: NavigationState = { ...state, index: state.index > 0 ? state.index - 1 : 0},
            preRouteName = this.getActiveRouteName(preState)
    }
    public getActiveRouteName(routeState: NavigationState | any): string | undefined {
        if (!routeState) return
        const route = routeState.routes[routeState.index]
        if (route.state) return this.getActiveRouteName(route.state)
        return route.name
    }
    public renderAuthorized(){
        if(this.authorizedRef.current)
            this.authorizedRef.current.renderAuthorized()
    }
}

export default NavigationUtil.getInstance()