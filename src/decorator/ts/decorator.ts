interface ComponentInterface {
  introduce(): string;
}

class Component implements ComponentInterface {
  private name: string;

  constructor(name) {
    this.name = name;
  }

  introduce() {
    return `Hi! I'm ${this.name}`;
  }
}

class Decorator implements ComponentInterface {
  private component: ComponentInterface;

  constructor(component: ComponentInterface) {
    this.component = component;
  }

  introduce(): string {
    return `${this.component.introduce()}. I'm decorated.`;
  }
}

function runExample() {
  const introduceComponent = (c: ComponentInterface) => console.log(c.introduce());

  const component = new Component('Component');
  const decoratedComponent = new Decorator(component);

  introduceComponent(component);
  introduceComponent(decoratedComponent);
}

runExample();