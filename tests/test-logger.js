var logger = require('../lib/support/logger')
var expect = require('chai').expect

const __TAG_INIT__ = '日志初始化'
const __TAG_LEVEL__ = '日志级别'
const __TAG_OUT__ = '日志信息、字段、格式'
const __TAG_HANDLER__ = 'Handler'

describe('logger 功能测试', function() {

  describe(__TAG_INIT__, function() {

    logger.setEnabled(true)
    logger.tag(__TAG_INIT__).info('111111, 222222 follows, but mute')
    logger.setEnabled(false)
    logger.tag(__TAG_INIT__).info('222222')
    logger.setEnabled(true)
    logger.tag(__TAG_INIT__).info('333333')

    it('默认', function() {
      expect(true).to.be.equal(true)
    })
    
  })

  describe(__TAG_LEVEL__, function() {
    
    logger.tag(__TAG_LEVEL__).info('ddddddd')

    it('默认', function() {
      expect(true).to.be.equal(true)
    })
    
  })

  describe(__TAG_OUT__, function() {
    
    logger.tag(__TAG_OUT__).info('ddddddd')

    it('默认', function() {
      expect(true).to.be.equal(true)
    })
    
  })

  describe(__TAG_HANDLER__, function() {
    
    logger.tag(__TAG_HANDLER__).info('begin to test handler')

    var hasError = false
    var handler = function (type, msg) {

      if (type==='ERROR') {
        hasError = true
      }
    }
    logger.setHandler(handler)

    logger.tag(__TAG_HANDLER__).error('end to test handler')

    it('默认', function() {
      expect(hasError).to.be.equal(true)
    })
    
  })
})