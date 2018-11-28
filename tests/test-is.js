var util = require('../')
var expect = require('chai').expect

describe('is 功能测试', function() {

  describe('全量测试', function() {
    let fn = function () {}
    let num = 1
    let str = ''
    let b = true
    let arr = []
    let obj = {}
    let err = Error()
    let reg = RegExp()

    it(`fn is.instanceof Function`, function() {
      expect(util.is.instanceof(Function, fn)).to.be.equal(true)
    })

    it(`arr should be Array`, function() {
      expect(util.is.array(arr)).to.be.equal(true)
    })

    it(`obj should be Object`, function() {
      expect(util.is.object(obj)).to.be.equal(true)
    })

    it(`str should be String`, function() {
      expect(util.is.string(str)).to.be.equal(true)
    })

    it(`err should be Error`, function() {
      expect(util.is.error(err)).to.be.equal(true)
    })

    it(`reg should be RegExp`, function() {
      expect(util.is.regexp(reg)).to.be.equal(true)
    })

    it(`num should be Number`, function() {
      expect(util.is.number(num)).to.be.equal(true)
    })

    it(`should be undefined`, function() {
      expect(util.is.undefined(undefined)).to.be.equal(true)
    })

    it(`should be true`, function() {
      expect(util.is.true(true)).to.be.equal(true)
    })

    it(`should be false`, function() {
      expect(util.is.false(false)).to.be.equal(true)
    })

    it(`should be Null`, function() {
      expect(util.is.null(null)).to.be.equal(true)
    })

    it(`should not be JSON string`, function() {
      expect(util.is.json('dd')).to.be.equal(false)
    })

    it(`should be not string`, function() {
      expect(util.is.json('{"key":0}')).to.be.equal(true)
    })

    it(`should be bool`, function() {
      expect(util.is.bool(true)).to.be.equal(true)
    })

    it(`should be Date`, function() {
      expect(util.is.date(new Date())).to.be.equal(true)
    })

    it(`should be Promise`, function() {
      expect(util.is.promise(new Promise((resolve)=>{resolve()}))).to.be.equal(true)
    })

    it(`should be bad`, function() {
      expect(util.is.bad(false)).to.be.equal(true)
    })

    it(`should be ok`, function() {
      expect(util.is.ok(new Date())).to.be.equal(true)
    })

    it(`should be empty`, function() {
      expect(util.is.empty("")).to.be.equal(true)
    })
  })
})