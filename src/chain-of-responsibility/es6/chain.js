class Handler {
  constructor() {
    this.nextHandler = null;
  }

  setNextHandler(nextHandler) {
    this.nextHandler = nextHandler;
  }

  handle(request) {
    if (this.shouldHandleRequest(request)) {
      this.onHandle(request);
    } else if (this.nextHandler) {
      this.nextHandler.handle(request);
    }
  }

  shouldHandleRequest() {}
  onHandle() {}
}

class HandlerA extends Handler {
  shouldHandleRequest(request) {
    return request.type === 'typeA'
  }

  onHandle(request) {
    console.log(`Request ${request.type} handled by HandlerA`);
  }
}

class HandlerB extends Handler {
  shouldHandleRequest(request) {
    return request.type === 'typeB'
  }

  onHandle(request) {
    console.log(`Request ${request.type} handled by HandlerB`);
  }
}

class HandlerC extends Handler {
  shouldHandleRequest(request) {
    return request.type === 'typeC'
  }

  onHandle(request) {
    console.log(`Request ${request.type} handled by HandlerC`);
  }
}

class Request {
  constructor(type) {
    this.type = type;
  }
}

function runExample() {
  const a = new HandlerA();
  const b = new HandlerB();
  const c = new HandlerC();

  b.setNextHandler(a);
  c.setNextHandler(b);

  c.handle(new Request('typeA'));
  c.handle(new Request('typeB'));
  c.handle(new Request('typeC'));
}

runExample();