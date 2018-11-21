var util = require('../')
var expect = require('chai').expect

describe('regex 功能测试', function() {
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

  describe('isEmail', function() {
    let case1 = '111@mail.com'
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isEmail(case1)).to.be.equal(true)
    })

    let case2 = '@mail.com'
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isEmail(case2)).to.be.equal(false)
    })
  })

  describe('isIdCard', function() {
    let case1 = '321201198901100098'
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isIdCard(case1)).to.be.equal(true)
    })

    let case2 = '321201'
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isIdCard(case2)).to.be.equal(false)
    })
  })
  
  describe('isPhoneNum', function() {
    let case1 = '18616361386'
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isPhoneNum(case1)).to.be.equal(true)
    })

    let case2 = '1701100221'
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isPhoneNum(case2)).to.be.equal(false)
    })
  })

  describe('isURL', function() {
    let case1 = 'http://baidu.com'
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isURL(case1)).to.be.equal(true)
    })

    let case2 = 'baidu_com_net_err'
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isURL(case2)).to.be.equal(false)
    })
  })

  describe('isPositiveInteger', function() {
    let case1 = 1
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isPositiveInteger(case1)).to.be.equal(true)
    })

    let case2 = 0
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isPositiveInteger(case2)).to.be.equal(false)
    })
  })

  describe('isNegativeInteger', function() {
    let case1 = -1
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isNegativeInteger(case1)).to.be.equal(true)
    })

    let case2 = 0
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isNegativeInteger(case2)).to.be.equal(false)
    })
  })

  describe('isInteger', function() {
    let case1 = -1
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isInteger(case1)).to.be.equal(true)
    })

    let case2 = 0.1
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isInteger(case2)).to.be.equal(false)
    })
  })

  describe('isNotNegativeFloatInteger', function() {
    let case1 = 1.1111
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isNotNegativeFloatInteger(case1)).to.be.equal(true)
    })

    let case2 = -0.1
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isNotNegativeFloatInteger(case2)).to.be.equal(false)
    })
  })

  describe('isAZaz', function() {
    let case1 = 'abC'
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isAZaz(case1)).to.be.equal(true)
    })

    let case2 = '0a'
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isAZaz(case2)).to.be.equal(false)
    })
  })

  describe('isIP', function() {
    let case1 = '192.168.0.1'
    it(`检验 [${case1}] - 成功`, function() {

      expect(util.regex.isIP(case1)).to.be.equal(true)
    })

    let case2 = '1.11'
    it(`检验 [${case2}] - 失败`, function() {
      expect(util.regex.isIP(case2)).to.be.equal(false)
    })
  })
})
