import React, { useState, useEffect } from 'react'
import { Modal, Toast, Portal } from '@ant-design/react-native'
import { View, StyleSheet, Image, Platform, DeviceEventEmitter } from 'react-native'
import Content from './content'
import { getDeviceInfo } from '@/utils/appData'
import Service from '@/services'

let listenUpdate: any = null
interface IState {
    visible: boolean,
    isUptodate: boolean,
    isForce: boolean,
    appVersion: string | null,
    changeLog: string
}
const Update: React.FunctionComponent = (props: any) => {
    const [app, setApp] = useState<IState>({
        visible: false,
        isUptodate: false,
        isForce: false,
        appVersion: '1.0.0',
        changeLog: ''
    })
    useEffect(() => {
        checkUpdate()
        listenUpdate = DeviceEventEmitter.addListener('CHECK_UPDATE', manualCheckUpdate)
    }, [])
    useEffect(() => {
        return () => listenUpdate.remove()
    }, [])
    //auto check update
    const checkUpdate = async (callback?: (version: string) => void) => {
        const devcInfo = await getDeviceInfo()
        const { code, datas: { isforce, appVersion, changeLog } }: any = await Service.checkVersion(Platform.OS === 'android' ? 2 : 1)
        if(code !== 0) return
        if (devcInfo.appVersion <= appVersion) callback && callback(appVersion)
        setApp({ ...app, visible: true, isForce: isforce, appVersion, changeLog })
    }
    //maual check update
    const manualCheckUpdate = () => {
        const toastKey = Toast.loading('正在检查', 15)
        checkUpdate((appVersion: string | null) => {
            Portal.remove(toastKey)
            setApp({ ...app, visible: true, isUptodate: true, appVersion })
        })
    }
    //close update modal
    const handleClose = () => {
        setApp({ ...app, visible: false })
    }
    return <Modal visible={app.visible} style={Style.win} transparent>
        <View style={Style.container}>
            <Image style={Style.topImg} source={require('../../images/up_bg.png')}/>
            <Content visible={true} data={app} onClose={handleClose}/>
        </View>
    </Modal>
}

export default Update
const Style = StyleSheet.create({
    win: {
        backgroundColor: 'transparent'
    },
    container: {
        position: 'relative',
        minHeight: 200,
        flexDirection: 'column',
        paddingTop: 50
    },
    topImg: {
        width: 150,
        height: 130,
        position: 'absolute',
        top: 19,
        left: '50%',
        marginLeft: -75,
        zIndex: 2
    }
})