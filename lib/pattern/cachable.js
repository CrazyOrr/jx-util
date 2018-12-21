import n from './native'

var Cachable = function  (key, needDisk = true) {
  this.key = key;

  this.needDisk = needDisk;
}

const _clz = Cachable;

_clz.setProvider = function ( provider ) { // It should like providable
  this.provider = provider;
}

const _inst = Cachable.prototype
_inst.$ = _clz;

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