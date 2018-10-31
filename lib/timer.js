module.exports = (function ( f ) {
  var $ = f.timer = {}

  /**
   * @brief 定时器
   * @param {*} intervalSeconds 
   * @param {*} handler 
   */
  $.repeat = (intervalSeconds, handler) => {
    return setInterval(handler, intervalSeconds*1000)
  }

  $.repeatOff = (timer) => {
    clearInterval(timer)
  }
})