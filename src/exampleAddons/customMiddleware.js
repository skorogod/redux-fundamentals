function exampleMiddleWare(storeAPI) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      return next
    }
  }
}
