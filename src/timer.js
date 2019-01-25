module.exports = (function ( f ) {
  var $ = f.timer = {}

  /**
   * @desc 定时回调
   * @param {*} seconds 
   * @param {*} handler 
   */
  $.interval = (seconds, handler) => {
    return setInterval(handler, seconds*1000)
  }

  $.off = (timer) => {
    clearInterval(timer)
  }

  /**
   * @desc 超时回调
   */
  $.timeout = (seconds, handler, ...rest) => {
    return setTimeout(handler, seconds*1000, ...rest)
  }

  $.expire = (timer) => {
    clearTimeout(timer)
  }
})