interface IStrategy {
  runAlgorithm()
}

class Context {
  private strategy: IStrategy;

  setStrategy(strategy): Context {
    this.strategy = strategy;
    return this;
  }

  runAlgorithm(): Context {
    this.strategy.runAlgorithm();
    return this;
  }
}

class FirstStrategy implements IStrategy {
  runAlgorithm() {
    console.log('First strategy algorithm');
  }
}

class SecondStrategy implements IStrategy {
  runAlgorithm() {
    console.log('Second strategy algorithm');
  }
}

function runExample() {
  return new Context()
    .setStrategy(new FirstStrategy())
    .runAlgorithm()
    .setStrategy(new SecondStrategy())
    .runAlgorithm();
}

runExample();