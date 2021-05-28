class LsApi {
  
  constructor() {
    this.name = 'noteses'
    if (localStorage.getItem(this.name) === null) {
      localStorage.setItem(this.name, '{"notes": [], "theme": "light"}')
    }
  }

  getNotes() {
    return JSON.parse(localStorage.getItem(this.name)).notes
  }

  addNote(note) {
    const noteses = JSON.parse(localStorage.getItem(this.name))
    noteses.notes.push(note)
    localStorage.setItem(this.name, JSON.stringify(noteses))
  }

  clearNotes() {
    const noteses = JSON.parse(localStorage.getItem(this.name))
    noteses.notes = []
    localStorage.setItem(this.name, JSON.stringify(noteses))
  }

  getTheme() {
    return JSON.parse(localStorage.getItem(this.name)).theme
  }

  saveTheme(theme) {
    const noteses = JSON.parse(localStorage.getItem(this.name))
    noteses.theme = theme
    localStorage.setItem(this.name, JSON.stringify(noteses))
  }
}

export default new LsApi()