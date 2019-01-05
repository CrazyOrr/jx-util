var utils = require('../')

var expect = require('chai').expect

describe('url 功能测试', function() {

  describe('encode, decode', function() {
    let url = 'http://baidu.com'
    let str = `${url}?count=0`

    let obj = utils.url.decode(str)

    console.log(obj)

    it(`测试 decode`, function() {

      expect(obj.count==0).to.be.equal(true)
    })

    let url2 = utils.url.encode(url, obj)


    it(`测试 encode`, function() {

      expect(url2===str).to.be.equal(true)
    })
    
  })
})