import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'
import AppleMetaTags from 'components/commom/AppleMetaTags'
import AboveTheFoldStyles from 'components/global-coponents/AboveTheFoldStyles'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
        <link rel="icon" type="image/png" href="/img/pwa-5.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#5f447b" />
        <script dangerouslySetInnerHTML={{ __html: `if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/js/sw.js')
            .then(() => console.log('Service worker running'))
            .catch((err) => console.log('Error to run service worker: ', err))
        }`}} />
        <AboveTheFoldStyles />
        {this.props.styleTags}
        <AppleMetaTags />
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAQ8gEfohLsPEhX-0UWYZlc1gYMppadY9w&libraries=places&v=3.26" async defer />
      <script src="https://sdk.accountkit.com/pt_BR/sdk.js" async defer />
      </html>
    )
  }
}
