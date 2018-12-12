import n from './native'

function Cachable (key, needDisk = true) {
  this.key = key

  this.needDisk = needDisk
}

Object.assign(Cachable.prototype, {
  get () {
    return this.needDisk ? n.cache.get(this.key) : this.val
  },
  set (val) {
    if (this.needDisk) {
      n.cache.set(this.key, val)
    } else {
      this.val = val
    }
  },
  rm () {
    this.needDisk ? n.cache.rm(this.key) : this.val = null
  }
})

export default Cachable