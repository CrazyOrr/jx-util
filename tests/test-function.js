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

  describe('$args', function () {
    function test (a) {

    }

    let params = util.function.$args(test) // 这是angularjs的注入原理

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
})