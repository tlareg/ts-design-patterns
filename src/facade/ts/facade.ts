class Facade {
  private firstSubSystem: FirstSubSystem;
  private secondSubSystem: SecondSubSystem;

  constructor() {
    this.firstSubSystem = new FirstSubSystem();
    this.secondSubSystem = new SecondSubSystem();
  }

  hello(): string {
    return `
      ${this.firstSubSystem.hello()}, 
      ${this.secondSubSystem.hello()}
    `;
  }
}

class FirstSubSystem {
  hello(): string {
    return 'first hello';
  }
}

class SecondSubSystem {
  hello(): string {
    return 'second hello';
  }
}

function runExample() {
  const facade = new Facade();
  console.log(facade.hello());
}

runExample();