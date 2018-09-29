class Dispatcher {

  constructor() {
    this.handler = {
    }
  }

  observe (type, fn) {
    if (!this.handler[type]) {
      this.handler[type] = []
    }
    this.handler[type].push(fn)
  }

  unobserve (type, fn) {
    this.handler[type] && (this.handler[type] = this.handler[type].filter(v => v !== fn))
  }

  fire (type, data) {
    this.handler[type] && this.handler[type].forEach(v => v(data))
  }

}

export default new Dispatcher()