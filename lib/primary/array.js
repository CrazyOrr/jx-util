
    
/**
 * @desc 遍历数组中的元素
 * @param fun 回调函数
 */
Array.prototype.each = function ( funt ) {
	for ( var i = 0, n = this.length; i < n; i++) {
		funt( i, this[i]);	
	}
}


//Array类的克隆函数
Array.prototype.clone=function(){
  var o=[];
  this.each(  function(k,v){
    o[k]=v;	
  });
  return o;
}

//Array类的map函数
Array.prototype.map=function(   fun  ){
var o=[];
this.each(   function( k,v){
  o[k]=fun( k,v );	
} );
return o;
}
//Array类的del函数：在ie中delete是保留字，所以用del做函数名
Array.prototype.del=function(  a  ){
var o=this.clone();
for( var i=o.length,n=0;i>n;i--){
  if( o[i]==a ){
    o.splice(i,1 );
  }	
}
return o;
}
//当然，也可以重写Array类原有的toString()方法，
Array.prototype.toString=function(){
var str="";
this.each(   function(k, v){
  str+=k+":"+ v+",";
}    );
return str;