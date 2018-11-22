var util = require('../')
var expect = require('chai').expect

describe('function 功能测试', function() {

  describe('bind', function() {
    let that = { x: 100 }
    let fn = () => {
      return this.x
    }
    let binded = util.function.bind(fn, that)

    it(`测试 bind`, function() {

      expect(binded() === 100).to.be.equal(true)
    })
  })
})