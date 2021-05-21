class LsApi {
  name = 'notes'
  
  constructor() {
    if (localStorage.getItem(this.name) === null) {
      localStorage.setItem(this.name, '[]')
    }
  }

  getNotes() {
    return JSON.parse(localStorage.getItem(this.name))
  }

  addNote(note) {
    const notes = JSON.parse(localStorage.getItem(this.name))
    notes.push(note)
    localStorage.setItem(this.name, JSON.stringify(notes))
  }
}

export default new LsApi()