import React, { useCallback, FunctionComponent } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { StatusBar, StatusBarStyle } from 'react-native'
import { NavigationProp, useFocusEffect } from '@react-navigation/native'

import { isAndroid } from '@/utils/device'
interface IProps {
    barStyle?: any
    backgroundColor?: string
    translucent?: boolean
    navigation?: NavigationProp<any>
    setBarStyle?: (style: string, animated: boolean) => void
}
interface IStatusBar {
    barStyle: StatusBarStyle
    translucent: boolean
    backgroundColor: string
}
/**
 * @description 用于设置状态栏属性的公共组件
 * @since 20/04/15
 */
const statusDarkStyle = {
    barStyle: 'dark-content' as StatusBarStyle,
    backgroundColor: '#fff',
    translucent: false
}
export default (statusbarProps: IProps) => (WrappedComponent: any): any => {
    const StatusComponent: FunctionComponent<IProps> = (props) => {
        useFocusEffect(() => {
            const curStytusBarStyle = { ...statusDarkStyle, ...statusbarProps }
            _setStatusBar(curStytusBarStyle)
        })
        const _setStatusBar = useCallback((statusBarStyle: IStatusBar) => {
            const { barStyle, backgroundColor, translucent } = statusBarStyle
            StatusBar.setBarStyle(barStyle)
            if (isAndroid()) {
                StatusBar.setTranslucent(translucent)
                StatusBar.setBackgroundColor(backgroundColor)
            }
        }, [])
        return <WrappedComponent {...props} />
    }
    return hoistNonReactStatics(StatusComponent, WrappedComponent)
}