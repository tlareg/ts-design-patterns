class Product {
  private partA: string;
  private partB: string;
  private partC: string;

  constructor(partA: string, partB: string, partC: string) {
    this.partA = partA;
    this.partB = partB;
    this.partC = partC;
  }

  toString() {
    return [
      `A:${this.partA}`,
      `B:${this.partB}`,
      `C:${this.partC ?? "-"}`,
    ].join(",");
  }
}

export class ProductBuilder {
  protected partA: string;
  protected partB: string;
  protected partC: string;

  constructor() {
    this.partA = "a1";
    this.partB = "b1";
  }

  setPartA(partA: string): this {
    this.partA = partA;
    return this;
  }

  setPartB(partB: string): this {
    this.partB = partB;
    return this;
  }

  changePartsCase(): this {
    return this;
  }

  createPartC(): ProductBuilder {
    this.partC = `${this.partA}+${this.partB}`;
    return this;
  }

  build(): Product {
    return new Product(this.partA, this.partB, this.partC);
  }
}

export class UpperCaseProductBuilder extends ProductBuilder {
  changePartsCase(): this {
    this.partA = this.partA.toUpperCase();
    this.partB = this.partB.toUpperCase();
    return this;
  }
}

export class Director {
  createProduct(builder: ProductBuilder): Product {
    return builder.changePartsCase().createPartC().build();
  }

  createProductWithoutPartC(builder: ProductBuilder): Product {
    return builder.changePartsCase().build();
  }
}