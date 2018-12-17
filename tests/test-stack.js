// var util = require('../')
var Stack = require('../lib/struct/stack')
var expect = require('chai').expect

describe('Stack 功能测试', function() {

  describe('全量测试', function() {
    it(`Stack set length = 0`, function() {
      let s1 = new Stack()

      s1.init(0)

      s1.push(1)

      expect(s1.length() == 0).to.be.equal(true)
    })

    it(`Stack push to full`, function() {
      let s2 = new Stack()

      s2.init(3)

      s2.push(1)
      s2.push(1)
      s2.push(1)
      s2.push(1)
      expect(s2.length() == 3).to.be.equal(true)
    })

    it(`Stack pop to empty`, function() {
      let s3 = new Stack()

      s3.init(3)

      s3.push(1)
      s3.push(1)
      s3.push(1)
      s3.push(1)
      s3.pop()
      s3.pop()
      s3.pop()
      s3.pop()
      expect(s3.length() == 0).to.be.equal(true)
    })

    it(`Stack pop one`, function() {
      let s3 = new Stack()

      s3.init(3)
      s3.push(1)
      s3.push(2)
  
      let ret = s3.pop()
      expect(ret == 2).to.be.equal(true)
    })

    it(`Stack empty`, function() {
      let s4 = new Stack()

      s4.init(3)
      expect(s4.empty() == true).to.be.equal(true)
    })

    it(`Stack clear`, function() {
      let s5 = new Stack()

      s5.init(3)

      s5.push(1)
      s5.push(1)
      s5.push(1)

      s5.clear()
      expect(s5.length() == 0).to.be.equal(true)
    })

    it(`Stack top`, function() {
      let s5 = new Stack()

      s5.init(3)

      s5.push(1)
      s5.push(2)
      s5.push(4)

      expect(s5.top() == 4).to.be.equal(true)
    })

    it(`Stack desc`, function() {
      let s5 = new Stack()

      s5.init(3)

      s5.push(1)
      s5.push(2)
      s5.push(4)

      expect(s5.desc() == '1,2,4').to.be.equal(true)
    })
    
  })
})