module.exports = (function ( f ) {
	var $ = f.Function = f.function = {}

    /**
     * @desc 函数 上下文绑定
     */
	$.bind = function ( fn, context ) {
		var slice = Array.prototype.slice

		if ( fn.bind ) {
			return fn.bind.apply( fn, slice.call( arguments, 1 ) )
		}

		var args = slice.call(arguments, 2)

		return function () {
			return fn.apply( context, args.length ? args.concat(slice.call(arguments)) : arguments )
		}
    }
    
	// fn that returns a value
	$.return = function ( value ) { return function () { return value } }
	$.falsify = $.return( false )
	$.truthify = $.return( true )
	$.nullify = $.return( null )
	$.undefinify = $.return( undefined )

	// $ that returns parameters names
	// Based on @Jack Allan's response at stackoverflow.com
	// http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
	$.getParamNames = (function () {

		// REGEX
		var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
			ARGUMENT_NAMES = /([^\s,]+)/g

		return function ( func ) {

			var fnStr = func.toString().replace(STRIP_COMMENTS, '')
			var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES)

			if(result === null) {
				result = []
			}

			return result
		}
    })()

    // chainAsync: 链异步函数
	// 循环遍历包含异步事件的函数数组, 当每个异步事件完成时调用next
	$.chainAsync = fns => {
        let curr = 0
        const next = () => fns[curr++](next)
        next()
    }

	// compose: 执行从右向左的函数组合
	// 使用Array.reduce()执行从右向左的函数组合。最后一个 (最右边) 的函数可以接受一个或多个参数;其余的函数必须是一元的。
	$.compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))

	// curry: 函数柯里化
	// curry()函数的主要作用是对被返回函数的参数进行排序，柯里化函数通过以下步骤动态创建：调用另一个函数并为它传入要柯里化的函数和必要参数，下面是创建柯里化函数的通用方式
	$.curry = fn => f.function.curryN(fn.length, fn)
    
    /**
     * Returns a curried equivalent of the provided function, with the specified
     * arity. If `g` is `curryN(3, f)`, the
     * following are equivalent:
     *
     *   - `g(1)(2)(3)`
     *   - `g(1)(2, 3)`
     *   - `g(1, 2)(3)`
     *   - `g(1, 2, 3)`
     *
     * @param {Number} arity The arity for the returned function.
     * @param {Function} fn The function to curry.
     * @return {Function} A new, curried function.
     * @example
     *
     *      var sumArgs = (...args) => sum(args);
     *
     *      var curriedAddFourNumbers = curryN(4, sumArgs);
     *      var f = curriedAddFourNumbers(1, 2);
     *      var g = f(3);
     *      g(4); //=> 10
     */
    $.curryN = (arity, fn) =>
    function curried(...args) {
        if (args.length >= arity) {
            return fn.apply(this, args);
        }

        return function(...newArgs) {
            return curried.apply(this, args.concat(newArgs));
        };
    }

    // *      var isQueen = propEq('rank', 'Q');
    // *      var isSpade = propEq('suit', '♠︎');
    // *      var isQueenOfSpades = allPass([isQueen, isSpade]);
    // *
    // *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
    // *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
    $.allPass = f.function.curryN(2, (fns, ...args) => {
        for (let i = 0; i < fns.length; i++) {
            if (!fns[i](...args)) {
                return false;
            }
        }
    
        return true;
    })

    /**
     * Returns a function that always returns the given value. Note that for
     * non-primitives the value returned is a reference to the original value.
     *
     * @param {*} x The value to wrap in a function
     * @return {Function}
     * @example
     *
     *      var t = always('Tee');
     *      t(); //=> 'Tee'
     */
    $.always = x => () => x

    /**
     * Takes a list of predicates and returns a predicate that returns true for a
     * given list of arguments if at least one of the provided predicates is satisfied
     * by those arguments.
     *
     * @param {Array} fns predicates
     * @param {...*} args passed arguments to predicates
     * @return {Function}
     * @example
     *
     *      var isClub = propEq('rank', '♣');
     *      var isSpade = propEq('suit', '♠︎');
     *      var isBlackCard = anyPass([isClub, isSpade]);
     *
     *      isBlackCard({rank: '10', suit: '♣'}); //=> true
     *      isBlackCard({rank: 'Q', suit: '♠'}); //=> true
     *      isBlackCard({rank: 'Q', suit: '♦'}); //=> false
     */
    $.anyPass = f.function.curryN(2, (fns, ...args) => {
        for (let i = 0; i < fns.length; i++) {
            if (fns[i](...args)) {
                return true;
            }
        }

        return false;
    });

    /**
     * @desc tryCatch 封装
     * Takes two functions, tryer and catcher.
     *
     * Returns a function that, when invoked with zero or more parameters,
     * calls the tryer with those parameters, and if tryer throws,
     * calls the catcher with the error as first argument and original arguments as rest.
     * If that still throws, then ¯\_(ツ)_/¯
     *
     * @example
     *      tryCatch(x => x.length, () => 0)([ 1, 2, 3 ]) // 3
     *      tryCatch(x => x.length, () => 0)( undefined ) // 0
     *      tryCatch(
     *          someDataTransform,
     *          (err, ...rest) => {
     *              logAsyncToServer('someDataTransform failed', err, 'with arguments', rest);
     *              return DEFAULT_VALUE;
     *          }
     *      )( someIncompleteData ) // DEFAULT_VALUE (error is logged somewhere)
     */
    $.tryCatch = f.function.curryN(2, (tryer, catcher) => {
        return (...args) => {
            try {
                return tryer.apply(this, args)
            } catch (e) {
                args.unshift(e);
                return catcher.apply(this, args)
            }
        }
    })

    /**
     * @desc 执行从左向右的函数组合
     * 
     * 使用Array.reduce()与扩展运算符 (...) 执行从左向右的函数组合。第一个 (最左边的) 函数可以接受一个或多个参数;其余的函数必须是一元的
     */
	$.pipes = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

    /**
     * @desc 转换异步函数以返回一个promise
     */
    $.promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => err ? reject(err) : resolve(result)))
    
    /**
     * @desc 运行一系列的promise
     */
	$.runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve())

    /**
     * @desc sleep 实现 延迟异步函数执行
     */
	$.sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    

    /**
     * @desc   函数节流
     * 适用于限制`resize`和`scroll`等函数的调用频率
     *
     * @param  {Number}    delay          0 或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
     * @param  {Boolean}   noTrailing     可选，默认为false。
     *                                    如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
     *                                    如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
     *                                    （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位）
     * @param  {Function}  callback       延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
     *                                    执行去节流功能时，调用`callback`。
     * @param  {Boolean}   debounceMode   如果`debounceMode`为true，`clear`在`delay`ms后执行。
     *                                    如果debounceMode是false，`callback`在`delay` ms之后执行。
     *
     * @return {Function}  新的节流函数
     */
    $.throttle = function throttle(delay, noTrailing, callback, debounceMode) {
    // After wrapper has stopped being called, this timeout ensures that
    // `callback` is executed at the proper times in `throttle` and `end`
    // debounce modes.
    var timeoutID;
    // Keep track of the last time `callback` was executed.
    var lastExec = 0;
    // `noTrailing` defaults to falsy.
    if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    };
    // The `wrapper` function encapsulates all of the throttling / debouncing
    // functionality and when executed will limit the rate at which `callback`
    // is executed.
    $.wrapper = function wrapper() {
        var self = this;
        var elapsed = Number(new Date()) - lastExec;
        var args = arguments;
        // Execute `callback` and update the `lastExec` timestamp.
        function exec() {
            lastExec = Number(new Date());
            callback.apply(self, args);
        };
        // If `debounceMode` is true (at begin) this is used to clear the flag
        // to allow future `callback` executions.
        function clear() {
            timeoutID = undefined;
        };
        if (debounceMode && !timeoutID) {
            // Since `wrapper` is being called for the first time and
            // `debounceMode` is true (at begin), execute `callback`.
            exec();
        };
        // Clear any existing timeout.
        if (timeoutID) {
            clearTimeout(timeoutID);
        };
        if (debounceMode === undefined && elapsed > delay) {
            // In throttle mode, if `delay` time has been exceeded, execute
            // `callback`.
            exec();
        } else if (noTrailing !== true) {
            // In trailing throttle mode, since `delay` time has not been
            // exceeded, schedule `callback` to execute `delay` ms after most
            // recent execution.
            //
            // If `debounceMode` is true (at begin), schedule `clear` to execute
            // after `delay` ms.
            //
            // If `debounceMode` is false (at end), schedule `callback` to
            // execute after `delay` ms.
            timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
        };
    };
    // Return the wrapper function.
    return wrapper
  }
  
  /**
   * @desc 函数防抖 
   * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
   * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
   * @example 适用场景：如在线编辑的自动存储防抖。
   * @param  {Number}   delay         0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
   * @param  {Boolean}  atBegin       可选，默认为false。
   *                                  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
                                      如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
   * @param  {Function} callback      延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
   *                                  执行去抖动功能时，，调用`callback`。
   *
   * @return {Function} 新的防抖函数。
   */
//   export const debounce = (func, wait, immediate)
  $.debounce = function debounce (delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false)
  }

  // 简单的防抖动函数
  $.debounce_ = (func, wait, immediate) => {
    var timeout, args, context, timestamp, result;
    var _now =
      Date.now ||
      function() {
        return new Date().getTime();
      };
    var later = function() {
      var last = _now() - timestamp;
  
      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          if (!timeout) context = args = null;
        }
      }
    };
  
    return function() {
      context = this;
      args = arguments;
      timestamp = _now();
      var callNow = immediate && !timeout;
      if (!timeout) timeout = setTimeout(later, wait);
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }
  
      return result;
    };
  };
  
})