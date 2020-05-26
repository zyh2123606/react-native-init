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
const Forget: FunctionComponent<IProps> = ({ navigation, form }) => {
    const { getFieldDecorator } = form
    const placeHolderColor = useDynamicValue(Colors.common_level3_base_color)
    const Style = useDynamicStyleSheet(dyStyle)
    const [action, setAction] = useState({
        disabled: true,
        loading: false,
        editabled: true
    })
    const mobileChange = (value: string) => {
        setAction({ ...action, disabled: value.length !== 13})
    }
    const handleSubmit = () => {
        form.validateFields((error: any, params: any) => {
            if(error) return
            setAction({ disabled: true, loading: true, editabled: false })
        })
    }
    const sendSMSCode = async () => {

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
            <Text style={Style.title}>输入手机号</Text>
            <View style={Style.inpPanel}>
                {getFieldDecorator('mobile', { onChange: mobileChange })(
                    <InputItem
                        editable={action.editabled}
                        placeholderTextColor={placeHolderColor}
                        type='phone'
                        placeholder='请输入手机号码'
                        style={Style.inp} />
                )}
            </View>
            <Button onPress={handleSubmit} 
                disabled={action.disabled} 
                loading={action.loading} 
                type='primary' 
                style={Style.btn}>下一步</Button>
        </View>
    </View>
}
const MainForm = createForm()(Forget)
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
    }
})