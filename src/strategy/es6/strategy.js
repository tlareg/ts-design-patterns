class Context {
  setStrategy(strategy) {
    this.strategy = strategy;
    return this;
  }

  runAlgorithm() {
    this.strategy.runAlgorithm();
    return this;
  }
}

class FirstStrategy {
  runAlgorithm() {
    console.log('First strategy algorithm');
  }
}

class SecondStrategy {
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