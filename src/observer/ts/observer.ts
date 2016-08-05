interface ISubject {
  addObserver(observer: IObserver): ISubject;
  removeObserver(observer: IObserver): ISubject;
  notify();
}

interface IObserver {
  update(subject: ISubject);
}

class Subject implements ISubject {
  private observers: IObserver[];

  constructor() {
    this.observers = [];
  }

  addObserver(observer: IObserver): ISubject {
    this.observers.push(observer);
    return this;
  }

  removeObserver(observer: IObserver): ISubject {
    const idx: number = this.observers.indexOf(observer);
    if (idx < 0) return;
    this.observers.splice(idx, 1);
    return this;
  }

  notify() {
    this.observers.forEach((o: IObserver) => o.update(this));
  }
}

class ConcreteSubject extends Subject {
  private _state: string;

  set state(newState: string) {
    this._state = newState;
    this.notify();
  }

  get state(): string {
    return this._state || (this._state = '');
  }
}

class ConcreteObserver implements IObserver {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(subject: ConcreteSubject) {
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