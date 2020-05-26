import React, { useRef, useEffect, useState, FunctionComponent } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { NavigationProp, Route } from '@react-navigation/native'
import { SetStatusBar, Icon, Header } from '@/components'
import { useDynamicStyleSheet, DynamicStyleSheet } from 'react-native-dark-mode'
import { Colors } from '@/colorManager'
import { Toast } from '@ant-design/react-native'
import Timer from './timer'

interface IProps {
    navigation: NavigationProp<{}>
    route: Route<string>
}
let CODE_LENGTH = 4
const SMSCode: FunctionComponent<IProps> = ({ navigation, route }) => {
    const { params }: any = route.params
    const Style = useDynamicStyleSheet(dyStyle)
    const codeInp = useRef<any>(null)
    const [state, setState] = useState({
        loading: false,
        isEditable: true,
        smsCode: ''
    })
    useEffect(() => {
        listeningCodeChange()
    }, [state.smsCode])
    const renderSmsCodeItem = () => {
        let { smsCode } = state,
            smsPad = smsCode.padEnd(CODE_LENGTH, ' '),
            codeArr = smsPad.split('')
        return codeArr.map((value, index) => {
            return <TouchableOpacity
                key={index}
                onPress={onFocusInput}
                activeOpacity={1}
                style={{ ...Style.condeItem, marginRight: index >= CODE_LENGTH - 1 ? 0 : 25 }}>
                <Text style={Style.codeTxt}>{value}</Text>
            </TouchableOpacity>
        })
    }
    const onFocusInput = () => {
        const isFocused = codeInp.current.isFocused()
        if (!isFocused)
            codeInp.current.focus()
    }
    const listeningCodeChange = () => {
        if (state.smsCode.length >= CODE_LENGTH) {
            setState({ ...state, isEditable: false })
            const { callback, params, onSendCode }: any = route.params
            params.SMSCode = state.smsCode
            callback && callback(params)
        }
    }
    const inpHandleChange = (value: string) => {
        const reg = /^[0-9]*$/
        if (!reg.test(value)) return
        setState({ ...state, smsCode: value })
    }
    const parseMobile = (mobile: string | number | undefined): string => {
        const mobileStr = String(mobile).replace(/\s+/g, ''), 
            m_start = mobileStr.substr(0, 3), 
            m_end = mobileStr.substr(mobileStr.length - 4, mobileStr.length)
        return m_start.padEnd(7, '*') + m_end
    }
    return <View style={Style.container}>
        <Header />
        <View style={Style.content}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={Style.header} onPress={() => navigation.goBack()}>
                    <Icon style={Style.backIcon} name='back' />
                    <Text style={Style.backText}>返回</Text>
                </TouchableOpacity>
            </View>
            <Text style={Style.title}>请输入验证码</Text>
            <View style={Style.panel}>
                <View>
                    <Text style={Style.desc}>已经发送短信验证码至+86 {parseMobile(params?.mobile)}</Text>
                    <View style={Style.inpPanel}>
                        {renderSmsCodeItem()}
                        <TextInput
                            ref={codeInp}
                            editable={state.isEditable}
                            underlineColorAndroid='transparent'
                            caretHidden
                            style={Style.codeInput}
                            autoFocus={true}
                            keyboardType='numeric'
                            maxLength={CODE_LENGTH}
                            onChangeText={inpHandleChange}
                            value={state.smsCode}
                        />
                    </View>
                    <View style={{ alignSelf: 'flex-end' }}>
                        <Timer params={route.params}/>
                    </View>
                </View>
            </View>
        </View>
    </View>
}

export default SetStatusBar({
    barStyle: 'dark-content',
    translucent: true,
    backgroundColor: 'transparent'
})(SMSCode)

const dyStyle = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: Colors.common_bg_z1_color
    },
    content: {
        margin: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backIcon: {
        color: Colors.common_level1_base_color,
        fontSize: 14
    },
    backText: {
        color: Colors.common_level1_base_color,
        marginLeft: 2,
        fontSize: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.common_level1_base_color,
        marginTop: 50,
        textAlign: 'center'
    },
    panel: {
        marginTop: 40,
        alignItems: 'center'
    },
    desc: {
        color: Colors.common_level3_base_color,
        fontSize: 12
    },
    inpPanel: {
        marginTop: 8,
        flexDirection: 'row',
        borderRightWidth: 0
    },
    condeItem: {
        flexDirection: 'column',
        width: 44,
        height: 44,
        borderColor: Colors.common_gray4_color,
        borderWidth: 1,
        borderStyle: 'solid',
        justifyContent: 'center',
        alignItems: 'center'
    },
    codeInput: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        opacity: 0
    },
    codeTxt: {
        fontSize: 20,
        color: Colors.common_level1_base_color
    },
    btn: {
        height: 30,
        borderWidth: 0,
        justifyContent: 'flex-end',
        paddingRight: 0
    }
})