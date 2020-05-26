import React, { FunctionComponent } from 'react'
import { Modal, ActivityIndicator, View, Text, StyleSheet } from 'react-native'

interface IProps {
    visible: boolean,
    text?: string
}
const Loading: FunctionComponent<IProps> = ({ visible = false, text = '正在加载' }) => {
    return <Modal visible={visible} transparent>
        <View style={Style.container}>
            <View style={Style.loading}>
                <ActivityIndicator color='#fff'/>
                <Text style={Style.text}>{text}</Text>
            </View>
        </View>
    </Modal>
}

export default Loading
const Style = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        flexDirection: 'row',
        padding: 15,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    text: {
        color: '#fff',
        marginLeft: 5
    }
})

