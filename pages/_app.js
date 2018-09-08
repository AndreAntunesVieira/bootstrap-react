import React, { Component } from 'react'
import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import { isClient } from 'helpers/Environment'
import ConnectedPageComponent from 'components/commom/ConnectedPageComponent'
import ModalContainer from 'components/global-coponents/ModalContainer'
import NotificationContainer from 'components/global-coponents/NotificationContainer'
import { withReduxStore } from 'components/global-coponents/AppWithRedux'

class MyApp extends App {
  componentWillMount(){
    if (isClient && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/js/sw.js')
    }
    if(isClient) require('helpers/RouteEffect')
  }

  render() {
    const { Component, pageProps, redux, router } = this.props
    const { pageContent, actions, ...props } = pageProps
    return (
      <Container>
        <Provider store={ redux }>
          <ConnectedPageComponent content={pageContent} actions={actions} {...router}>
            <Component { ...props } />
            <ModalContainer />
            <NotificationContainer />
          </ConnectedPageComponent>
        </Provider>
      </Container>
    )
  }
}

export default withReduxStore(MyApp)

