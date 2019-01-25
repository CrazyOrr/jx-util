'use strict';

module.exports = function (f) {
    var _this = this,
        _arguments = arguments;

    var $ = f.function = f.fn = {};

    /**
     * @desc 函数 上下文绑定
     */
    $.bind = function (fn, context) {
        var slice = Array.prototype.slice;

        if (fn.bind) {
            return fn.bind.apply(fn, slice.call(arguments, 1));
        }

        var args = slice.call(arguments, 2);

        return function () {
            return fn.apply(context, args.length ? args.concat(slice.call(arguments)) : arguments);
        };
    };

    /**
     * 对象方法调用
     */
    $.perform = function (ctx, fnOrName) {
        var slice = Array.prototype.slice;

        if (f.is.string(fnOrName)) {
            if (!ctx || !f.is.function(ctx[fnOrName])) {
                throw new TypeError('ctx[fnOrName] must be a function, ' + ctx + ', ' + fnOrName);
            }

            return ctx[fnOrName].apply(ctx, slice.call(arguments, 2));
        } else if (f.is.function(fnOrName)) {
            if (!ctx) {
                throw new TypeError('ctx must be nonull, ' + ctx);
            }

            return fnOrName.apply(ctx, slice.call(arguments, 2));
        }

        throw new Error('\u53C2\u6570\u9519\u8BEF, ctx = ' + ctx + ', fnOrName = ' + fnOrName);
    };

    // fn that returns a value
    $.return = function (value) {
        return function () {
            return value;
        };
    };
    $.falsify = $.return(false);
    $.truthify = $.return(true);
    $.nullify = $.return(null);
    $.undefinify = $.return(undefined);

    /**
     *      var t = always('Tee');
     *      t(); //=> 'Tee'
     */
    $.always = function (x) {
        return function () {
            return x;
        };
    };

    // $ that returns parameters names

    // Based on @Jack Allan's response at stackoverflow.com
    // 
    /**
     * @knowledge http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript
     * @example 
     *      args(function (a,b,c,d){}) // returns returns ['a','b','c','d']
     */
    $.argNames = function (func) {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        var fnStr = func.toString().replace(STRIP_COMMENTS, '');
        var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
        if (result === null) result = [];

        return result;
    };

    $.name = function (func) {
        return (func + '').replace(/[/][/].*$/mg, '') // strip single-line comments
        .replace(/\s+/g, '') // strip white space
        .replace(/[/][*][^/*]*[*][/]/g, '') // strip multi-line comments
        .split('){', 1)[0] // strip func body
        .split('(', 1)[0] // strip func name (with keyword function)
        .replace('function', ''); // strip keyword function
    };

    $.argValues = function (args) {
        return Array.prototype.slice.call(args);
    };

    /**
     * @desc 链异步函数
     */
    $.chain = function (fns) {
        var curr = 0;
        var next = function next() {
            return fns[curr++](next);
        };
        next();
    };

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
    $.compose = function () {
        for (var _len = arguments.length, fns = Array(_len), _key = 0; _key < _len; _key++) {
            fns[_key] = arguments[_key];
        }

        return fns.reduce(function (f, g) {
            return function () {
                return f(g.apply(undefined, arguments));
            };
        });
    };
    $.compose_ = function () {
        var fns = [].slice.call(arguments);
        return function (initialArg) {
            var res = initialArg;
            for (var i = fns.length - 1; i > -1; i--) {
                res = fns[i](res);
            }
            return res;
        };
    };

    /**
     * @desc 函数柯里化
     */
    $.curry = function (fn) {
        return f.function.curryN(fn.length, fn);
    };

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
    $.curryN = function (arity, fn) {
        return function curried() {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            if (args.length >= arity) {
                return fn.apply(this, args);
            }

            return function () {
                for (var _len3 = arguments.length, newArgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                    newArgs[_key3] = arguments[_key3];
                }

                return curried.apply(this, args.concat(newArgs));
            };
        };
    };

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
    $.allPass = f.function.curryN(2, function (fns) {
        for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
        }

        for (var i = 0; i < fns.length; i++) {
            if (!fns[i].apply(fns, args)) {
                return false;
            }
        }

        return true;
    });

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
    $.anyPass = f.function.curryN(2, function (fns) {
        for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
            args[_key5 - 1] = arguments[_key5];
        }

        for (var i = 0; i < fns.length; i++) {
            if (fns[i].apply(fns, args)) {
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
    $.tryCatch = f.function.curryN(2, function (tryer, catcher) {
        return function () {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            try {
                return tryer.apply(_this, args);
            } catch (e) {
                args.unshift(e);
                return catcher.apply(_this, args);
            }
        };
    });

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
    $.pipes = function () {
        for (var _len7 = arguments.length, fns = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            fns[_key7] = arguments[_key7];
        }

        return fns.reduce(function (f, g) {
            return function () {
                return g(f.apply(undefined, arguments));
            };
        });
    };
    $.pipes_ = function () {
        var fns = [].slice.call(arguments);
        return function (initialAgr) {
            var res = initialAgr;
            for (var i = 0; i < fns.length; i++) {
                res = fns[i](res);
            }
            return res;
        };
    };

    /**
     * @desc 转换异步
     */
    $.promisify = function (func) {
        return function () {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            return new Promise(function (resolve, reject) {
                return func.apply(undefined, args.concat([function (err, result) {
                    return err ? reject(err) : resolve(result);
                }]));
            });
        };
    };

    /**
     * @desc 异步串行
     */
    $.runPromisesInSeries = function (ps) {
        return ps.reduce(function (p, next) {
            return p.then(next);
        }, Promise.resolve());
    };

    /**
     * @desc 延迟异步执行
     */
    $.sleep = function (ms) {
        return new Promise(function (resolve) {
            return setTimeout(resolve, ms);
        });
    };

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
        return wrapper;
    };

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
    $.debounce = function debounce(delay, atBegin, callback) {
        return callback === undefined ? f.function.throttle(delay, atBegin, false) : f.function.throttle(delay, callback, atBegin !== false);
    };

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
    $.default = f.function.curryN(2, function (dflt, x) {
        if (x == null || x !== x) {
            // eslint-disable-line no-self-compare
            return dflt;
        }

        return x;
    });

    /**
     * @desc 函数创建
     * @notice function是用于声明函数时用的，而Function是 constructor
     * @inner new Function (arg1, arg2, ... argN, functionBody)
     */
    $.factory = function () {};

    /**
     * 
     */
    $.awaitAll = async function () {
        for (var _len9 = arguments.length, fnArr = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
            fnArr[_key9] = arguments[_key9];
        }

        if ({}.toString.call(fnArr[0]) === '[object Array]') {
            fnArr = fnArr[0];
        }
        var fnNum = fnArr.length;
        var promiseArr = [];
        var resultArr = [];
        for (var i = 0; i < fnNum; i++) {
            promiseArr.push(fnArr[i]());
        }
        for (var _i = 0; _i < fnNum; _i++) {
            resultArr.push((await promiseArr[_i]));
        }
        return resultArr;
    };

    /**
     * 并发等待
     */
    $.awaitAlly = function () {
        return Promise.all(Array.prototype.slice.call(_arguments));
    };

    /**
     * ES7有装饰器，当前使用该方法做切面编程
     * 
     * @example
     *    test.before(startTime).after(endTime)('c');
     * 
     * @param fn
     * @param { arguments of fn } before 's ctx is fn
     * @param { arguments of fn } after 's ctx is fn
     */
    $.aspectify = function (fn) {
        if (!f.is.function(fn)) {
            throw new TypeError('fn must be a function');
        }

        fn.before = function (beforeFn) {
            var __Fn = this; // this == fn

            var beforeClosure = function beforeClosure() {
                f.function.perform(__Fn, beforeFn, arguments);
                return __Fn.apply(this, arguments); // this == fn.scope
            };

            beforeClosure.after = function (afterFn) {
                var __beforeClosure = this;

                return function afterClosure() {
                    var result = __beforeClosure.apply(this, arguments);
                    f.function.perform(__Fn, afterFn, arguments);
                    return result;
                };
            };

            return beforeClosure;
        };

        fn.after = function (afterFn) {
            var __Fn = this;

            var afterClosure = function afterClosure() {
                var result = __Fn.apply(this, arguments);
                f.function.perform(__Fn, afterFn, arguments);
                return result;
            };

            afterClosure.before = function (beforeFn) {
                var __afterClosure = this;
                return function beforeClosure() {
                    f.function.perform(__Fn, beforeFn, arguments);
                    return __afterClosure.apply(this, arguments);
                };
            };

            return afterClosure;
        };

        return fn;
    };
};