import React, { useEffect, FunctionComponent } from 'react'
import { View } from 'react-native'
import { Colors } from '@/colorManager'
import { useDynamicValue } from 'react-native-dark-mode'
import Authorized from '@/authorized'
import { NavigationUtil } from '@/utils'

const Layout: FunctionComponent = () => {
    const bgColor = useDynamicValue(Colors.common_bg_z1_color)
    return <View style={{ flex: 1, backgroundColor: bgColor }}>
        <Authorized ref={NavigationUtil.authorizedRef} />
    </View>

}
export default Layout