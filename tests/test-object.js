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

  describe('forEach', function() {
    let obj = {
      key: 10,
      key2: 20
    }

    let total = 0

    util.object.each(obj, function (v, k, obj) {
      total += v
    })

    it(`检验 forEach`, function() {
      expect(total === 30).to.be.equal(true)
    })
  })

  describe('map', function() {
    let obj = {
      key: 10,
      key2: 20
    }

    let obj2 = util.object.map(obj, function (v, k) {
      if (k === 'key2') {
        return 30
      }

      return v
    })

    it(`检验 map`, function() {
      expect(obj2.key2 === 30).to.be.equal(true)
    })
  })

  describe('filter', function() {
    let obj = {
      key: 10,
      key2: 20
    }

    let obj2 = util.object.filter(obj, function (v, k) {
      return v === 20
    })

    it(`检验 filter`, function() {
      expect(obj2.hasOwnProperty('key') === false).to.be.equal(true)
    })
  })

  describe('clean', function() {
    let obj = {
      key: 10,
      key2: 20
    }

    util.object.clean(obj, ['key'])

    it(`检验 clean`, function() {
      expect(obj.hasOwnProperty('key2') === false).to.be.equal(true)
    })
  })

  describe('isEmpty', function() {
    let obj = {
    }

    it(`检验 isEmpty`, function() {
      expect(util.object.isEmpty(obj) === true).to.be.equal(true)
    })
  })

  describe('extend', function() {
    let obj = {
    }

    let obj2 = util.object.extend(obj, {a:1})

    it(`检验 extend`, function() {
      expect(obj2 === obj && obj.a === 1).to.be.equal(true)
    })
  })
})
