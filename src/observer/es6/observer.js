class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
    return this;
  }

  removeObserver(observer) {
    const idx = this.observers.indexOf(observer);
    if (idx < 0) return;
    this.observers.splice(idx, 1);
    return this;
  }

  notify() {
    this.observers.forEach(o => o.update(this));
  }
}

class ConcreteSubject extends Subject {
  set state(newState) {
    this._state = newState;
    this.notify();
  }

  get state() {
    return this._state || (this._state = '');
  }
}

class Observer {
  update(subject) {}
}

class ConcreteObserver extends Observer {
  constructor(name) {
    super();
    this.name = name;
  }

  update(subject) {
    console.log(`From ${this.name}, subject state is: ${subject.state}`);
  }
}

function runExample() {
  const subject = new ConcreteSubject();

  const observer1 = new ConcreteObserver('observer1');
  const observer2 = new ConcreteObserver('observer2');
  const observer3 = new ConcreteObserver('observer3');

  subject
    .addObserver(observer1)
    .addObserver(observer2)
    .addObserver(observer3);

  subject.state = 'first_state';

  subject.removeObserver(observer2);

  subject.state = 'second_state';
}

runExample();