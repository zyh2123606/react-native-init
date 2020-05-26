import React, { Component } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { getCurrentUser } from '@/utils/appData'
import { NavigationContainer } from '@react-navigation/native'
import { AppScreens, SignOutScreens, Stack, ScreensConfig } from '@/routerConfig'
import { NavigationUtil } from '@/utils'

class Authorized extends Component {
    state = {
        isLogin: null
    }
    async componentDidMount() {
        setTimeout(() => { SplashScreen.hide() }, 1000)
        this.renderAuthorized()
    }
    async renderAuthorized() {
        const { isLogin } = await getCurrentUser()
        this.setState({ isLogin })
    }
    render() {
        const { isLogin } = this.state
        return (isLogin === null) ? null : 
        <NavigationContainer ref={NavigationUtil.navigationRef}
            onStateChange={(state) => NavigationUtil.navigationStateChange(state)}>
            <Stack.Navigator screenOptions={ScreensConfig}>
                {isLogin ? AppScreens : SignOutScreens}
            </Stack.Navigator>
        </NavigationContainer>
    }
}
export default Authorized