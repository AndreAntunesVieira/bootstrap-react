import { Router } from 'pages/_routes'

export const redirectTo = (route, res, code = 302) => {
  if (!res) {
    return Router.pushRoute(route)
  }
  return res.redirect(code, route)
}
