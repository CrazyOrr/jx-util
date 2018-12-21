var Asyncable = require('../lib/pattern/asyncable')
// import Asyncable from '../lib/pattern/asyncable'
var expect = require('chai').expect

describe('Asyncable 功能测试', function() {

  describe('Asyncable', function() {
    var a = new Asyncable()

    it(`测试`, function (done) {
      a.promisely().then(()=> {
        expect(true).to.be.equal(true)

        done()
      })

      setTimeout(function () {
        a.then()
      }, 1000)
    })
  })

  
})