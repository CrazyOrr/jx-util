var util = require('../')
var expect = require('chai').expect

describe('reg 功能测试', function() {
 
  //writeFile功能测试
  describe('isValidName', function() {
    let case1 = '11aa我'
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isValidName(case1)).to.be.equal(true)
    })

    let case2 = '11_'
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isValidName(case2)).to.be.equal(false)
    })
  })
})