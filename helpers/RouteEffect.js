let bodyTimer

const { Router } = require('pages/_routes')
Router.onRouteChangeStart = () => document.querySelector('body').classList.add('loadingNextRoute')
Router.onRouteChangeComplete = () => removeBodyLoadingClass()
Router.onRouteChangeError = () => removeBodyLoadingClass()

async function removeBodyLoadingClass() {
  clearTimeout(bodyTimer)
  document.querySelector('body').classList.remove('loadingNextRoute')
  document.querySelector('body').classList.add('loadingNextRouteRemoving')
  bodyTimer = setTimeout(() => document.querySelector('body').classList.remove('loadingNextRouteRemoving'), 150)
}
