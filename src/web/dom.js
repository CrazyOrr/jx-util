// /************************************************************************
// 	* DOMs 节点
// 	************************************************************************/
//
// 	// 判断某个节点是否有某个class
// 	hasClass: function(node, className){
// 		if(node.className){
// 			return node.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
// 		}
// 		else{
// 			return false;
// 		}
// 	},
//
// 	// 给节点添加一个class
// 	// addClass: function(node, className){
// 	// 	if(hasClass(node, className)){
// 	// 		node.className += " " + className;
// 	// 	}
// 	// },
//
// 	// JSONToFile: 将 JSON 对象写入文件
// 	// 使用fs.writeFile()、模板文本和JSON.stringify()将json对象写入.json文件
// 	// JSONToFile: (obj, filename) => {
// 	// 	const fs = require("fs");
// 	// 	var o = obj, f = filename;
// 	// 	const _JSONToFile = (_obj, _filename) => fs.writeFile(`${_filename}.json`, JSON.stringify(_obj, null, 2));
// 	// 	return _JSONToFile(o, f);
// 	// },
//
// 	// readFileLines: 返回指定文件中的行的数组
// 	// 在fs节点包中使用readFileSync函数可以从文件创建Buffer。使用toString(encoding)函数将缓冲区转换为字符串。通过spliting 文件内容行从文件内容创建数组 (每个\n).
// 	// const fs = require("fs");
// 	// const readFileLines =  filename => fs.readFileSync(filename).toString("UTF8").split("\n");
// 	/*
// 	contents of test.txt :
// 	  line1
// 	  line2
// 	  line3
// 	  ___________________________
// 	let arr = readFileLines('test.txt')
// 	console.log(arr) // -> ['line1', 'line2', 'line3']
// 	*/
