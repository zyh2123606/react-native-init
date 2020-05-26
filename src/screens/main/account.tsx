import React, { FunctionComponent } from 'react'
import { View, Text } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { SetStatusBar } from '@/components'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { Colors } from '@/colorManager'

interface IProps {
    navigation: NavigationProp<any>
}
const Account: FunctionComponent<IProps> = ({ navigation }) => {
    const Style = useDynamicStyleSheet(dyStyle)
    return <View style={Style.container}>
        <Text>account</Text>
    </View>
}
export default SetStatusBar({
    barStyle: 'light-content',
    translucent: true,
    backgroundColor: 'transparent'
})(Account)

const dyStyle = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: Colors.common_fg_color
    }
})