import React from 'react'
import { connect } from 'react-redux'

interface IProps {
    msgkey: string,
    intl?: any
}
class MessageFormat extends React.Component<IProps>{
    render(){
        const { msgkey = null, intl } = this.props
        return msgkey ? intl.get(msgkey) : msgkey
    }
}
const mapStateProps = (state: any) => ({ ...state.Language })
export default connect(mapStateProps)(MessageFormat)