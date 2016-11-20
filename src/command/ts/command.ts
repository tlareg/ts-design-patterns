class Invoker {
  private commands: ICommand[]

  constructor() {
    this.commands = [];
  }

  addCommand(newCommand: ICommand) {
    this.commands = [...this.commands, newCommand]
  }

  invoke() {
    this.commands.forEach(c => c.execute());
  }
}

class Receiver {
  actionA(param: string) {
    console.log(`Action A with param ${param}`);
  }

  actionB(param: string) {
    console.log(`Action B with param ${param}`);
  }
}

interface ICommand {
  execute()
}

class CommandA implements ICommand {
  private receiver: Receiver;
  private param1: string;

  constructor(receiver, param1: string) {
    this.receiver = receiver;
    this.param1 = param1;
  }

  execute() {
    this.receiver.actionA(this.param1);
  }
}

class CommandB implements ICommand {
  private receiver: Receiver;
  private param2: string;

  constructor(receiver, param2: string) {
    this.receiver = receiver;
    this.param2 = param2;
  }

  execute() {
    this.receiver.actionB(this.param2);
  }
}

function runExample() {
  const invoker: Invoker = new Invoker();
  const receiver: Receiver = new Receiver();

  invoker.addCommand(new CommandA(receiver, 'AAA'));
  invoker.addCommand(new CommandB(receiver, 'BBB'));
  invoker.addCommand(new CommandA(receiver, 'CCC'));

  invoker.invoke();
}

runExample();