import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
	'Non-serializable values were found in the navigation state',
	'MaxListenersExceededWarning: Possible EventEmitter memory leak detected'
])
console.disableYellowBox = true
import React from 'react'
import Models from './src/models'
import { Dva } from './src/utils'
import Layout from '@/layout'

const dvaApp = Dva({
	initialState: {},
	models: Models,
	onError(e: any){
		console.error('onError', e)
	},
	onAction: []
})

const App = dvaApp.start(<Layout />)
export default App