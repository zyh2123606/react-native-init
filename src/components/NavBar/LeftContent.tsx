import React, { memo, SFC, ReactElement } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { Icon } from '@/components'
import { NavigationProp } from '@react-navigation/native'

import Style from './Style'
interface IProps {
    navigation: NavigationProp<any>
    text: string | undefined | ReactElement
    showLeftText: boolean
    leftHandle: (() => void) | undefined
}
const LeftContent: SFC<IProps> = memo(({ navigation, showLeftText, leftHandle, text='返回' }) => {
    leftHandle = leftHandle || navigation.goBack 
    return <TouchableOpacity style={Style.leftBtn} onPress={() => leftHandle && leftHandle()}>
        <Icon name='back' color='rgba(30,32,41,1)' size={showLeftText ? 14 : 20} />
        {showLeftText ? <Text style={Style.leftText}>{text}</Text> : null}
    </TouchableOpacity>
})
export default LeftContent