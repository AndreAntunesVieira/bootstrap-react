import { mockPushRoute } from '__tests__/__mocks__/NextRouterMock'
import { mockRes } from '__tests__/__mocks__/ServerRequestMock'

let route
mockPushRoute(nextRoute => route = `client/${nextRoute}`)
const res = mockRes((code, nextRoute) => route = `server/${code}/${nextRoute}`)
const { redirectTo } = require('helpers/RouteHelpers')

describe('redirectTo', () => {
  it('as client', () => {
    route = ''
    expect(route).toBe('')
    redirectTo('some-route')
    expect(route).toBe('client/some-route')
  })
  it('as server', () => {
    route = ''
    expect(route).toBe('')
    redirectTo('some-route', res, 301)
    expect(route).toBe('server/301/some-route')
    redirectTo('other-route', res)
    expect(route).toBe('server/302/other-route')
  })
})
