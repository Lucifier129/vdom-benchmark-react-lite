'use strict';

var benchmark = require('vdom-benchmark-base');
var React = require('react/lib/React');
var createElement = React.createElement;

var NAME = 'React';
var VERSION = '0.13.1';

function renderTree(nodes) {
  var children = [];
  var i;
  var e;
  var n;

  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    if (n.children !== null) {
      children.push(createElement('div', {key: n.key}, renderTree(n.children)));
    } else {
      children.push(createElement('span', {key: n.key}, n.key.toString()));
    }
  }

  return children;
}

function BenchmarkImpl(container, a, b) {
  this.container = container;
  this.a = a;
  this.b = b;
}

BenchmarkImpl.prototype.setUp = function() {
};

BenchmarkImpl.prototype.tearDown = function() {
  React.unmountComponentAtNode(this.container);
};

BenchmarkImpl.prototype.render = function() {
  React.render(createElement('div', null, renderTree(this.a)), this.container);
};

BenchmarkImpl.prototype.update = function() {
  React.render(createElement('div', null, renderTree(this.b)), this.container);
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
