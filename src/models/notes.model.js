import { Model } from '../core'
import lsApi from '../services/ls.api'

class NotesModel extends Model {
  constructor() {
    super()
    this.notes = lsApi.getNotes()
  }

  async getAll() {
    return this.notes
  }

  async addNote(note, cb) {
    lsApi.addNote(note)
    this.notes = lsApi.getNotes()
    cb()
  }

  async clearNotes(cb) {
    lsApi.clearNotes()
    this.notes = lsApi.getNotes()
    cb()
  }
}

export default new NotesModel()