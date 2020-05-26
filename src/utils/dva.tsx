import React from 'react'
import { Provider } from 'react-redux'
const { create } = require('dva-core')
import { Provider as AntProvider } from '@ant-design/react-native'
import Theme from '../themes'
import Model from '@/utils/model'

interface Options {
    models?: Model[],
    extraReducers?: any,
    onEffect?: () => void,
    initialState?: any,
    onError?: (e: any) => void,
    onAction?: any[] | void
}

//创建dva实例并返回
const dva = (options: Options) => {
    const app = create(options)
    if(Array.isArray(options.models))
        options.models.forEach(model => app.model(model))
    app.start()
    const store = app._store
    app.start = (container: React.ReactNode): React.FunctionComponent => () => <Provider store={store}>
        <AntProvider theme={Theme}>
            {container}
        </AntProvider>
    </Provider>
    return app
}

export default dva