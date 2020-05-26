import React, { useEffect, useState, useRef, FunctionComponent, Fragment, ReactElement } from 'react'
import { View, Text, TouchableOpacity, UIManager, Modal, findNodeHandle, ViewStyle, StyleSheet, Dimensions, DeviceEventEmitter, TouchableWithoutFeedback } from 'react-native'
import { Icon } from '@/components'

const { width, height } = Dimensions.get('window')
type IPlacement = 'left' | 'right' | 'bottom' | 'top'
type IArrowPos = 'left' | 'center' | 'right'
interface IPosition {
    layout: ViewStyle
    arrow: ViewStyle
}
interface IProps {
    data?: IPopoverItem[]
    placement: IPlacement
    children: ReactElement
    onSelect?: (item?: IPopoverItem, ...arg: any) => void
    renderItem?: ReactElement
    extraStyle?: ViewStyle
    arrowPos?: IArrowPos
}
let arrowWidth: number = 8, eventListener: any = null
/**
 * 自定义弹出tooltip
 * @since 20/03/26
 * @author zouyonghong
 */
const Popover: FunctionComponent<IProps> = ({ data = [], placement = 'left', arrowPos, extraStyle, children, onSelect, renderItem }) => {
    useEffect(() => {
        eventListener = DeviceEventEmitter.addListener('CLOSE_POPOVER_WIN', closePopover)
        return () => eventListener && eventListener.remove()
    }, [])
    const [position, setPosition] = useState<IPosition>({
        layout: {
            left: 0,
            top: 0,
            opacity: 0
        },
        arrow: {
            left: 0,
            top: 0
        }
    })
    const [visible, setVisible] = useState(false)
    const target = useRef(null)
    const cloneChildrenNode = (children: ReactElement) => {
        return React.cloneElement(children, {
            collapsable: false,
            ref: target
        })
    }
    const popoverToggle = () => {
        position.layout.opacity = 0
        setVisible(!visible)
    }
    const itemPressHandle = (data: IPopoverItem) => {
        popoverToggle()
        onSelect && onSelect(data)
    }
    const closePopover = () => {
        position.layout.opacity = 0
        setVisible(false)
    }
    const renderPopoverItem = () => {
        if (renderItem) return renderItem
        return data.map((item: IPopoverItem, index: number) => (
            <Fragment key={index}>
                <TouchableOpacity onPress={() => itemPressHandle(item)} style={{...Style.popoverItem, justifyContent: item.thumb ? 'flex-start' : 'center'}}>
                    {getItemThumb(item.thumb, item.thumbType)}
                    <Text style={Style.popoverText}>{item.text}</Text>
                </TouchableOpacity>
                {index < data.length - 1 ? <View style={Style.line} /> : null}
            </Fragment>
        ))
    }
    const getItemThumb = (thumb: string | undefined, thumbType: string | undefined) => {
        if (!thumb) return null
        if (thumbType === 'icon')
            return <Icon name={`${thumb}`} size={16} style={Style.icon}/>
    }
    //获取容器宽、高
    const handleLayout = <T extends { nativeEvent: any }>({ nativeEvent }: T) => {
        const containerWidth = nativeEvent.layout.width, containerHeight = nativeEvent.layout.height
        setPopoverPosition(containerWidth, containerHeight)
    }
    //设置popover位置
    const setPopoverPosition = (containerWidth: number, containerHeight: number, callback?: Function) => {
        UIManager.measure(Number(findNodeHandle(target.current)), (x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            let layout: ViewStyle = { opacity: 1 }, arrow: ViewStyle = { top: -15 }, arrowOffset = 10
            if(arrowPos === 'center') arrowOffset = width / 2 - arrowWidth
            switch (placement) {
                case 'left':
                    layout = { ...layout, left: pageX, top: pageY }
                    arrow = { ...arrow, left: arrowOffset }
                    break
                case 'right':
                    layout = { ...layout, left: pageX - containerWidth + width, top: pageY }
                    arrow = { ...arrow, right: arrowOffset }
                    break
                case 'bottom':
                    layout = { ...layout, left: pageX - containerWidth + width / 2 + containerWidth / 2, top: pageY + height / 2 }
                    arrow = { ...arrow, left: '50%', marginLeft: -arrowWidth }
                    break
                case 'top':
                    layout = { ...layout, left: pageX - containerWidth + width / 2 + containerWidth / 2, top: pageY - containerHeight - height - 20 }
                    arrow = { left: '50%', bottom: -15, marginLeft: -arrowWidth, borderBottomColor: 'transparent', borderTopColor: '#fff' }
                    break
                default:
                    break
            }
            setPosition({ layout, arrow })
            callback && callback()
        })
    }
    return <Fragment>
        <TouchableOpacity onPress={popoverToggle}>
            {cloneChildrenNode(children)}
        </TouchableOpacity>
        <Modal transparent
            animationType='fade'
            hardwareAccelerated={true}
            onRequestClose={popoverToggle}
            visible={visible}>
            <TouchableWithoutFeedback onPress={popoverToggle}>
                <View style={Style.popoverContainer}>
                    <View
                        collapsable={false}
                        onLayout={handleLayout}
                        style={{ ...Style.body, ...position.layout, ...extraStyle }}>
                        <View style={{ ...Style.arrowUp, ...position.arrow }} />
                        {renderPopoverItem()}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    </Fragment>
}
export interface IPopoverItem {
    text: string
    value: any
    thumb?: string
    thumbType?: string
}
export default Popover

const Style = StyleSheet.create({
    popoverContainer: {
        position: 'relative',
        width,
        height,
        backgroundColor: 'rgba(0,0,0,0.12)',
    },
    body: {
        backgroundColor: 'rgba(250,250,250,1)',
        minWidth: 80,
        borderRadius: 4,
        position: 'absolute'
    },
    popoverItem: {
        padding: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    popoverText: {
        color: 'rgba(30,32,41,1)',
        fontSize: 14
    },
    line: {
        backgroundColor: 'rgba(30,32,41,0.12)',
        height: 1,
        transform: [{ scaleY: 0.4 }],
        marginLeft: 10,
        marginRight: 10
    },
    arrowUp: {
        width: 0,
        height: 0,
        borderWidth: arrowWidth,
        borderStyle: 'solid',
        borderColor: 'transparent',
        borderBottomColor: 'rgba(250,250,250,1)',
        position: 'absolute'
    },
    icon: {
        color: 'rgba(30,32,41,0.56)',
        marginRight: 5,
        fontSize: 16
    }
})