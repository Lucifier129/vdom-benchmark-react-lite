var benchmark = require('vdom-benchmark-base');
import React from 'react';
import ReactDOM from 'react-dom';

var NAME = 'React';
var VERSION = '0.14.6';

function renderTree(nodes) {
  var children = [];

  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    if (n.children !== null) {
      children.push((<div key={n.key}>{renderTree(n.children)}</div>));
    } else {
      children.push((<span key={n.key}>{n.key}</span>));
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
  ReactDOM.render(<div>{renderTree(this.a)}</div>, this.container);
};

BenchmarkImpl.prototype.update = function() {
  ReactDOM.render(<div>{renderTree(this.b)}</div>, this.container);
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
