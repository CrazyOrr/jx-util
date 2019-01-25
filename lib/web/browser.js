// /************************************************************************
// 	* browser浏览器
// 	************************************************************************/
//
// 	// bottomVisible: 如果页的底部可见, 则返回true, 否则为false
// 	// 使用scrollY、scrollHeight和clientHeight来确定页面底部是否可见。
// 	bottomVisible: () => document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight || document.documentElement.clientHeight,
//
// 	// currentURL: 返回当前 URL
// 	// 使用window.location.href获取当前 URL
// 	currentURL: () => window.location.href,
//
// 	// elementIsVisibleInViewport： 如果指定的元素在视区中可见, 则返回true, 否则为false
// 	// 使用Element.getBoundingClientRect()和window.inner(Width|Height)值以确定给定元素在视区中是否可见。省略第二个参数以确定该元素是否完全可见, 或指定true以确定它是否部分可见
// 	elementIsVisibleInViewport: (el, partiallyVisible = false) => {
// 		const {top, left, bottom, right} = el.getBoundingClientRect();
// 		return partiallyVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
// 	},
//
// 	// getScrollPosition: 返回当前页的滚动位置
// 	// 如果已定义, 则使用pageXOffset和pageYOffset, 否则scrollLeft和scrollTop。可以省略el以使用window的默认值
// 	getScrollPosition: (el = window) => ({x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft, y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop}),
//
// 	// getURLParameters: 返回一个包含当前 URL 参数的对象
// 	// 使用match()与适当的正则表达式来获取所有键值对,Array.reduce()可将它们映射并合并到单个对象中。将location.search作为要应用于当前url的参数传递
// 	getURLParameters: url => url.match(/([^?=&]+)(=([^&]*))/g).reduce( (a, v) => (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1), a), {}),
//
// 	// redirect: 重定向到指定的 URL
// 	// 使用window.location.href或window.location.replace()重定向到url。传递第二个参数以模拟链接单击 (true-默认值) 或 HTTP 重定向 (false)
// 	redirect: (url, asLink = true) => asLink ? window.location.href = url : window.location.replace(url),
//
// 	// scrollToTop: 平滑滚动到页面顶部
// 	// 使用document.documentElement.scrollTop或document.body.scrollTop从顶部获取距离。从顶部的距离的一小部分滚动。使用window.requestAnimationFrame()对滚动进行动画处理
// 	scrolllToTop: () => {
// 		const c = document.documentElement.scrollTop || document.body.scrollTop;
// 		if(c > 0){
// 			window.requestAnimationFrame(scrollToTop);
// 			window.scrollTo(0, c - c/8);
// 		}
// 	},
"use strict";