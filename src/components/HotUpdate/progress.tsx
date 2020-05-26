import React, { SFC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

type IProps = {
    currProgress: number,
    visible: boolean,
    receivedBytes: number,
    totalBytes: number
}
const Progress: SFC<IProps> = ({ visible, currProgress, receivedBytes, totalBytes }) => {
    return <View style={{...Style.content, display: visible ? undefined : 'none'}}>
        <View style={{marginTop: 30, flexDirection: 'row'}}>
            <Text style={{...Style.bytes, flex: 1}}>已下载{receivedBytes}/mb</Text>
            <Text style={Style.bytes}>文件大小{totalBytes}/mb</Text>
        </View>
        <View style={Style.stack}>
            <View style={{...Style.bar, width: `${currProgress}%`}}>
                <Text style={Style.percent} numberOfLines={1}>{currProgress}%</Text>
            </View>
        </View>
        <Text style={Style.progText}>正在更新，请稍后...</Text>
    </View>
}

const mapStateProps = (state: any) => ({ ...state.Language })
export default connect(mapStateProps)(Progress)
const Style = StyleSheet.create({
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 20
    },
    bytes: {
        textAlign: 'left',
        color: '#969BA6',
        fontSize: 12
    },
    stack: {
        backgroundColor: '#EFEFF4',
        height: 20,
        width: '100%',
        borderRadius: 10,
        marginTop: 2
    },
    bar: {
        backgroundColor: '#3055EC',
        height: 20,
        borderRadius: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        minWidth: 0
    },
    progText: {
        width: '100%',
        textAlign: 'center',
        color: '#969BA6',
        marginTop: 5
    },
    percent: {
        color: '#fff',
        marginRight: 6,
        fontSize: 12
    }
})