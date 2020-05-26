import React, { FunctionComponent } from 'react'
import { StyleProp } from 'react-native'
import LeftContent from './LeftContent'
import RightContent from './RightContent'
import { StackNavigationOptions } from '@react-navigation/stack'
import { NavigationProp } from '@react-navigation/native'

import Style from './Style'
/**
 * @description 公共顶部导航栏组件
 * @since 20/04/15
 */
interface IOptions {
    navigation: NavigationProp<any, string>
    leftText?: string | undefined
    rightText?: string | undefined
    rightTextColor?: string
    showLeftText?: boolean
    leftHandle?: (() => void) | undefined
    rightHandle?: (() => void) | undefined
}
const NavBar: FunctionComponent<IOptions & StackNavigationOptions> = ({
    navigation,
    title,
    showLeftText = true,
    leftText,
    rightText,
    rightTextColor,
    headerTitleStyle = {},
    headerTitleContainerStyle = {} as StyleProp<any>,
    headerLeftContainerStyle = {} as StyleProp<any>,
    leftHandle,
    rightHandle,
    headerStyle = {} as StyleProp<any>
}): any => {
    return {
        title,
        headerTitleStyle: { ...Style.title, headerTitleStyle },
        headerTitleAlign: 'center',
        headerTitleContainerStyle: { ...Style.titleContainer, ...headerTitleContainerStyle },
        headerStyle: { ...Style.header, ...headerStyle },
        headerLeft: () => <LeftContent navigation={navigation} showLeftText={showLeftText} leftHandle={leftHandle} text={leftText} />,
        headerLeftContainerStyle: { ...Style.leftContainer, ...headerLeftContainerStyle },
        headerRight: () => <RightContent color={rightTextColor} rightHandle={rightHandle} navigation={navigation} text={rightText} />
    }
}

export default NavBar