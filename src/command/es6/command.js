class Invoker {
  constructor() {
    this.commands = [];
  }

  addCommand(newCommand) {
    this.commands = [...this.commands, newCommand]
  }

  invoke() {
    this.commands.forEach(c => c.execute());
  }
}

class Receiver {
  actionA(param) {
    console.log(`Action A with param ${param}`);
  }

  actionB(param) {
    console.log(`Action B with param ${param}`);
  }
}

class Command {
  constructor(receiver) {
    this.receiver = receiver;
  }

  execute() {}
}

class CommandA extends Command {
  constructor(receiver, param1) {
    super(receiver);
    this.param1 = param1;
  }

  execute() {
    this.receiver.actionA(this.param1);
  }
}

class CommandB extends Command {
  constructor(receiver, param2) {
    super(receiver);
    this.param2 = param2;
  }

  execute() {
    this.receiver.actionB(this.param2);
  }
}

function runExample() {
  const invoker = new Invoker();
  const receiver = new Receiver();

  invoker.addCommand(new CommandA(receiver, 'AAA'));
  invoker.addCommand(new CommandB(receiver, 'BBB'));
  invoker.addCommand(new CommandA(receiver, 'CCC'));

  invoker.invoke();
}

runExample();