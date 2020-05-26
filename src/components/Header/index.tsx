import React, { FunctionComponent } from 'react'
import { View, StatusBar, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { isiOS, isiPhoneX } from '../../utils/device'
import { withNavigation } from '@react-navigation/compat'
import { NavigationProp } from '@react-navigation/native'

const STATUS_BAR_HEIGHT = isiOS() ? (isiPhoneX() ? 34 : 20) : StatusBar.currentHeight
interface IProps {
    title?: string
    navigation: NavigationProp<any>
    showTitle?: boolean
    backgroundColor?: string
}
const Header: FunctionComponent<IProps> = ({ title='', backgroundColor, navigation, showTitle = false }) => {
    return <View style={{
        ...Style.Header,
        backgroundColor,
        paddingTop: STATUS_BAR_HEIGHT
    }}>
        <View style={{...Style.headerContent, display: showTitle ? undefined : 'none' }}>
            <TouchableOpacity onPress={() => navigation && navigation.goBack()} style={Style.leftPanel}>
                <Image style={Style.headerLeftIcon} source={require('@/images/navBar/back.png')}/>
            </TouchableOpacity>
            <Text style={Style.headerTitle}>{title}</Text>
            <Text style={Style.rightPanel}/>
        </View>
    </View>
}

export default withNavigation<NavigationProp<any>, any, FunctionComponent<IProps>>(Header)
const Style = StyleSheet.create({
    Header: {
        flexDirection: 'column'
    },
    headerLeftIcon: {
        width: 20,
        height: 20
    },
    headerContent: {
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15
    },
    headerTitle: {
        fontSize: 16,
        color: '#111E37',
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center'
    },
    leftPanel: {
        width: 50
    },
    rightPanel: {
        width: 50
    }
}) 