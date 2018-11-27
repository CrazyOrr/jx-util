var util = require('../')
var expect = require('chai').expect

describe('Object', function() {
  describe('entries', function() {
    let obj = {
      key: 10
    }

    let entries = util.object.entries(obj)

    it(`检验 entries`, function() {

      expect(entries[0][0] === 'key').to.be.equal(true)
      expect(entries[0][1] === 10).to.be.equal(true)
    })
  })
})
