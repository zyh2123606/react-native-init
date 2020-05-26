import React from 'react'
import { createIconSet } from 'react-native-vector-icons'
import IconMap from './icons.json'

const CustomIcon = createIconSet(IconMap, 'iconfont', 'iconfont.ttf')

export default CustomIcon
export const IconButton = CustomIcon.Button
export const TabBarItem = CustomIcon.TabBarItem