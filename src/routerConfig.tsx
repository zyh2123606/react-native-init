import React, { Fragment } from 'react'
import { createStackNavigator, StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack'
import Main from './screens/main'
import Login from './screens/user'
import PasswordLogin from './screens/user/password'
import Forget from './screens/user/forget'
import SMSCode from './screens/smsCode'
import Scan from './screens/scan'
import SetPassword from './screens/user/setPassword'

//页面切换配置
export const Stack = createStackNavigator()
export const ScreensConfig: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: {
            animation: 'spring',
            config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01
            }
        },
        close: {
            animation: 'spring',
            config: {
                stiffness: 1000,
                damping: 500,
                mass: 3,
                overshootClamping: true,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 0.01
            }
        }
    }
}

//已登录路由
export const AppScreens = (
    <Fragment>
        <Stack.Screen name='Main' component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name='Scan' component={Scan} options={{ headerShown: false }}/>
    </Fragment>
)

//未登录路由
export const SignOutScreens = (
    <Fragment>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
        <Stack.Screen name='PasswordLogin' component={PasswordLogin} options={{ headerShown: false }}/>
        <Stack.Screen name='Forget' component={Forget} options={{ headerShown: false }}/>
        <Stack.Screen name='SMSCode' component={SMSCode} options={{ headerShown: false }}/>
        <Stack.Screen name='SetPassword' component={SetPassword} options={{ headerShown: false }}/>
    </Fragment>
)
