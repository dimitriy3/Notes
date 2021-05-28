import { Controller } from '../core'

import notesModel from '../models/notes.model'
import appView from '../views/app.view'

class AppController extends Controller {
  appAction() {
    document.querySelector('#root').innerHTML = appView.init({
      getAll: notesModel.getAll.bind(notesModel),
      addNote: notesModel.addNote.bind(notesModel),
      clearNotes: notesModel.clearNotes.bind(notesModel)
    })
    appView.registerComponents()
    appView.registerEventListeners()
  }
}

export default new AppController()