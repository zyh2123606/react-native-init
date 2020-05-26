import React, { SFC } from 'react'
import { Button } from '@ant-design/react-native'
import { View, Text, StyleSheet, Linking } from 'react-native'
import { connect } from 'react-redux'

type IProps = {
    data: any,
    visible: boolean
}
const GoolePlay: SFC<IProps> = ({ data, visible }) => {
    data = data || {}
    const goGoolePlay = () => {
        Linking.openURL('http://play.google.com/store/apps/details?id=com.rhjc56.slp.truckeeper.petrol')
    }
    return <View style={{...Style.content, display: visible ? undefined : 'none'}}>
        <Text style={Style.desc}>应用需要更新才能继续使用，请前往应用商店下载更新，点击确定跳转到应用商店下载</Text>
        <Button style={{borderWidth: 0, width: '100%', marginTop: 40}} onPress={goGoolePlay} type='primary'>下载更新</Button>
    </View>
}

const mapStateProps = (state: any) => ({ ...state.Language })
export default connect(mapStateProps)(GoolePlay)
const Style = StyleSheet.create({
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 20
    },
    desc: {
        marginTop: 20,
        color: '#111E37',
        fontSize: 16,
        lineHeight: 22
    }
})