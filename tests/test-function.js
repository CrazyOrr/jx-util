var util = require('../')
var expect = require('chai').expect

describe('function 功能测试', function() {

  describe('bind', function() {
    let that = { x: 100 }
    let fn = function () {
      return this.x
    }
    let fn1 = () => {
      return 100
    }

    let binded = util.function.bind(fn, that)

    it(`测试 bind`, function() {

      expect(binded() === 100).to.be.equal(true)
    })
  })

  describe('perform', function() {
    let ctx = {
      num: 10,
      test ( val ) {
        return this.num+val
      }
    }

  
    let fn = function (val, val1) {
      return this.num+val+val1
    }

    let ret1 = util.function.perform(ctx, 'test', 5)

    it(`测试 perform, fn as name, ${ret1}`, function() {
      expect(ret1 === 15).to.be.equal(true)
    })

    let ret2 = util.function.perform(ctx, fn, 5, 6)

    it(`测试 perform, fn as function, ${ret2}`, function() {
      expect(ret2 === 15).to.be.equal(true)
    })
  })

  describe('args', function () {
    function test (a) {

    }

    let params = util.function.args(test) // 这是angularjs的注入原理

    it(`测试 $args`, function() {
      expect(params[0] === 'a').to.be.equal(true)
    })
  })

  describe('chain', function () {
    let count = 1

    function step1 (next) {
      count ++ 

      next ()
    }

    function step2 (next) {
      count ++
      
      next()
    }

    function step3 (next) {
      count ++
    }

    util.function.chain([step1, step2, step3])

    it(`测试 $args`, function() {
      expect(count === 4).to.be.equal(true)
    })
  })

  describe('compose', function () {
    function step1 (c) {
      return c*3
    }

    function step2 (c) {
      return c+4
    }

    function step3 () {
      return 1
    }

    let count = util.function.compose(step1, step2, step3)

    it(`测试 compose`, function() {
      expect(count() === 15).to.be.equal(true)
    })
  })

  describe('curry', function () {
    function add () {
      let args = util.function.argsly(arguments)
      args.reduce((p, c) => {
        return p+c
      })
    }

    var curriedAdd = util.function.curry(add)
    let sum1 = curriedAdd (1, 2, 3, 4)

    curriedAdd (1, 2, 3)

    let sum2 = curriedAdd (4)

    it(`测试 curry`, function() {
      expect(sum1 === sum2).to.be.equal(true)
    })
  })

  describe('throttle', function (done) {
    let before = new Date().getUTCSeconds()

    let count = 1

    function add () {
      count ++
    }

    let throttledAdd = util.function.throttle(60, true, add, true)

    throttledAdd()
    throttledAdd()
    throttledAdd()
    
    it(`count 应该等于 4`, function() {
      setTimeout(function () {
        expect(count === 4).to.be.equal(true)
        done()
      }, 1000)
    })
  })

  describe('debounce', function (done) {
    let count = 1

    function add () {
      count ++
    }

    let debouncedAdd = util.function.debounce(600, add)

    debouncedAdd()
    debouncedAdd()
    debouncedAdd()

    it(`count 应该等于 2`, function() {
      setTimeout(function () {
      
        expect(count === 2).to.be.equal(true)
        done()
      }, 1000)
    })
  })

  describe('pipes', function () {
    function step1 () {
      return 2
    }

    function step2 (c) {
      return c+4
    }

    function step3 (c) {
      return c*3
    }

    let count = util.function.pipes(step1, step2, step3)

    it(`测试 pipes ${count()} = 18`, function() {
      expect(count() === 18).to.be.equal(true)
    })
  })
})