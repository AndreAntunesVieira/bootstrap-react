const redirectMock = _ => _

export function mockRes (redirect = redirectMock) {
  return {
    redirect
  }
}
