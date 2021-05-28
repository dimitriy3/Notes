export class View {
  setState(state) {
    this.state = { ...this.state, ...state }
    this.update()
  }

  update() {
    const tmp = this.render()
    const content = tmp.slice(tmp.indexOf('>') + 1, tmp.lastIndexOf('<'))
    document.querySelector('.' + this.selector).innerHTML = content
    this.registerEventListeners()
  }

  registerComponents() {
    const components = this.components()
    components.forEach(component => {
      component.mount()
    })
  }

  registerEventListeners() {
    this.components().forEach(component => {
      const events = component.events()
      for (let key in events) {
        if (key !== 'window') {
          const el = document.querySelector(key)
          if (el !== null) {
            const params = events[key].split(' ')
            el.addEventListener(params[0], component[params[1]])
          }
        } else {
          const params = events[key].split(' ')
          window.addEventListener(params[0], component[params[1]])
        }
      }
      component.eventListeners()
    })
  }

  init(props) {
    this.props = props
    return this.render()
  }

  // Public
  mount() {
    //
  }

  components() {
    return []
  }

  events() {
    return {}
  }

  eventListeners() {
    //
  }
}