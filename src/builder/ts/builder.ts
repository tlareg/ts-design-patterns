'use strict';

class Director {
  createProduct(builder: ProductBuilder): Product {
    return builder
      .setupType()
      .changePartsCase()
      .createPartC()
      .getProduct();
  }

  createProductWithoutPartC(builder: ProductBuilder): Product {
    return builder
      .setupType()
      .changePartsCase()
      .getProduct();
  }
}

class ProductBuilder {
  protected _type: string;
  protected _partA: string;
  protected _partB: string;
  protected _partC: string;

  get type(): string { return this._type; }
  get partA(): string { return this._partA; }
  get partB(): string { return this._partB; }
  get partC(): string { return this._partC; }

  constructor() {
    this._partA = 'Default_Part_A';
    this._partB = 'Default_Part_B';
  }

  setPartA(partA: string): ProductBuilder {
    this._partA = partA;
    return this;
  }

  setPartB(partB): ProductBuilder {
    this._partB = partB;
    return this;
  }

  setupType(): ProductBuilder {
    this._type = 'Default_Type';
    return this;
  }

  changePartsCase(): ProductBuilder {
    return this;
  }

  createPartC(): ProductBuilder {
    this._partC = `${this._partA} and ${this._partB}`;
    return this;
  }

  getProduct(): Product {
    return new Product(this);
  }
}

class UpperCaseProductBuilder extends ProductBuilder {
  setupType(): ProductBuilder {
    this._type = 'UpperCase';
    return this;
  }

  changePartsCase(): ProductBuilder {
    this._partA = this._partA.toUpperCase();
    this._partB = this._partB.toUpperCase();
    return this;
  }
}

class LowerCaseProductBuilder extends ProductBuilder {
  setupType(): ProductBuilder {
    this._type = 'LowerCase';
    return this;
  }

  changePartsCase(): ProductBuilder {
    this._partA = this._partA.toLowerCase();
    this._partB = this._partB.toLowerCase();
    return this;
  }
}

class Product {
  private type: string;
  private partA: string;
  private partB: string;
  private partC: string;

  constructor(builder: ProductBuilder) {
    this.type = builder.type;
    this.partA = builder.partA;
    this.partB = builder.partB;
    this.partC = builder.partC;
  }

  toString(): string {
    return `
      Product (${this.type})
        A: ${this.partA} 
        B: ${this.partB}
        ${this.partC ? `C: ${this.partC}` : '-'}
    `;
  }
}

function runExample() {
  const partA = 'AaaAAa';
  const partB = 'bBBbbB';

  const director = new Director();

  const defaultProduct = director.createProduct(
    new ProductBuilder()
      .setPartB(partB)
  );

  console.log(defaultProduct.toString());

  const upperCaseProduct = director.createProduct(
    new UpperCaseProductBuilder()
      .setPartA(partA)
      .setPartB(partB)
  );

  console.log(upperCaseProduct.toString());

  const lowerCaseProduct = director.createProduct(
    new LowerCaseProductBuilder()
      .setPartA(partA)
  );

  console.log(lowerCaseProduct.toString());

  const lowerCaseProductWithoutPartC = director.createProductWithoutPartC(
    new LowerCaseProductBuilder()
      .setPartA(partA)
  );

  console.log(lowerCaseProductWithoutPartC.toString());
}

runExample();
