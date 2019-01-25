var Dependable = require('../src/pattern/dependable')
var expect = require('chai').expect

 function add(a, b) {
  return Promise.resolve(a + b);
}

describe('Dependable 功能测试', function() {

  describe('#add()', () => {
    it('2 + 2 is 4', async () => {
      const p = await add(2, 2)
      expect(p).to.equal(4);
    });

    it('3 + 3 is 6', async () => {
      const p = await add(3, 3)
      expect(p).to.equal(6);
    });
  });

  describe('Dependable 事件在前', () => {
    var d = new Dependable()

    d.ready('1')

    it(`测试`, async function () {

      await d.when('1');

      expect(true).to.equal(true);
    })
  })

  describe('Dependable 监听在前', function() {
    var d = new Dependable()

    it(`测试`, async function () {
      await d.when('2')

      expect(true).to.equal(true)
    })

    setTimeout(function () {
      d.ready('2')
    }, 1000)
  })


})
