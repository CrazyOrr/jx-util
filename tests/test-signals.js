var signals = require('../src/support/signals')

var expect = require('chai').expect

describe('signals 功能测试', function() {

  describe('常规', function() {
    let ret = ''
    let obj = {
      dataSignal: new signals.Signal()
    }

    function onReceived(param1, param2) {
      ret = param1+param2
    }

    obj.dataSignal.send(1, 4)


    obj.dataSignal.on(onReceived)

    obj.dataSignal.off(onReceived)

    obj.dataSignal.dispose()

    // obj.dataSignal.send(6) // 会异常
    // obj.dataSignal.on(onReceived) // 会抛异常

    it(`测试 bind`, function() {

      expect(ret === 5).to.be.equal(true)
    })
  })
})
