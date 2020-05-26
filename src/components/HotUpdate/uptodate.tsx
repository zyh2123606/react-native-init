import React, { SFC } from 'react'
import { Button } from '@ant-design/react-native'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

type IProps = {
    onClose: Function,
    visible: boolean,
    intl?: any
}
const UpToDate: SFC<IProps> = ({ onClose, visible, intl }) => {
    return <View style={{ ...Style.content, display: visible ? undefined : 'none' }}>
        <Text style={Style.desc}>当前已是最新版本，无需更新</Text>
        <Button onPress={() => onClose && onClose()} style={Style.btn} type='primary'>我知道了</Button>
    </View>
}

const mapStateProps = ({ Language }: any) => ({ ...Language })
export default connect(mapStateProps)(UpToDate)
const Style = StyleSheet.create({
    content: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    desc: {
        marginTop: 20,
        color: '#111E37'
    },
    btn: {
        borderWidth: 0,
        width: '100%',
        marginTop: 40,
        borderRadius: 2
    }
})