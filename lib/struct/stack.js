var Stack = function () {
  // https://segmentfault.com/a/1190000002608050
  // Number.MAX_SAFE_INTEGER; Number.MIN_SAFE_INTEGER;
  this.__max__ = Number.MAX_SAFE_INTEGER;
  this.stack = new Array();
  this.csr = -1; // cursor
};

var _class = Stack;
var _inst = Stack.prototype;

_inst.init = function (max=100) {
  this.__max__ = max;
  this.stack = new Array(this.__max__);
  this.csr = -1; // cursor
  return this.stack;
}

_inst.empty = function () {
  if( this.csr == -1) {
    return true;
  } else {
    return false;
  }
}

_inst.push = function (ele) {
  if(this.csr == this.__max__-1) {
    return "Stack full";
  } else {
    this.csr++;
    this.stack[this.csr] = ele;
  }
}

_inst.pop = function() {
  if (this.csr == -1) {
    return "Stack empty";
  } else {
    var x = this.stack[this.csr];
    this.csr--;
    return x;
  }
}

_inst.top = function () {
  if (this.csr != -1) {
    return this.stack[this.csr];
  } else {
    return "Stack empty";
  }
}

_inst.clear = function () {
  this.csr = -1;
  this.stack = new Array(this.__max__); // release ref
}

_inst.length = function () {
  return this.csr+1;
}

_inst.desc = function () {
  if (! this.stack) return 'empty'
  
  return this.stack.join(',')
}

module.exports = Stack