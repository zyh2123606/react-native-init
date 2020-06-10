import React, { useState, FunctionComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SetStatusBar, Icon, Header } from '@/components'
import { useDynamicStyleSheet, DynamicStyleSheet, useDynamicValue } from 'react-native-dark-mode'
import { Colors } from '@/colorManager'
import { Toast, Button, InputItem } from '@ant-design/react-native'
import { createForm } from 'rc-form'

interface IProps {
    form: any
}
const SetPassword: FunctionComponent<IProps> = ({ form }) => {
    const navigation = useNavigation()
    const Style = useDynamicStyleSheet(dyStyle)
    const { getFieldDecorator } = form
    const placeHolderColor = useDynamicValue(Colors.common_level3_base_color)
    const [action, setAction] = useState({
        disabled: true,
        loading: false,
        editabled: true
    })
    const passwordChange = (value: string) => {
        setAction({ ...action, disabled: value.length < 6 })
    }
    const handleSubmit = () => {
        form.validateFields((error: any, params: any) => {
            if (error) return
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
            <Text style={Style.title}>请输入验证码</Text>
            <Text style={Style.subTitle}>登录密码用于瑞和锦程司机App登录</Text>
            <View style={Style.inpPanel}>
                {getFieldDecorator('password', { onChange: passwordChange })(
                    <InputItem
                        editable={action.editabled}
                        maxLength={20}
                        placeholderTextColor={placeHolderColor}
                        type='password'
                        placeholder='请输入登录密码'
                        style={Style.inp} />
                )}
                <Text style={Style.notice}>密码至少6个字符</Text>
            </View>
            <Button onPress={handleSubmit}
                disabled={action.disabled}
                loading={action.loading}
                type='primary'
                style={Style.btn}>完成</Button>
        </View>
    </View>
}
const MainForm = createForm()(SetPassword)
export default SetStatusBar({
    barStyle: 'dark-content',
    translucent: true,
    backgroundColor: 'transparent'
})(MainForm)

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
        marginTop: 30
    },
    subTitle: {
        color: Colors.common_level3_base_color,
        fontSize: 14,
        marginTop: 5
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
    notice: {
        marginTop: 5,
        color: Colors.common_blue1_color
    }
})