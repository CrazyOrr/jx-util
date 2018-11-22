var util = require('../')
var expect = require('chai').expect

describe('core 功能测试', function() {
  describe('uniqId', function() {
    let case1_a = util.uniqId()
    let case1_b = util.uniqId()
    it(`检验 [${case1_a}!=${case1_b}] - 成功`, function() {

      expect(case1_a !== case1_b).to.be.equal(true)
    })
  })

  describe('uuid', function() {
    let uuid1 = util.uuid()
    let uuid2 = util.uuid()

    it(`检验 [${uuid1},${uuid2}]] 成功`, function() {

      expect(true).to.be.equal(true)
    })
  })

  describe('timing', function() {
    let fn = () => {
      let count = 1000000000
      while ( count -- ) ;

      return 'ok'
    }
    let ret = util.timing(fn)
    it(`检验 [${ret}ms] 成功`, function() {

      expect(true).to.be.equal(true)
    })
  })

  describe('extend', function() {
    let extendObj = { x : 9 }
    let obj = util.extend( {}, extendObj )
    
    it(`检验 [obj=${obj}, ext=${extendObj}]`, function() {

      expect(obj.x === 9).to.be.equal(true)
    })
  })
})