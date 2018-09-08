import React, { Component } from 'react'
import { initStore } from 'redux/Store'
import { isServer } from 'helpers/Environment'

export function withReduxStore(WrappedApp) {
  return class AppWithRedux extends Component {
    redux = getOrCreateStore(this.props.initialReduxState)

    static async getInitialProps(appContext) {
      const redux = initStore()
      appContext.ctx.redux = redux
      let appProps = {}
      if (typeof WrappedApp.getInitialProps === 'function') {
        appProps = await WrappedApp.getInitialProps.call(WrappedApp, appContext)
      }
      return { ...appProps, initialReduxState: redux.getState() }
    }

    render() {
      return <WrappedApp { ...this.props } redux={ this.redux }/>
    }
  }
}

function getOrCreateStore(initialState) {
  const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'
  if (isServer) {
    return initStore(initialState)
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}
