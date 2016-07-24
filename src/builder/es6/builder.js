'use strict';

class Director {
  createProduct(builder) {
    return builder
      .setupType()
      .changePartsCase()
      .createPartC()
      .getProduct();
  }

  createProductWithoutPartC(builder) {
    return builder
      .setupType()
      .changePartsCase()
      .getProduct();
  }
}

class ProductBuilder {
  constructor() {
    this.partA = 'Default_Part_A';
    this.partB = 'Default_Part_B';
  }

  setPartA(partA) {
    this.partA = partA;
    return this;
  }

  setPartB(partB) {
    this.partB = partB;
    return this;
  }

  setupType() {
    this.type = 'Default_Type';
    return this;
  }

  changePartsCase() {
    return this;
  }

  createPartC() {
    this.partC = `${this.partA} and ${this.partB}`;
    return this;
  }

  getProduct() {
    return new Product(this);
  }
}

class UpperCaseProductBuilder extends ProductBuilder {
  setupType() {
    this.type = 'UpperCase';
    return this;
  }

  changePartsCase() {
    this.partA = this.partA.toUpperCase();
    this.partB = this.partB.toUpperCase();
    return this;
  }
}

class LowerCaseProductBuilder extends ProductBuilder {
  setupType() {
    this.type = 'LowerCase';
    return this;
  }

  changePartsCase() {
    this.partA = this.partA.toLowerCase();
    this.partB = this.partB.toLowerCase();
    return this;
  }
}

class Product {
  constructor({ type, partA, partB, partC }) {
    this.type = type;
    this.partA = partA;
    this.partB = partB;
    this.partC = partC;
  }

  toString() {
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
