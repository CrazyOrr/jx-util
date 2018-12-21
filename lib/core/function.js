
// @knowledge arguments
// arguments: An array-like object containing the arguments passed to the currently executing function.
// arguments.callee : The currently executing function.
// arguments.caller  : The function that invoked the currently executing function.
// arguments.length: The number of arguments passed to the function.

module.exports = (function ( f ) {
	var $ = f.function = f.fn = {}

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

    /**
     * 对象方法调用
     */
    $.perform = function ( ctx, fnOrName ) {
        var slice = Array.prototype.slice

        if (f.is.string(fnOrName)) {
            if ( !ctx || !f.is.function( ctx[fnOrName] )) {
                throw new TypeError(`ctx[fnOrName] must be a function, ${ctx}, ${fnOrName}`)
            }
    
            return ctx[fnOrName].apply(ctx, slice.call( arguments, 2 ))
        } else if (f.is.function(fnOrName)) {
            if ( !ctx ) {
                throw new TypeError(`ctx must be nonull, ${ctx}`)
            }

            return fnOrName.apply(ctx, slice.call( arguments, 2 ))
            
        }
        
        throw new Error(`参数错误, ctx = ${ctx}, fnOrName = ${fnOrName}`)
    }
    
	// fn that returns a value
	$.return = function ( value ) { return function () { return value } }
	$.falsify = $.return( false )
	$.truthify = $.return( true )
	$.nullify = $.return( null )
    $.undefinify = $.return( undefined )
    /**
     *      var t = always('Tee');
     *      t(); //=> 'Tee'
     */
    $.always = x => () => x

	// $ that returns parameters names
	// Based on @Jack Allan's response at stackoverflow.com
	// http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
	$.args = (function () {
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

    $.argsly = function (args) {
        // 虽然arguments对象不是一个真正的javascript数组，但是我们还是可以轻易的把它转换成标准的数据 ，然后进行数组操作。
        return Array.prototype.slice.call(arguments)
    }

    /**
     * @desc 链异步函数
     */
	$.chain = fns => {
        let curr = 0
        const next = () => fns[curr++](next)
        next()
    }

    /**
     * @desc 执行从右向左的函数组合
     * @notice 最右边的函数可以接受一个或多个参数，其余的函数必须是一元的
     * 
     * “把函数 f(), g(), 和 h() 组合起来得到复合函数 f(g(h()))”
     * 
     * @example
     * 
     *      [f(), g(), h()] => 复合函数 f(g(h()))
     * 
     *      var greet = function (name) { return 'hi:' + name }
     *      var exclaim = function (statement) { return statement.toUpperCase() + '!' }
     *      var transform = function (str) { return str.replace(/[dD]/, 'DDDDD') }
     *      var welcome1 = compose(greet, exclaim, transform)
     *      console.log(welcome1('dot'))//hi:DDDDDOT!
     */
    $.compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)))
    $.compose_ = function () {
        var fns = [].slice.call(arguments)
        return function (initialArg) {
            var res = initialArg
            for (var i = fns.length - 1; i > -1; i--) {
                res = fns[i](res)
            }
            return res
        }
    }
    
    /**
     * @desc 函数柯里化
     */
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

    // 
    /**
     * @desc 判定函数，全部通过
     * @param {Array} fns predicates
     * @param {...*} args passed arguments to predicates
     * @return {Function}
     * 
     * @example
     * 
     *      var isQueen = propEq('rank', 'Q');
     *      var isSpade = propEq('suit', '♠︎');
     *      var isQueenOfSpades = allPass([isQueen, isSpade]);
     *
     *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
     *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
     */
    $.allPass = f.function.curryN(2, (fns, ...args) => {
        for (let i = 0; i < fns.length; i++) {
            if (!fns[i](...args)) {
                return false;
            }
        }
    
        return true;
    })

    /**
     * @desc 判定函数，任意一个通过
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
     * @example
     * 
     *      var greet = function (name) { return 'hi:' + name }
     *      var exclaim = function (statement) { return statement.toUpperCase() + '!' }
     *      var transform = function (str) { return str.replace(/[dD]/, 'DDDDD') }
     *      var welcome2 = pipe(greet, exclaim, transform)
     * 
     *      console.log(welcome2('dolb'))//HI:DDDDDOLB!
     */
    $.pipes = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))
    $.pipes_ = function () {
        var fns = [].slice.call(arguments)
        return function (initialAgr) {
            var res = initialAgr
            for (var i = 0; i < fns.length; i++) {
                res = fns[i](res)
            }
            return res
        }
    }

    /**
     * @desc 转换异步
     */
    $.promisify = func => (...args) => new Promise((resolve, reject) => func(...args, (err, result) => err ? reject(err) : resolve(result)))
    
    /**
     * @desc 异步串行
     */
	$.runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve())

    /**
     * @desc 延迟异步执行
     */
	$.sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    /**
     * @desc   函数节流
     * 
     * 调用次数不少，但控制间隔
     * 
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
        var timeoutID
        // Keep track of the last time `callback` was executed.
        var lastExec = 0
        // `noTrailing` defaults to falsy.
        if (typeof noTrailing !== 'boolean') {
            debounceMode = callback
            callback = noTrailing
            noTrailing = undefined
        };
        // The `wrapper` function encapsulates all of the throttling / debouncing
        // functionality and when executed will limit the rate at which `callback`
        // is executed.
        function wrapper() {
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
   * 
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
    return callback === undefined ? f.function.throttle(delay, atBegin, false) : f.function.throttle(delay, callback, atBegin !== false)
  }

  /**
     * @example
     *
     *      var defaultTo42 = defaultTo(42);
     *
     *      defaultTo42(null);  //=> 42
     *      defaultTo42(undefined);  //=> 42
     *      defaultTo42('Example');  //=> 'Example'
     *      defaultTo42(parseInt('string')); //=> 42
     */
  $.default = f.function.curryN(2, (dflt, x) => {
    if (x == null || x !== x) { // eslint-disable-line no-self-compare
      return dflt
    }

    return x
  })

  /**
   * @desc 函数创建
   * @notice function是用于声明函数时用的，而Function是 constructor
   * @inner new Function (arg1, arg2, ... argN, functionBody)
   */
  $.factory = function () {

  }

  /**
   * 
   */
  $.awaitAll = async function (...fnArr) {
    if ({}.toString.call(fnArr[0]) === '[object Array]') {
      fnArr = fnArr[0];
    }
    const fnNum = fnArr.length;
    const promiseArr = [];
    const resultArr = [];
    for (let i = 0; i < fnNum; i++) {
      promiseArr.push(fnArr[i]());
    }
    for (let i = 0; i < fnNum; i++) {
      resultArr.push(await promiseArr[i])
    }
    return resultArr;
  }

  /**
   * 并发等待
   */
  $.awaitAlly = () => Promise.all(Array.prototype.slice.call(arguments));

})