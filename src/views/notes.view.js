import { View } from '../core'

class NotesView extends View {
  constructor() {
    super()
    this.selector = 'notes'
  }

  components() {
    return [this]
  }

  render() {
    const notesHTML = this.props.notes.map(({ title }) => (`
      <div class="note"><p class="note_input">${ title }</p></div>
    `)).join('')

    return (`
        <div class="${ this.selector }">
          ${ notesHTML }
        </div>
    `)
  }  
}

export default new NotesView()