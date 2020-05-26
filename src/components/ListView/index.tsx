import React, { Component, SFC, ReactNode, createRef } from 'react'
import { ListView } from '@ant-design/react-native'
import { View, Text, ActivityIndicator, StyleSheet, ViewStyle, Image } from 'react-native'
import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder'
import { ListProps } from '@ant-design/react-native/lib/list'

interface IProps {
    refreshable?: boolean,
    loadMode?: string | undefined,
    renderItem: (item: any, index: number, separator: any) => any | null,
    onFetch: (currentPage: number, startFetch: () => any, abortFetch: () => void) => void,
    emptyStyle?: ViewStyle,
    showsVerticalScrollIndicator?: boolean,
    separator?: boolean | SFC<any>,
    pagination?: boolean,
    style?: ViewStyle,
    emptyRender?: React.ReactElement | React.FunctionComponent
}

/**
 * @description 基于antd-mobile ListView的封装，统一渲染行为
 * @since 19/12/19
 */
class CustomListView extends Component<IProps> {
    private isFirst: boolean
    private listViewTarget: React.RefObject<any>
    constructor(props:IProps){
        super(props)
        this.listViewTarget = createRef()
        this.isFirst = true
    }
    //empty view
    emptyView = (emptyStyle?: any) => {
        return <View style={Style.emptyWrap}>
            <Image source={require('@/images/empty.png')} style={Style.emptyImg} />
            <Text style={Style.emptyText}>暂无数据，请刷新重试</Text>
        </View>
    }
    //loading view
    fetchingView = () => {
        const { loadMode = 'box', emptyStyle } = this.props
        return <View style={{...Style.loadingWrap, ...emptyStyle}}>
            <Placeholder Animation={Fade} style={{display: loadMode === 'box' ? undefined : 'none'}}>
                <PlaceholderLine width={80}/>
                <PlaceholderLine width={100}/>
                <PlaceholderLine width={100}/>
            </Placeholder>
            <View style={{display: loadMode === 'box' ? 'none' : undefined}}>
                <ActivityIndicator color='#b8bcc6' />
                <Text style={Style.loadingText}>正在加载数据，请稍后...</Text>
            </View>
        </View>
    }
    //separator
    renderSeparator = () => {
        return <View style={Style.separator}/>
    }
    //up loading more
    waitFetchView = () => {
        let _show = this.isFirst
        if(this.isFirst) this.isFirst = false
        const { loadMode = 'box' } = this.props, clsArr:[any] = [Style.pullLoadingPanel]
        if(loadMode === 'box') clsArr.push(Style.pullLoadingBox)
        return <View style={[...clsArr, { display: _show === true ? 'none' : undefined }]}>
            <ActivityIndicator size='small' color='#b8bcc6' />
            <Text style={{ color: '#b8bcc6', marginLeft: 5 }}>正在加载更多数据</Text>
        </View>
    }
    //complete view
    allLoadedView = () => {
        const { loadMode = 'box' } = this.props, clsArr: Array<any> = [Style.loadedPanel]
        if(loadMode === 'box') clsArr.push(Style.pullLoadingBox)
        return <View style={clsArr}>
            <Text style={Style.loadedText}>已没有更多数据，请刷新重试~</Text>
        </View>
    }
    //listview refresh
    onRefresh = () => {
        this.listViewTarget.current.refresh()
    }
    render():ReactNode{
        const { renderItem, refreshable, emptyRender, loadMode, separator, onFetch, ...other} = this.props
        return <ListView
            refreshable={refreshable}
            renderItem={renderItem}
            onFetch={onFetch}
            refreshableColors={['#3055EC', '#6ede2c', '#ff4f00']}
            showsVerticalScrollIndicator={false}
            emptyView={emptyRender||this.emptyView}
            paginationFetchingView={this.fetchingView}
            paginationWaitingView={this.waitFetchView}
            paginationAllLoadedView={this.allLoadedView}
            ref={this.listViewTarget}
            separator={ typeof separator === 'undefined' ? this.renderSeparator : separator}
            refreshViewHeight={50} 
            {...other} 
        />
    }    
}

export default CustomListView

const Style = StyleSheet.create({
    loadingWrap: {
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: '#ddd',
        transform: [{scaleY: .4}]
    },
    emptyWrap: {
        flexDirection: 'column',
        padding: 15,
        alignItems: 'center'
    },
    emptyText: {
        color: '#969BA6',
        fontSize: 16
    },
    pullLoadingPanel: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    },
    pullLoadingBox: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 4,
        alignItems: 'center'
    },
    loadedPanel: {
        alignItems: 'center'
    },
    loadedText: {
        height: 45,
        color: '#969BA6',
        textAlignVertical: 'center'
    },
    loadingText: {
        color: '#969BA6',
        marginTop: 8
    },
    emptyImg: {
        width: 240,
        height: 150
    }
})