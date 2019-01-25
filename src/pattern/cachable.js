/**
 * @desc 缓存模式
 * @MUST 必须设置供应器
 */
var Cachable = function  (key) {
  this.key = key;
}

const _clz = Cachable;
_clz.setProvider = function ( provider ) { // It should like Cachable.set/get/rm
  this.provider = provider;
}

const _inst = Cachable.prototype;
_inst.$ = _clz;

Object.assign(Cachable.prototype, {
  get () {
    if (this.$.provider) {
      return this.$.provider.get(this.key)
    }

    throw new Error('Cachable need provider')
  },
  set (val) {
    if (this.$.provider) {
      this.$.provider.set(this.key, val)
    }

    throw new Error('Cachable need provider')
  },
  rm () {
    if (this.$.provider) {
      this.$.provider.rm(this.key)
    }
  }
})

/**
 * 内存缓存模式
 */
export class MemoryCachable extends Cachable {
  constructor (key) {
    super(key);

    this.val = null;
  }

  get () {
    return this.val;
  }

  set (val) {
    this.val = val;
  }

  rm () {
    this.val = null;
  }
}

export default Cachable;
