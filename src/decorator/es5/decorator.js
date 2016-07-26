function Component(name) {
  this.name = name;
}

Component.prototype.introduce = function() {
  return 'Hi! I\'m ' + this.name;
}

function Decorator(component) {
  this.component = component;
}

Decorator.prototype.introduce = function() {
  return this.component.introduce() + 'I\'m decorated.';
}

function runExample() {
  function introduceComponent(c) {
    console.log(c.introduce());
  }

  var component = new Component('Component');
  var decoratedComponent = new Decorator(component);

  introduceComponent(component);
  introduceComponent(decoratedComponent);
}

runExample();