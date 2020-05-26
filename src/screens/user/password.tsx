import React, { useEffect, useState, FunctionComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { SetStatusBar, Header, Icon } from '@/components'
import { useDynamicStyleSheet, DynamicStyleSheet, useDynamicValue } from 'react-native-dark-mode'
import { Colors } from '@/colorManager'
import { InputItem, Button } from '@ant-design/react-native'
import { createForm } from 'rc-form'

interface IProps {
    navigation: NavigationProp<any>
    form: any
}
const PasswordLogin: FunctionComponent<IProps> = ({ navigation, form }) => {
    const { getFieldDecorator } = form
    const placeHolderColor = useDynamicValue(Colors.common_level3_base_color)
    const Style = useDynamicStyleSheet(dyStyle)
    const [action, setAction] = useState({
        disabled: true,
        loading: false,
        editabled: true
    })
    const mobileChange = (value: string) => {
        const { password } = form.getFieldsValue()
        setAction({ ...action, disabled: !(value && password) })
    }
    const passwordChange = (value: string) => {
        const { mobile } = form.getFieldsValue()
        setAction({ ...action, disabled: !(value && mobile) })
    }
    const handleSubmit = () => {
        form.validateFields((error: any, params: any) => {
            if(error) return
            setAction({ disabled: true, loading: true, editabled: false })
        })
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
            <Text style={Style.title}>使用密码登录</Text>
            <View style={Style.inpPanel}>
                {getFieldDecorator('mobile', { onChange: mobileChange })(
                    <InputItem
                        editable={action.editabled}
                        placeholderTextColor={placeHolderColor}
                        type='phone'
                        placeholder='请输入手机号码'
                        style={Style.inp} />
                )}
                <View style={{marginTop: 15}}>
                    {getFieldDecorator('password', { onChange: passwordChange })(
                        <InputItem
                            editable={action.editabled}
                            maxLength={20}
                            placeholderTextColor={placeHolderColor}
                            type='password'
                            placeholder='请输入登录密码'
                            style={Style.inp} />
                    )}
                </View>
            </View>
            <Button onPress={handleSubmit} 
                disabled={action.disabled} 
                loading={action.loading} 
                type='primary' 
                style={Style.btn}>获取验证码</Button>
            <View style={Style.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
                    <Text style={Style.forGet}>忘记密码</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
}
export default createForm()(
    SetStatusBar({
        barStyle: 'dark-content',
        translucent: true,
        backgroundColor: 'transparent'
    })(PasswordLogin)
)

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
        marginTop: 20
    },
    inpPanel: {
        marginTop: 30
    },
    inp: {
        paddingLeft: 0,
        fontSize: 16,
        height: 50,
        color: Colors.common_level1_base_color
    },
    btn: {
        marginTop: 30,
        borderWidth: 0,
        borderRadius: 2
    },
    footer: {
        marginTop: 10,
        alignItems: 'flex-end'
    },
    forGet: {
        color: Colors.common_level2_base_color,
        fontSize: 16  
    }
})