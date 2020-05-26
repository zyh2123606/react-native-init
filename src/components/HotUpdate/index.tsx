import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Toast, Portal } from '@ant-design/react-native'
import { View, Image, Text, StyleSheet, DeviceEventEmitter } from 'react-native'
import Content from './content'
import Progress from './progress'
import UpToDate from './uptodate'
import GoolePlay from './googlePlay'
import CodePush, { LocalPackage, RemotePackage, DownloadProgress } from 'react-native-code-push'
import MathJs from 'cy-mathjs'
import { Dispatch } from 'redux'
import { getDeviceInfo } from '@/utils/appData'

const CodeOptions = {
    checkFrequency: CodePush.CheckFrequency.MANUAL
}
interface IProps {
    dispatch: Dispatch<any>
}
/**
 * @description 基于微软的热更新服务
 * @param content json字符串,更新描述以#号分割，fullUpdate：是否为全量更新，isSilent：是静默更新还是手动更新，当fullUpdate和isSlient同时出现时，以isSilent为主
 * @author zyh
 * @since 19/12/19
 */
class Update extends Component<IProps>{
    private subscription: any
    state = {
        visible: false,
        updateInfo: {},
        updateVisible: false,
        progressVisible: false,
        totalBytes: 0,
        receivedBytes: 0,
        currProgress: 0,
        fullUpdate: false,
        isUpToDate: false,
        title: '',
        remotePackage: {} as RemotePackage,
        localPackage: {} as LocalPackage,
        appVersion: '1.0.0'
    }
    constructor(props: any) {
        super(props)
        CodePush.disallowRestart()
    }
    async componentDidMount() {
        this.checkUpdate()
        this.subscription = DeviceEventEmitter.addListener('CHECK_UPDATE', this.manualCheckUpdate.bind(this))
        const { appVersion } = await getDeviceInfo()
        this.setState({ appVersion })
        CodePush.notifyAppReady()
    }
    componentWillUnmount() {
        this.subscription && this.subscription.remove()
    }
    //check update
    async checkUpdate(callback?: (args?: any) => void) {
        const remotePackage = await CodePush.checkForUpdate(undefined, this._handleBinaryVersionMismatchCallback.bind(this))
        //如果没有新的更新包则检查当前已安装的包信息
        if (!remotePackage) {
            if (!callback) return
            const localPackage = await CodePush.getUpdateMetadata()
            if(localPackage) //已经安装过更新
                this.setState({ appVersion: localPackage?.appVersion })
            this.setState({ visible: true, isUpToDate: true, title: '暂无新版本', updateVisible: false })
            return callback()
        }
        this.setState({ appVersion: remotePackage?.appVersion })
        let { description }: any = remotePackage
        try {
            let { fullUpdate = false, isSilent = false } = JSON.parse(description)
            if (isSilent) return this.silentUpdate()
            this.setState({ visible: true, remotePackage, title: '发现新版本', isUpToDate: false, updateVisible: !fullUpdate, fullUpdate })
        } catch (err) {
            console.log(err)
        }
        callback && callback()
    }
    //silent update
    silentUpdate() {
        CodePush.sync({
            installMode: CodePush.InstallMode.ON_NEXT_RESUME
        })
    }
    //update package
    _handleBinaryVersionMismatchCallback(remotePackage: RemotePackage) {
        CodePush.getUpdateMetadata().then((localPackage: LocalPackage | null) => {
            this.setState({ localPackage, remotePackage })
        })
    }
    //download and package
    downLoadFromRemote() {
        let remotePackage = this.state.remotePackage, downLoadPackage: LocalPackage
        this.setState({ updateVisible: false, title: '跨境通更新中', progressVisible: true }, async () => {
            try {
                if (!remotePackage.download) return
                downLoadPackage = await remotePackage.download(this.downloadProgress.bind(this))
                this.closeWinHandle()
                const toastKey = Toast.loading('正在安装')
                if (!downLoadPackage) return
                await downLoadPackage.install(CodePush.InstallMode.IMMEDIATE, 0)
                Portal.remove(toastKey)
                Toast.info('安装成功，即将重启应用', 2, () => {
                    CodePush.allowRestart()
                })
            } catch (err) {
                console.log(err)
            }
        })
    }
    //package down progress
    downloadProgress(data: DownloadProgress) {
        let receivedBytes: number = data.receivedBytes, totalBytes: number = data.totalBytes
        receivedBytes = MathJs.DivGroup(receivedBytes, 1024, 1024),
            totalBytes = MathJs.DivGroup(totalBytes, 1024, 1024)
        let currProgress: number = MathJs.Floor(MathJs.Div(receivedBytes, totalBytes), 2)
        this.setState({
            currProgress: MathJs.Mul(currProgress, 100),
            receivedBytes: MathJs.Floor(receivedBytes, 2),
            totalBytes: MathJs.Floor(totalBytes, 2)
        })
    }
    //close update win
    closeWinHandle() {
        this.setState({
            visible: false,
            isUpToDate: false,
            progressVisible: false,
            updateVisible: false,
            fullUpdate: false,
            currProgress: 0,
            receivedBytes: 0,
            totalBytes: 0
        })
    }
    //manual check
    manualCheckUpdate() {
        const toastKey = Toast.loading('正在检查', 15)
        this.checkUpdate(() => {
            Portal.remove(toastKey)
        })
    }
    render() {
        const { visible, remotePackage, progressVisible, updateVisible, fullUpdate,
            currProgress, receivedBytes, totalBytes, isUpToDate, title } = this.state
        const { appVersion } = this.state
        return <Modal style={Style.win} visible={visible} transparent animationType='slide'>
            <View style={Style.container}>
                <Image style={Style.topImg} source={require('../../images/up_bg.png')} />
                <View style={Style.content}>
                    <View style={Style.header}>
                        <Text style={Style.title}>{title}</Text>
                        <Text style={Style.version}>版本 {appVersion}</Text>
                    </View>
                    <Content
                        data={remotePackage}
                        onClose={this.closeWinHandle.bind(this)}
                        onUpdate={this.downLoadFromRemote.bind(this)}
                        visible={updateVisible} />
                    <Progress receivedBytes={receivedBytes}
                        totalBytes={totalBytes}
                        currProgress={currProgress}
                        visible={progressVisible} />
                    <GoolePlay visible={fullUpdate} data={remotePackage} />
                    <UpToDate visible={isUpToDate} onClose={this.closeWinHandle.bind(this)} />
                </View>
            </View>
        </Modal>
    }
}

const mapStateProps = ({ Language }: any) => ({ ...Language })
export default connect(mapStateProps)(CodePush(CodeOptions)(Update))

const Style = StyleSheet.create({
    win: {
        backgroundColor: 'transparent'
    },
    container: {
        position: 'relative',
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
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 4,
        minHeight: 200,
        padding: 15,
        paddingBottom: 25
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 80
    },
    title: {
        color: '#3055EC',
        fontSize: 20,
        fontWeight: 'bold'
    },
    version: {
        color: '#3055EC'
    }
})