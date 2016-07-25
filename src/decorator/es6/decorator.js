class Component {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `Hi! I'm ${this.name}`;
  }
}

class Decorator {
  constructor(component) {
    this.component = component;
  }

  introduce() {
    return `${this.component.introduce()}. I'm decorated.`;
  }
}

function runExample() {
  const introduceComponent = c => console.log(c.introduce());

  const component = new Component('Component');
  const decoratedComponent = new Decorator(component);

  introduceComponent(component);
  introduceComponent(decoratedComponent);
}

runExample();