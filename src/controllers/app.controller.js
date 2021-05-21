import { ROOT } from '../constants/root'
import { Controller } from '../core'

import notesModel from '../models/notes'
import app from '../views/app'

class AppController extends Controller {
  appAction() {
    // const data = notesModel.getAll()
    // this.render(app, data.notes)

    notesModel.getAll()
      .then(notes => {
        this.render(app, { notes })
      })
      .catch(e => console.log(e))
  }

  eventListeners() {
    const form = document.getElementById('form')
    form.addEventListener('submit', event => {
      event.preventDefault()
      const title = form.querySelector('.input').value
      notesModel.addNote({ title }, this.appAction.bind(this))
    })
  }

  render(view, data) {
    const html = view.getHTML({ ...data })
    ROOT.innerHTML = html
    this.eventListeners()
  }
}

export default new AppController()