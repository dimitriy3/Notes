import { Model } from '../core'
import lsApi from '../services/ls.api'

class Notes extends Model {
  constructor() {
    super()
    this.notes = lsApi.getNotes()
  }

  async getAll() {
    return this.notes
  }

  addNote(note, cb) {
    lsApi.addNote(note)
    this.notes = lsApi.getNotes()
    cb()
  }
}

export default new Notes()