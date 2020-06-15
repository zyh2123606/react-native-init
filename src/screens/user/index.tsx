import React, { useEffect, useState, FunctionComponent } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SetStatusBar, Header } from '@/components'
import { useDynamicStyleSheet, DynamicStyleSheet, useDynamicValue } from 'react-native-dark-mode'
import { Colors } from '@/colorManager'
import { InputItem, Button } from '@ant-design/react-native'
import { createForm } from 'rc-form'
import NoticeWin from './notice'
import { NavigationUtil } from '@/utils'
import { saveCurrentLoginUser } from '@/utils/appData'
import { SelectWin } from '@/components'

interface IProps {
    form: any
}
const Login: FunctionComponent<IProps> = ({ form }) => {
    const { getFieldDecorator } = form
    const navigation = useNavigation()
    const placeHolderColor = useDynamicValue(Colors.common_level3_base_color)
    const Style = useDynamicStyleSheet(dyStyle)
    const [visible, setVisible] = useState(false)
    const [action, setAction] = useState({
        disabled: true,
        loading: false,
        editabled: true
    })
    useEffect(() => {
        
    }, [])
    const inphandleChange = (value: string) => {
        setAction({ ...action, disabled: value.length !== 13})
    }
    const handleSubmit = () => {
        form.validateFields((error: any, params: any) => {
            if(error) return
            setAction({ disabled: true, loading: true, editabled: false })
            navigation.navigate('SMSCode', { params, onSendCode: sendSMSCode, callback: doLogin })
        })
    }
    const sendSMSCode = async () => {

    }
    const doLogin = async () => {
        NavigationUtil.renderAuthorized()
    }
    const closeWin = async () => {
        await saveCurrentLoginUser({ isLogin: true } as any)
        setVisible(false)
    }
    return <View style={Style.container}>
        <View style={Style.content}>
            <ImageBackground style={Style.bodyImag} source={require('@/images/login_bg.png')} />
            <Header />
            <View style={Style.panel}>
                <Image source={require('@/images/logo.png')} style={Style.logo} />
                <Text style={Style.title}>欢迎使用瑞和锦程</Text>
                <Text style={Style.subTitle}>使用手机号登录或注册</Text> 
                <View style={Style.inpPanel}>
                    {getFieldDecorator('mobile', { onChange: inphandleChange })(
                        <InputItem 
                            editable={action.editabled}
                            placeholderTextColor={placeHolderColor} 
                            type='phone' 
                            placeholder='请输入手机号码' 
                            style={Style.inp}/>
                    )}
                </View>
                <Button onPress={handleSubmit} 
                    disabled={action.disabled} 
                    loading={action.loading} 
                    type='primary' 
                    style={Style.btn}>获取验证码</Button>
                <Text style={Style.agrGrv}>点击按钮即代表您已阅读并同意以下协议：</Text>
                <View style={Style.agrPanel}>
                    <TouchableOpacity onPress={() => navigation.navigate('Protocol')}>
                        <Text style={Style.agrText}>《瑞和锦程用户协议》</Text>
                    </TouchableOpacity>
                    <Text style={{ ...Style.agrGrv, marginTop: 0 }}>和</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
                        <Text style={Style.agrText}>《瑞和锦程隐私政策》</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={Style.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('PasswordLogin')}>
                <Text style={Style.pwdText}>使用密码登录</Text>
            </TouchableOpacity>
        </View>
        <NoticeWin visible={visible} onClose={closeWin}/>
        <SelectWin />
    </View>
}
export default createForm()(
    SetStatusBar({
        barStyle: 'dark-content',
        translucent: true,
        backgroundColor: 'transparent'
    })(Login)
)

const dyStyle = new DynamicStyleSheet({
    container: {
        flex: 1,
        backgroundColor: Colors.common_bg_z1_color
    },
    content: {
        flex: 1
    },
    bodyImag: {
        width: '100%',
        height: '62%',
        position: 'absolute',
        left: 0,
        top: 0
    },
    panel: {
        marginTop: 70,
        marginLeft: 20,
        marginRight: 20
    },
    logo: {
        width: 48,
        height: 48
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.common_level1_base_color,
        marginTop: 20
    },
    subTitle: {
        color: Colors.common_level3_base_color,
        fontSize: 14,
        marginTop: 5
    },
    inpPanel: {
        marginTop: 40
    },
    inp: {
        paddingLeft: 0,
        fontSize: 16,
        color: Colors.common_level1_base_color
    },
    btn: {
        marginTop: 30,
        borderWidth: 0,
        borderRadius: 2
    },
    agrGrv: {
        fontSize: 12,
        color: Colors.common_level3_base_color,
        marginTop: 10
    },
    agrPanel: {
        flexDirection: 'row',
        marginTop: 2
    },
    agrText: {
        color: Colors.common_blue1_color,
        fontSize: 12
    },
    footer: {
        marginTop: 20,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pwdText: {
        fontSize: 16,
        color: Colors.common_blue1_color
    }
})
