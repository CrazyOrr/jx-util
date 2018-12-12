var utils = require('../')

var expect = require('chai').expect

describe('string 功能测试', function() {

  describe('startWith', function() {
    let str = 'onxxxx'

    let ret = utils.string.startWith(str, 'on')

    it(`测试 bind`, function() {

      expect(ret).to.be.equal(true)
    })
  })
})