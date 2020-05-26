import React, { FunctionComponent } from 'react'
import { View, Text, TouchableOpacity, ScrollView, Modal} from 'react-native'
import { useDynamicStyleSheet, DynamicStyleSheet, useDynamicValue } from 'react-native-dark-mode'
import { Colors } from '@/colorManager'
import { Button } from '@ant-design/react-native'

interface IProps {
    visible: boolean | undefined,
    onClose: () => void
}
const NoticeWin: FunctionComponent<IProps> = ({ visible, onClose }) => {
    const Style = useDynamicStyleSheet(dyStyle)
    const colorOne = useDynamicValue(Colors.common_level1_base_color)
    const colorTwo = useDynamicValue(Colors.common_level2_base_color)
    const blue = useDynamicValue(Colors.common_blue1_color)
    return <Modal visible={visible} transparent>
        <View style={Style.container}>
            <View style={Style.content}>
                <Text style={Style.title}>温馨提示</Text>
                <ScrollView style={Style.scroll} showsVerticalScrollIndicator={false}>
                    <Text style={{color: colorOne, fontWeight: 'bold'}}>感谢您使用瑞和锦程APP使用，以下是我们的用户隐私概要：</Text>
                    <Text style={Style.text}>1、我们会遵循用户隐私政策收集与使用信息，但不会仅因您同意本隐私政策而采用强制捆绑的方式收集信息；</Text>
                    <Text style={Style.text}>2、在使用时，为保障服务所必需，我们会收集设备信息用于信息录入；</Text>
                    <Text style={Style.text}>3、GPS、摄像头、相册权限均不会默认开启，只有经过明示授权才会在为实现功能或服务时使用，不会在功能或服务不需要时收集信息。</Text>
                </ScrollView>
                <View style={{marginTop: 10, marginLeft: 20, marginRight: 20, flexDirection: 'row'}}>
                    <Text style={{color: colorTwo}}>阅读完整</Text>
                    <TouchableOpacity>
                        <Text style={{color: blue}}>《用户隐私保护政策》</Text>
                    </TouchableOpacity>
                </View>
                <View style={Style.btnPanel}>
                    <Button onPress={onClose} type='primary' style={Style.btn}>我已阅读并同意</Button>
                </View>
            </View>
        </View> 
    </Modal>
}
export default NoticeWin

const dyStyle = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: Colors.common_black2_color
    },
    content: {
        flex: 1,
        marginTop: 100,
        marginBottom: 100,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: Colors.common_fg_color,
        borderRadius: 4
    },
    scroll: {
        paddingLeft: 20,
        paddingRight: 20
    },
    title: {
        color: Colors.common_level1_base_color,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    btnPanel: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    btn: {
        height: 50,
        borderRadius: 25,
        marginTop: 30,
        borderWidth: 0,
        marginBottom: 30,
        paddingLeft: 25,
        paddingRight: 25
    },
    text: {
        color: Colors.common_level1_base_color,
        marginTop: 10
    }
})