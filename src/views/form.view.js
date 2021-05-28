import { View } from '../core'

class FormView extends View {
  constructor() {
    super()
    this.selector = 'form'
  }

  components() {
    return [this]
  }

  events() {
    return {
      '.form': 'submit handleForm'
    }
  }

  handleForm = event => {
    event.preventDefault()
    const title = event.target.querySelector('.input').value
    this.props.addNote({ title }, this.props.setNotes)
    event.target.reset()
  }

  render() {
    return (`
        <form class="${ this.selector }">
          <input
            placeholder="Enter your note"
            autocomplete="off"
            class="input"
          >
        </form>
    `)
  }  
}

export default new FormView()