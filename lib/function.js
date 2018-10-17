module.exports = (function ( f ) {
	var $ = f.Function = f.function = {}

	// is and isnt
	$.is = f.is.Function
	$.isnt = f.isnt.Function

	// Function to be called with a given context
	$.bind = function ( fn, context ) {
		var slice = Array.prototype.slice;

		if ( fn.bind ) {
			return fn.bind.apply( fn, slice.call( arguments, 1 ) )
		}

		var args = slice.call(arguments, 2)

		return function () {
			return fn.apply( context, args.length ? args.concat(slice.call(arguments)) : arguments )
		}
	}

	// $ that logs all arguments passed to it
	$.debug = function () { console.log( arguments ) }

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
	$.chainAsync = fns => {let curr = 0; const next = () => fns[curr++](next); next();},

	// compose: 执行从右向左的函数组合
	// 使用Array.reduce()执行从右向左的函数组合。最后一个 (最右边) 的函数可以接受一个或多个参数;其余的函数必须是一元的。
	$.compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args))),

	// curry: 函数柯里化
	// curry()函数的主要作用是对被返回函数的参数进行排序，柯里化函数通过以下步骤动态创建：调用另一个函数并为它传入要柯里化的函数和必要参数，下面是创建柯里化函数的通用方式
	$.curry = function(fn){
		var args = Array.prototype.slice.call(arguments, 1);
		return function(){
			var innerArgs = Array.prototype.slice.call(arguments);
			var finalArgs = args.concat(innerArgs);
			return fn.apply(null, finalArgs);
		}
	}

	// functionName: 记录函数的名称
	// 使用console.debug()和传递的方法的name属性将方法的名称记录到控制台的debug通道中。
	$.functionName = fn => (console.debug(fn, name), fn)

	// pipeFunctions: 执行从左向右的函数组合
	// 使用Array.reduce()与扩展运算符 (...) 执行从左向右的函数组合。第一个 (最左边的) 函数可以接受一个或多个参数;其余的函数必须是一元的
	$.pipeFunctions = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

	// promisify: 转换异步函数以返回一个promise
	// 使用讨好返回一个返回调用原始函数的Promise的函数。使用...rest运算符传入所有参数。 在节点 8 + 中, 可以使用 util.promisify
	$.promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => err ? reject(err) : resolve(result)))

	// runPromisesInSeries: 运行一系列的promise
	// 使用Array.reduce()创建一个promise链, 每个promise在解决时返回下一个promise
	$.runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve())

	// sleep: 延迟异步函数的执行
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
  $.debounce = function debounce (delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false)
  }
  
})