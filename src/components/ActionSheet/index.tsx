import React, { SFC, Fragment } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Modal, Button } from '@ant-design/react-native'
import { isiPhoneX } from '../../utils/device'

interface IProps {
    visible: boolean,
    data: Array<any>,
    onClose?: () => void,
    title?: string,
    getData?: (data: any) => void,
    fieldName: string,
    showHeader?: boolean
}
/**
 * @description 主要用户数据量小的上拉modal选择
 * @since 20/02/24
 * @param visible 显示/隐藏
 * @param data 显示的item数据
 * @param onClose 关闭模态框
 * @param title 显示的标题,
 * @param getData 点击的时候获取点击的数据
 */
const ActionSheet: SFC<IProps> = ({ visible, data, onClose, title = '请选择', showHeader=true, fieldName, getData }) => {
    const itemHandleCheck = (record: any) => {
        onClose && onClose()
        getData && getData(record)
    }
    return <Modal visible={visible} popup
        style={Style.actSheet}
        onClose={onClose}
        maskClosable
        animationType='slide-up'>
        <View style={{...Style.header, display: showHeader ? undefined : 'none'}}>
            <Text style={Style.title}>{title}</Text>
        </View>
        {showHeader ? <View style={Style.line} /> : null}
        {data.map((item, index) => (
            <Fragment key={index}>
                <TouchableOpacity style={Style.item} onPress={() => itemHandleCheck(item)}>
                    <Text style={Style.itemText}>{item[fieldName]}</Text>
                </TouchableOpacity>
                <View style={{ ...Style.line, display: index !== data.length - 1 ? undefined : 'none'}} />
            </Fragment>
        ))}
        <View style={Style.btnPanel}>
            <Button onPress={onClose} style={Style.cancelBtn}>
                <Text style={Style.cancelText}>取消</Text>
            </Button>
        </View>
    </Modal>
}
export default ActionSheet
const Style = StyleSheet.create({
    actSheet: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    header: {
        justifyContent:'center',
        alignItems:'center',
        height: 50
    },
    title: {
        alignItems:'center',
        color: '#2C2F3C'
    },
    item: {
        height: 45,
        borderWidth: 0,
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 14,
        color: '#6E748F'
    },
    line: {
        backgroundColor: '#ECEDF1',
        height: 1,
        transform: [{ scaleY: 0.5 }]
    },
    cancelBtn: {
        borderRadius: 0,
        borderWidth: 0
    },
    cancelText: {
        fontSize: 14,
        color: '#2C2F3C'
    },
    btnPanel: {
        backgroundColor: '#ECEDF1',
        paddingTop: 10,
        paddingBottom: isiPhoneX() ? 34 : 0,
        marginTop: 0
    }
})