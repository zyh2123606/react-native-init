import React from 'react'
import { Button } from '@ant-design/react-native'
import { View, Text, StyleSheet, Linking } from 'react-native'
import { connect } from 'react-redux'

interface IProps {
    data: any,
    visible: boolean,
    onClose:() => void
}
const Content: React.FunctionComponent<IProps> = ({ data, visible, onClose }) => {
    const { appVersion, isMandatory, changeLog } = data || {}
    let contentList: string[] = [changeLog]
    try{
        contentList = changeLog.split('<br>')
    }catch{}
    const goGoolePlay = () => {
        Linking.openURL('http://play.google.com/store/apps/details?id=com.rhjc56.slp.truckeeper.petrol')
    }
    return <View style={{ ...Style.content, display: visible ? undefined : 'none' }}>
        <View style={Style.header}>
            <Text style={Style.title}>发现更新</Text>
            <Text style={Style.version}>版本 {appVersion}</Text>
        </View>
        <Text style={Style.descTitle}>更新内容：</Text>
        <View style={Style.desc}>
            {contentList.map((descText: string, idx: number) => (
                <Text key={idx} style={Style.descContent}>{`${descText}`}</Text>
            ))}
        </View>
        <Button type='primary' onPress={goGoolePlay} style={{ ...Style.downloadBtn, borderWidth: 0, display: isMandatory ? undefined : 'none' }}>下载更新</Button>
        <View style={{ ...Style.btnPanel, display: isMandatory ? 'none' : undefined }}>
            <Button style={{ ...Style.upBtn, marginRight: 10 }} onPress={() => onClose && onClose()} type='ghost'>暂不更新</Button>
            <Button style={{ ...Style.upBtn, borderWidth: 0 }} onPress={goGoolePlay} type='primary'>马上更新</Button>
        </View>
    </View>
}

export default connect(({ Language }: any) => ({
    ...Language
}))(Content)
const Style = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        borderRadius: 4,
        minHeight: 200,
        padding: 15,
        paddingBottom: 25
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 80
    },
    title: {
        color: '#3055EC',
        fontSize: 20,
        fontWeight: 'bold'
    },
    version: {
        color: '#3055EC'
    },
    descTitle: {
        width: '100%',
        textAlign: 'left',
        color: '#3D416B',
        marginTop: 20,
        fontSize: 18
    },
    desc: {
        width: '100%',
        flexDirection: 'column',
        marginTop: 5,
        alignItems: 'flex-start'
    },
    descContent: {
        color: '#3D416B'
    },
    downloadBtn: {
        marginTop: 30,
        width: '100%'
    },
    btnPanel: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 30,
        overflow: 'hidden'
    },
    upBtn: {
        flex: 1
    }
})