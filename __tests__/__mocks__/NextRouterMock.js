export function mockPushRoute (pushRoute) {
  jest.doMock('pages/_routes', () => ({
    Router: { pushRoute }
  }))
}
