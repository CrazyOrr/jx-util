module.exports = (function ( f ){
	var $ = f.math = f.Math = {}

	// generateRandom: 产生两个参数之间的随机数
	$.generateRandom = (lowerValue, upperValue) => {
		var chioces = upperValue - lowerValue + 1;
		return Math.floor(Math.random() * chioces + lowerValue);
	},

	// collatz: 实现collatz算法
	// 如果n是偶数, 则返回n/2。否则返回3n+1
	$.collatz = n => (n % 2 == 0) ? (n / 2) : (3 * n + 1),

	// digitize: 将数字转换为数字数组
	// 将数字转换为字符串, 在 ES6 ([...string]) 中使用扩展运算符生成数组。使用Array.map()和parseInt()将每个值转换为整数
	$.digitize = n => [...""+n].map(i => parseInt(i)),

	// distance 返回两点之间的距离
	// 使用Math.hypot()计算两个点之间的欧氏距离
	$.distance = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0),

	// fibonacci: 返回从0开始的长度为n的斐波那契数列
	// 创建一个指定长度的空数组, 初始化前两个值 (0和1)。使用Array.reduce()可将值添加到数组中, 方法是使用前两个值的总和, 但前两个数值除外。
	$.fibonacci = n => Array(n).fill(0).reduce((acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i), [])

	// gcd: 计算最大公约数
	// 使用递归。基本情况是当y等于0时。在这种情况下, 返回x。否则, 返回y的 GCD 和除法的其余部分x/y
	$.gcd = (a, b) => { 
		let x = a, y = b; 
		_gcd = (_x, _y) => !_y ? _x : _gcd(_y, _x % _y);
		return _gcd(a, b);
	}

	// hammingDistance: 计算两个值之间的汉明距离
	// 使用 XOR 运算符 (^) 可查找两个数字之间的位差, 使用toString(2)转换为二进制字符串。使用match(/1/g)计算并返回字符串中1的数目。
	$.hammingDistance = (num1, num2) => ((num1 ^ num2).toString(2).match(/1/g) || "").length

	// isDivisible: 检查第一个数值参数是否可被另一个数字变量整除
	// 使用模数运算符 (%) 检查余数是否等于0
	$.isDivisible = (dividend, divisor) => dividend % divisor === 0

	// isEven: 如果给定的数字为偶数, 则返回true, 否则为false
	$.isEven = num => num % 2 === 0

	// lcm：最小公倍数
	// 结合最大公约数以及Math.abs()来确定最小公约数
	$.lcm = (x, y) => {
		const gcd = (x, y) => !y ? x : gcd(y, x%y);
		return Math.abs(x * y) / (gcd(x, y));
	}

	// median: 返回数组的中间
	// 返回数组的中间，使用Array.sort()来对值进行排序，若length为奇数返回中间的数，若为偶数，返回中间两个值的平均值
	$.median = arr => {
		const mid = Math.floor(arr.length / 2), nums = arr.sort((a, b) => a - b);
		return arr.length % 2 !== 0 ? nums[mid] : (nums[mid-1] + nums[mid]) / 2;
	}

	// palindrome: 如果给定字符串为回文, 则返回true, 否则为false
	// 转换字符串toLowerCase()并使用replace()从其中删除非字母数字字符。然后,split('')到各个字符,reverse(),join(''), 并将其与原始的、不可逆转的字符串进行比较, 然后将其转换为tolowerCase().
	$.palindrome = str => {
		const s = str.toLowerCase().replace(/[\W]/g, "");
		return s === s.split("").reverse().join("");
	}

	// percentile: 使用百分比公式计算给定数组中有多少个数小于或等于给定值
	$.percentile = (arr, val) => 100 * arr.reduce((acc ,v) => acc + (v < val ? 1 : 0) + (v === val ? 0.5 : 0), 0) / arr.length

	// powerset: 返回给定数组的真子集
	// 使用Array.reduce()与Array.map()组合, 以循环访问元素并将其合并到包含所有组合的数组中
	$.powerset = arr => arr.reduce((a, v) => a.concat(a.map(r => [v].concat(r))), [[]])

	// randomIntegerInRange: 返回指定范围内的随机整数
	// 使用Math.random()生成一个随机数并将其映射到所需的范围, 使用Math.floor()使其成为整数
	$.randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

	// randomNumberInRange: 返回指定范围内的随机数
	// 使用Math.random()生成随机值, 并使用乘法将其映射到所需的范围
	$.randomNumberInRange = (min, max) => Math.random() * (max - min) + min

	// round: 将数字四舍五入到指定的位数
	// 使用Math.round()和模板文本将数字舍入到指定的位数。省略第二个参数,decimals舍入为整数
	$.round = (n, decimals=0) => Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
})