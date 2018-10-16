/**
 * @desc 全屏显示与取消全屏
 * @html <a id="toggleFullScreen" href="javascript:;" onclick="toggleFullScreen()">全屏显示</a>
 */
function toggleFullScreen() {
  if (!document.fullscreenElement &&
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {
      if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen();
          document.getElementById("toggleFullScreen").innerText = "退出全屏";
      } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
          document.getElementById("toggleFullScreen").innerText = "退出全屏";
      } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          document.getElementById("toggleFullScreen").innerText = "退出全屏";
      }
  } else {
      if (document.cancelFullScreen) {
          document.cancelFullScreen();
          document.getElementById("toggleFullScreen").innerText = "全屏显示";
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
          document.getElementById("toggleFullScreen").innerText = "全屏显示";
      } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
          document.getElementById("toggleFullScreen").innerText = "全屏显示";
      }
  }
};
// 监听Esc按键退出全屏事件
window.onresize = function () {
  var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
  if (isFull === undefined) {
      isFull = false;
  }
  if (!isFull) {
      if (document.cancelFullScreen || document.mozCancelFullScreen || document.webkitCancelFullScreen) {
          document.getElementById("toggleFullScreen").innerText = "全屏显示";
      }
  }
}

/**
 * @desc 获取滚动条距顶部的距离
 */
function spacesOfScrollBarIndicator2Top() {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
}

/**
 * @desc 判断浏览器是否支持webP格式图片
 * @return {Boolean} 
 */
function isSupportWebP() {
  return !![].map && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
}

/**
 * @desc  获取一个元素的距离文档(document)的位置，类似jQ中的offset()
 * @param {HTMLElement} ele 
 * @returns { {left: number, top: number} }
 */
function offset(ele) {
  var pos = {
      left: 0,
      top: 0
  };
  while (ele) {
      pos.left += ele.offsetLeft;
      pos.top += ele.offsetTop;
      ele = ele.offsetParent;
  };
  return pos;
}

var getScrollTop = require('./getScrollTop');
var setScrollTop = require('./setScrollTop');
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})()
/**
 * 
 * @desc  在${duration}时间内，滚动条平滑滚动到${to}指定位置
 * @param {Number} to 
 * @param {Number} duration 
 */
function scrollTo(to, duration) {
    if (duration < 0) {
        setScrollTop(to);
        return;
    };
    var diff = to - getScrollTop();
    if (diff === 0) return;
    var step = diff / duration * 10;
    requestAnimationFrame(
        function () {
            if (Math.abs(step) > Math.abs(diff)) {
                setScrollTop(getScrollTop() + diff);
                return;
            };
            setScrollTop(getScrollTop() + step);
            if (diff > 0 && getScrollTop() >= to || diff < 0 && getScrollTop() <= to) {
                return;
            };
            scrollTo(to, duration - 16);
        });
}

/**
 * 
 * @desc 设置滚动条距顶部的距离
 */
function setSpacesOfScrollBarIndicator2Top(value) {
  window.scrollTo(0, value);
  return value;
};

module.exports = {
  toggleFullScreen,
  spacesOfScrollBarIndicator2Top,
  setSpacesOfScrollBarIndicator2Top,
  isSupportWebP,
  offset,
  scrollTo
}