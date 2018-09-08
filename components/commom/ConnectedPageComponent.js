import React, { Component } from 'react'
import { connect } from 'react-redux'

class ConnectedPageComponent extends Component{
  componentWillMount(){
    this.update(this.props)
  }

  componentWillReceiveProps(props){
    if(props.asPath !== this.props.asPath) this.update(props)
  }

  update({ asPath, route, content, query, dispatch, actions }){
    dispatch({ type: 'SET_PAGE_STORE', pathname: asPath, route, query, content })
    if(Array.isArray(actions)) actions.map(action => dispatch(action))
  }

  render(){
    return this.props.children
  }
}

export default connect()(ConnectedPageComponent)
