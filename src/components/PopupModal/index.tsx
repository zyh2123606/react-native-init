import React, { SFC, Fragment } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ViewStyle } from 'react-native'
import { Modal, Button } from '@ant-design/react-native'
import { isiPhoneX } from '../../utils/device'

interface IProps {
    visible: boolean,
    data: Array<any>,
    onClose?: () => void,
    title?: string,
    getData?: (data: any) => void,
    fieldName: string,
    itemStyle?: ViewStyle
}
/**
 * @description 主要用户数据量大的上拉modal选择
 * @since 20/02/24
 * @param visible 显示/隐藏
 * @param data 显示的item数据
 * @param onClose 关闭模态框
 * @param title 显示的标题,
 * @param getData 点击的时候获取点击的数据
 */
const PopupModal: SFC<IProps> = ({ visible, data, onClose, itemStyle, title = '请选择', fieldName, getData }) => {
    const itemHandleCheck = (record: any) => {
        onClose && onClose()
        getData && getData(record)
    }
    return <Modal visible={visible} popup
        style={Style.popWin}
        onClose={onClose}
        maskClosable
        animationType='slide-up'>
        <View style={Style.header}>
            <Text style={Style.title}>{title}</Text>
        </View>
        <View style={Style.line} />
        <ScrollView style={Style.list} showsVerticalScrollIndicator={false}>
            {data.map((item, index) => (
                <Fragment key={index}>
                    <TouchableOpacity style={{ ...Style.item, ...itemStyle }} onPress={() => itemHandleCheck(item)}>
                        <Text style={Style.itemText}>{item[fieldName]}</Text>
                    </TouchableOpacity>
                    <View style={{ ...Style.line, display: index !== data.length - 1 ? undefined : 'none'}} />
                </Fragment>
            ))}
        </ScrollView>
        <View style={Style.cancelPanel}>
            <Button onPress={onClose} style={Style.cancelBtn}>
                <Text style={Style.cancelText}>取消</Text>
            </Button>
        </View>
    </Modal>
}
export default PopupModal
const Style = StyleSheet.create({
    popWin: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    header: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#2C2F3C'
    },
    list: {
        maxHeight: 300
    },
    item: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    itemText: {
        color: '#6E748F'
    },
    line: {
        backgroundColor: '#ECEDF1',
        height: 1,
        transform: [{ scaleY: 0.5 }]
    },
    cancelPanel:{
        backgroundColor: '#ECEDF1',
        paddingTop: 10,
        marginBottom: isiPhoneX() ? 34 : 0
    },
    cancelBtn: {
        height: 45,
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: '#fff'
    },
    cancelText: {
        fontSize: 14,
        color: '#2C2F3C'
    }
})