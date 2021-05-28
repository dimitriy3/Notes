import { View } from '../core'
import notesView from './notes.view'

class ContentView extends View {
  constructor() {
    super()
    this.state = {
      notes: []
    }
    this.selector = 'content'
  }

  components() {
    return [this, notesView]
  }

  events() {
    return {
      '.clear': 'click handleClear'
    }
  }

  handleClear = () => {
    this.props.clearNotes(this.setNotes.bind(this))
  }

  mount() {
    this.setNotes()
  }

  setNotes = () => {
    this.props.getAll()
      .then(notes => {
        this.setState({ notes })
      })
      .catch(e => console.log(e))
  }

  render() {
    const notes = notesView.init({ notes: this.state.notes })

    const warn = `
      <div class="warn">
        <i class="material-icons img">note</i>
        <h1 class="no-notes">You haven't any notes yet</h1>
      </div>
    `

    const clear = `<h3 class="clear">Clear</h3>`

    return (`
        <div class="${ this.selector }">
          ${ notes }
          <div class="info-area center">
            ${ this.state.notes.length ? clear : warn }
          </div>
        </div>
    `)
  }  
}

export default new ContentView()