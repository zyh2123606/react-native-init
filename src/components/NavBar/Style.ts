import { StyleSheet } from 'react-native'

const Style = StyleSheet.create({
    header: {
        backgroundColor: 'rgba(242,244,245,1)',
        elevation: 0,
        borderBottomWidth: 0
    },
    title: {
        color: 'rgba(30,32,41,1)',
        fontSize: 16,
        fontWeight: 'bold'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    leftContainer: {
        alignItems: 'center',
        paddingEnd: 0
    },
    leftBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    leftImg: {
        width: 20,
        height: 20
    },
    leftText: {
        color: 'rgba(30,32,41,1)',
        marginLeft: 5,
        fontSize: 16
    },
    rightBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 15
    },
    rightText: {
        color: 'rgba(52,92,255,1)',
        fontSize: 16
    }
})

export default Style