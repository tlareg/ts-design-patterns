class Facade {
  constructor() {
    this.firstSubSystem = new FirstSubSystem();
    this.secondSubSystem = new SecondSubSystem();
  }

  hello() {
    return `
      ${this.firstSubSystem.hello()}, 
      ${this.secondSubSystem.hello()}
    `;
  }
}

class FirstSubSystem {
  hello() {
    return 'first hello';
  }
}

class SecondSubSystem {
  hello() {
    return 'second hello';
  }
}

function runExample() {
  const facade = new Facade();
  console.log(facade.hello());
}

runExample();