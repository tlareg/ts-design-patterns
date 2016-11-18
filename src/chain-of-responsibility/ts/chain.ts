class Handler {
  private nextHandler: Handler;

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

  shouldHandleRequest(request: Request): boolean { return false; }
  onHandle(request: Request): void {}
}

class HandlerA extends Handler {
  shouldHandleRequest(request: Request): boolean {
    return request.type === 'typeA'
  }

  onHandle(request: Request): void {
    console.log(`Request ${request.type} handled by HandlerA`);
  }
}

class HandlerB extends Handler {
  shouldHandleRequest(request: Request): boolean {
    return request.type === 'typeB'
  }

  onHandle(request: Request): void {
    console.log(`Request ${request.type} handled by HandlerB`);
  }
}

class HandlerC extends Handler {
  shouldHandleRequest(request: Request): boolean {
    return request.type === 'typeC'
  }

  onHandle(request: Request): void {
    console.log(`Request ${request.type} handled by HandlerC`);
  }
}

class Request {
  type: string;
  constructor(type: string) {
    this.type = type;
  }
}

function runExample() {
  const a: Handler = new HandlerA();
  const b: Handler = new HandlerB();
  const c: Handler = new HandlerC();

  b.setNextHandler(a);
  c.setNextHandler(b);

  c.handle(new Request('typeA'));
  c.handle(new Request('typeB'));
  c.handle(new Request('typeC'));
}

runExample();