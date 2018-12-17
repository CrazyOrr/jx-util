var Stack = function () {};

var _class = Stack;
var _inst = Stack.prototype;

_inst.init = function (max=100) {
  this.__max__ = max;
  this.stack = new Array(this.__max__);
  this.top = -1;
  return this.stack;
}

_inst.empty = function () {
  if( this.top == -1) {
    return true;
  } else {
    return false;
  }
}

_inst.push = function (ele) {
  if(this.top == this.__max__-1) {
    return "Stack full";
  } else {
    this.top++;
    this.stack[this.top] = ele;
  }
}

_inst.pop = function() {
  if (this.top == -1) {
    return "Stack empty";
  } else {
    var x = this.stack[this.top];
    this.top--;
    return x;
  }
}

_inst.top = function () {
  if (this.top != -1) {
    return this.stack[this.top];
  } else {
    return "Stack empty";
  }
}

_inst.clear = function () {
  this.top = -1;
  this.stack = new Array(this.__max__); // release ref
}

_inst.length = function () {
  return this.top+1;
}

module.exports = Stack