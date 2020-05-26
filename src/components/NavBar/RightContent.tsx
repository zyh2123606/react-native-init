import React, { SFC, ReactElement } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import Style from './Style'

type IProps = {
    navigation: NavigationProp<any>
    text: string | undefined | ReactElement
    rightHandle: (() => void) | undefined
    color?: string
}
const RightContent: SFC<IProps> = ({ navigation, rightHandle, color, text }) => {
    rightHandle = rightHandle || navigation.goBack
    return <TouchableOpacity style={Style.rightBtn} onPress={rightHandle}>
        <Text style={{ ...Style.rightText, color }}>{text}</Text>
    </TouchableOpacity>
}
export default RightContent