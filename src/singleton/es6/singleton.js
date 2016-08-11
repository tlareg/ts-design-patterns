
const Singleton = (function() {
  let instance;

  return class _Singleton {
    constructor() {
      if (!instance) {
        instance = this;
        this.name = 'Singleton 1';
        this.timestamp = Date.now();
      }
      return instance;
    }

    introduce() {
      console.log(`hello, I'm ${this.name}, my creation timestamp is ${this.timestamp}`);
    }

    static getInstance() {
      return new _Singleton();
    }
  };
})();


function runExample() {
  const singleton1 = new Singleton();
  singleton1.introduce();

  setTimeout(() => {
    const singleton2 = new Singleton();
    singleton2.introduce();
  }, 1000);

  setTimeout(() => {
    const singleton3 = Singleton.getInstance();
    singleton3.introduce();
  }, 1000);
 
}

runExample();