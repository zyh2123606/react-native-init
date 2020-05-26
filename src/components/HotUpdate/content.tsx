import React, { SFC } from 'react'
import { Button } from '@ant-design/react-native'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

type IProps = {
    data: any,
    onUpdate?: Function,
    visible: boolean,
    onClose: Function
}
const Content: SFC<IProps> = ({ data, onUpdate, visible, onClose }) => {
    const { isMandatory, description } = data || {}
    let contentList = []
    try{
        const { content } = JSON.parse(description)
        contentList = content.split('#')
    }catch{}
    return <View style={{...Style.content, display: visible ? undefined : 'none'}}>
        <Text style={Style.descTitle}>更新内容：</Text>
        <View style={Style.desc}>
            {contentList.map((descText: string, idx: number) => (
                <Text key={idx} style={Style.descContent}>{`${descText}`}</Text>
            ))}
        </View>
        <Button type='primary' onPress={() => onUpdate && onUpdate()} style={{...Style.downloadBtn, display: isMandatory ? undefined : 'none'}}>下载更新</Button>
        <View style={{...Style.btnPanel, display: isMandatory ? 'none' : undefined}}>
            <Button style={{...Style.upBtn, marginRight: 10}} onPress={() => onClose && onClose()} type='ghost'>暂不更新</Button>
            <Button style={{...Style.upBtn, borderWidth: 0}} onPress={() => onUpdate && onUpdate()} type='primary'>马上更新</Button>
        </View>
    </View>
}

const mapStateProps = (state: any) => ({ ...state.Language })
export default connect(mapStateProps)(Content)
const Style = StyleSheet.create({
    content: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    descTitle: {
        width: '100%',
        textAlign: 'left',
        color: '#3D416B',
        marginTop: 20,
        fontSize: 18
    },
    desc:{
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
        width: '100%',
        borderWidth: 0,
        borderRadius: 2
    },
    btnPanel:{
        width: '100%',
        flexDirection: 'row',
        marginTop: 30,
        overflow: 'hidden'
    },
    upBtn: {
        borderRadius: 2,
        flex: 1
    }
})