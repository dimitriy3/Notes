import appController from './controllers/app.controller'

class Router {
  dispatch(url) {
    switch (url) {
      case '/':
        appController.appAction()
        break
      default:
        console.log('404')
    }
  }
}

export default new Router()