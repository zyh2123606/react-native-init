import React, { FunctionComponent, Fragment } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon } from '@/components'
import { DynamicStyleSheet, useDynamicStyleSheet } from 'react-native-dark-mode'
import { Colors } from '@/colorManager'
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import { NavigationProp } from '@react-navigation/native'
import HomeScreen from './home'
import AccountScreen from './account'
import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context'

interface IProps {
    navigation: NavigationProp<{}>
}
const Tabs: Record<string, any> = {
    home: { name: '工作台', icon: 'home' },
    account: { name: '我的', icon: 'account' }
}
const Tab = createBottomTabNavigator()
const TabBarPage: FunctionComponent<IProps> = ({ navigation }) => {
    const insets = useSafeArea()
    const Style = useDynamicStyleSheet(dyStyle)
    const renderTabBarView = (tabBar: BottomTabBarProps) => {
        const { state, descriptors, navigation } = tabBar
        return <Fragment>
            <View style={Style.line} />
            <View style={[Style.tabPanel,{paddingTop: 15,paddingBottom: insets.bottom}]}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key],
                        isFocused = state.index === index
                    const switchTabHandle = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        })
                        if (!isFocused && !event.defaultPrevented)
                            navigation.navigate(route.name)
                    }
                    const longPressHandle = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key
                        })
                        if (!isFocused)
                            navigation.navigate(route.name)
                    }
                    const renderIcon = () => {
                        let iconName = Tabs[route.name].icon, iconStyle = Style.icon
                        if(isFocused) {
                            iconName = `${iconName}_active`
                            iconStyle = Style.iconActive
                        }
                        return <View>
                            <Icon
                                style={iconStyle}
                                name={iconName} size={20} />
                            {Tabs[route.name].badge ? <Text style={Style.badge}>99</Text> : null}
                        </View>
                    }
                    return <TouchableOpacity
                        onPress={switchTabHandle}
                        onLongPress={longPressHandle}
                        accessibilityRole='button'
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        style={Style.tabItem}>
                        {renderIcon()}
                        <Text style={isFocused ? Style.activeTab : Style.normalTab}>{Tabs[route.name].name}</Text>
                    </TouchableOpacity>
                })}
            </View>
        </Fragment>
    }
    return <SafeAreaProvider>
            <Tab.Navigator initialRouteName='Home'
                tabBar={renderTabBarView}>
                <Tab.Screen name='home' component={HomeScreen} />
                <Tab.Screen name='account' component={AccountScreen} />
            </Tab.Navigator>
    </SafeAreaProvider>
}
export default TabBarPage
const dyStyle = new DynamicStyleSheet({
    line: {
        height: 0.5,
        backgroundColor: Colors.common_line_hard_color
    },
    tabPanel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.common_gray6_color
    },
    tabItem: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeTab: {
        color: Colors.common_blue1_color,
        fontSize: 10,
        marginTop: 3
    },
    normalTab: {
        fontSize: 10,
        color: Colors.common_level2_base_color,
        marginTop: 3
    },
    icon: {
        color: Colors.common_level2_base_color
    },
    iconActive: {
        color: Colors.common_blue1_color
    },
    badge: {
        color: Colors.common_white1_color,
        fontSize: 7,
        backgroundColor: Colors.common_red1_color,
        textAlign: 'center',
        textAlignVertical: 'center',
        width: 14,
        height: 14,
        borderRadius: 7,
        position: 'absolute',
        top: -5, 
        right: -15
    }
})