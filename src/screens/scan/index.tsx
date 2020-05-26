import React, { useCallback, useState, FunctionComponent, createRef } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { RNCamera } from 'react-native-camera'
import { StackNavigationProp } from '@react-navigation/stack'
import { SetStatusBar, Icon } from '@/components'
import { Route, useFocusEffect } from '@react-navigation/native'
import ScanAudio from '@/media/scan.wav'
import Sound from 'react-native-sound'
import BarcodeMask from 'react-native-barcode-mask'
import { Toast } from '@ant-design/react-native'
import { Colors } from '@/colorManager'
import { DynamicStyleSheet, useDynamicStyleSheet, useDynamicValue } from 'react-native-dark-mode'

interface IProps {
    navigation: StackNavigationProp<{}>
    route: Route<string>
}
type FlashMode = 'on' | 'off' | 'torch' | 'auto' | undefined
interface IState {
    isLoadCamera: boolean,
    flashMode: FlashMode,
    zoom: number
}
let isScan: boolean = true
const ScanSound = new Sound(ScanAudio)
const Scan: FunctionComponent<IProps> = ({ navigation, route }) => {
    const Style = useDynamicStyleSheet(dyStyle)
    const edgeColor = useDynamicValue(Colors.common_white1_color)
    const camrea = createRef<RNCamera>()
    const [state, setState] = useState<IState>({
        isLoadCamera: false,
        flashMode: 'off',
        zoom: 0
    })
    useFocusEffect(
        useCallback(() => {
            setState({ ...state, isLoadCamera: true })
        }, [])
    )
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            setState({ ...state, isLoadCamera: false })
            isScan = true
        })
        return unsubscribe
    }, [])
    const handleBarCodeRead = (event: any) => {
        if(!isScan) return
        const { type, data } = event
        const { callback }: any = route.params || {}
        if(type !== 'QR_CODE' && !type.startsWith('CODE')) return Toast.info('只能扫描二维码和条形码')
        isScan = false
        ScanSound.play()
        callback && callback(data)
    }
    const handleFlashLight = () => {
        let { flashMode } = state
        flashMode = flashMode === 'off' ? 'torch' : 'off'
        setState({ ...state, flashMode })
    }
    return state.isLoadCamera ? <RNCamera style={Style.camera}
        ref={camrea}
        type={RNCamera.Constants.Type.back}
        zoom={state.zoom}
        flashMode={state.flashMode}
        androidCameraPermissionOptions={{
            title: '允许使用相机',
            message: '我们需要您的许可使用相机',
            buttonPositive: '允许',
            buttonNegative: '取消'
        }}
        onBarCodeRead={handleBarCodeRead}>
        <TouchableOpacity style={Style.close} onPress={() => navigation.goBack()}>
            <Icon name='back' size={26} style={Style.CloseIcon} />
        </TouchableOpacity>
        <Text style={Style.title}>请扫描二维码/条形码</Text>
        <BarcodeMask
            edgeColor={edgeColor}
            width={220}
            height={220}
            edgeBorderWidth={3} />
        <View style={Style.footer}>
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <TouchableOpacity onPress={handleFlashLight} style={Style.btn}>
                        <Icon name='flashlight' size={34} color='#fff' />
                    </TouchableOpacity>
                    <Text style={Style.notice}>手电筒</Text>
                </View>
            </View>
        </View>
    </RNCamera> : null
}
export default SetStatusBar({
    barStyle: 'light-content',
    translucent: true,
    backgroundColor: 'transparent'
})(Scan)

const dyStyle = new DynamicStyleSheet({
    camera: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    close: {
        position: 'absolute',
        left: 20,
        top: 50,
        zIndex: 100
    },
    CloseIcon: {
        color: Colors.common_white1_color
    },
    title: {
        color: Colors.common_white1_color,
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        marginTop: -160,
        zIndex: 100,
        textAlign: 'center'
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    btn: {
        width: 64,
        height: 64,
        borderRadius: 64,
        backgroundColor: Colors.common_white2_color,
        alignItems: 'center',
        justifyContent: 'center'
    },
    notice: {
        textAlign: 'center',
        color: Colors.common_white1_color,
        marginTop: 5
    }
})