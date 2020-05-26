import React, { useEffect, useState, FunctionComponent } from 'react'
import { Button } from '@ant-design/react-native'
import { Text } from 'react-native'
import { useDynamicStyleSheet, DynamicStyleSheet } from 'react-native-dark-mode'

interface IProps {
    params: any
}
let timer: any = null, MAX_TIME = 60
const TimerComp: FunctionComponent<IProps> = ({ params }) => {
    const Style = useDynamicStyleSheet(dyStyle)
    useEffect(() => {
        startTimer()
    }, [])
    const [state, setState] = useState({
        limit: MAX_TIME,
        isComplete: false,
        loading: false
    })
    //启动计时器
    const startTimer = () => {
        let { limit, isComplete } = state
        if (!isComplete && limit !== MAX_TIME) return
        isComplete = false
        timer = setInterval(() => {
            limit--
            if (limit === 0)
                return clearTimer()
            setState({ ...state, limit: limit, isComplete: isComplete })
        }, 1000)
    }
    //清除计时器
    const clearTimer = () => {
        setState({ ...state, limit: MAX_TIME, isComplete: true })
        clearInterval(timer)
    }
    //重新发送短信
    const sendSMSCodeHandle = () => {

    }
    return <Button onPress={sendSMSCodeHandle}
        type='ghost' disabled={!state.isComplete || state.loading}
        loading={state.loading} style={Style.btn}>
        <Text style={{ fontSize: 14 }}>
            {!state.isComplete ? `${state.limit}秒后可重新发送` : '再次发送验证码'}
        </Text>
    </Button>
}
export default TimerComp

const dyStyle = new DynamicStyleSheet({
    btn: {
        height: 30,
        borderWidth: 0,
        justifyContent: 'flex-end',
        paddingRight: 0
    }
})