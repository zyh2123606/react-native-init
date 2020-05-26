import React, { Fragment, cloneElement } from 'react'
import { Placeholder, Fade, PlaceholderLine } from 'rn-placeholder'
import { ViewStyle, View } from 'react-native'

interface IProps {
    visible: boolean,
    children?: any,
    style?: ViewStyle,
    others?: React.ReactPropTypes
}

const getChildView: React.FunctionComponent<IProps> = ({ visible, children }) => {
    return cloneElement(children, {
        display: visible ? 'none' : undefined
    })
}

const asyncLoadingPanel: React.FunctionComponent<IProps> = props => {
    const { visible, style } = props
    return <Fragment>
        <View style={{ padding: 15, backgroundColor: '#fff', ...style, display: visible ? undefined : 'none' }}>
            <Placeholder Animation={Fade}>
                <PlaceholderLine width={80} />
                <PlaceholderLine width={100} />
                <PlaceholderLine width={100} />
            </Placeholder>
        </View>
        {getChildView(props)}
    </Fragment>
}

export default asyncLoadingPanel