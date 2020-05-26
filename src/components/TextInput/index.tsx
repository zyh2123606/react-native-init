import React, { forwardRef, SFC } from 'react'
import { TextInput, StyleProp, TextStyle } from 'react-native'

/**
 * @description 基于原生TextInput组件进行封装，时期支持rc-form
 * @since 19/12/19
 */
interface IProps {
    onChange?: (e: MouseEvent) => void
    onFocus?: (e: MouseEvent) => void
    placeholderTextColor?: string
    autoFocus?: boolean
    value?: string
    placeholder?: string
    style?: StyleProp<any>
    maxLength?: number
}
const CustomTextInput: SFC<IProps> = forwardRef((props, ref: React.Ref<any>) => {
    const { onChange, autoFocus, onFocus, maxLength, value, ...other } = props
    return <TextInput
        ref={ref}
        value={value || ''}
        onFocus={onFocus}
        autoFocus={autoFocus}
        onChangeText={onChange}
        maxLength={maxLength}
        {...other}
    />
})

export default CustomTextInput