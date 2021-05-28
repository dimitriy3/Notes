import { View } from '../core'
import lsApi from '../services/ls.api'

import navbarView from './navbar.view'
import formView from './form.view'
import contentView from './content.view'

class AppView extends View {
  constructor() {
    super()
    this.selector = 'container'
  }

  components() {
    return [this, navbarView, formView, contentView]
  }

  events() {
    return {
      'window': 'keydown handleDigit'
    }
  }
  
  handleDigit = e => {
    const focus = document.querySelector('.form .input')
    if (e.code === 'Digit1' && focus !== document.activeElement) {
      this.switchTheme()
    }
    if (e.code === 'Digit3' && focus !== document.activeElement) {
      this.props.clearNotes(contentView.setNotes.bind(contentView))
    }
  }

  switchTheme = () => {
    document.body.classList.remove('dark')
    lsApi.saveTheme(lsApi.getTheme() === 'dark' ? 'light' : 'dark')
    document.body.classList.add(lsApi.getTheme())
  }

  render() {
    const { switchTheme } = this
    const { addNote, getAll, clearNotes } = this.props
    const { setNotes } = contentView

    const navbar = navbarView.init({ switchTheme })
    const form = formView.init({ addNote, setNotes })
    const content = contentView.init({ getAll, clearNotes })

    return (`
      <div class="${ this.selector }">
        ${ navbar }
        <div class="center">
          ${ form }
        </div>
        <hr>
        ${ content }
      </div>
    `)
  }  
}

export default new AppView()