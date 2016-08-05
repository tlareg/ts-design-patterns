class EventEmitter {
  constructor() {
    this.handlers = {};
  }

  on(eventName, handler) {
    const eventHandlers = this.handlers[eventName] || (this.handlers[eventName] = []);
    eventHandlers.push(handler);
    return () => this.off(eventName, handler);
  }

  off(eventName, handler) {
    const eventHandlers = this.handlers[eventName];
    if (!eventHandlers || !eventHandlers.length) return;
    const idx = eventHandlers.indexOf(handler);
    if (idx < 0) return;
    eventHandlers.splice(idx, 1);
  }

  emit(eventName, eventArgs = []) {
    if (!Array.isArray(eventArgs)) eventArgs = [eventArgs];
    const eventHandlers = this.handlers[eventName];
    if (!eventHandlers || !eventHandlers.length) return;
    eventHandlers.forEach(h => h(...eventArgs));
  }
}

class ConcreteSubject extends EventEmitter {
  set state(newState) {
    this._state = newState;
    this.emit('stateChange', this._state);
  }

  get state() {
    return this._state || (this._state = '');
  }
}

class ConcreteObserver {
  constructor(name) {
    this.name = name;
  }

  update(newSubjectState) {
    console.log(`From ${this.name}, subject state is: ${newSubjectState}`);
  }
}

function runExample() {
  const subject = new ConcreteSubject();

  const observer1 = new ConcreteObserver('observer1');
  const observer2 = new ConcreteObserver('observer2');
  const observer3 = new ConcreteObserver('observer3');

  const offObserver1Handler = subject.on('stateChange', observer1.update.bind(observer1));
  const offObserver2Handler = subject.on('stateChange', observer2.update.bind(observer2));
  const offObserver3Handler = subject.on('stateChange', observer3.update.bind(observer3));

  subject.state = 'first_state';
  offObserver2Handler();
  subject.state = 'second_state';
}

runExample();