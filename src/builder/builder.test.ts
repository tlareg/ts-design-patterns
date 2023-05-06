import { describe, it, expect } from "vitest";
import { Director, ProductBuilder, UpperCaseProductBuilder } from "./builder";

describe("director", () => {
  it("should be able to create the Default Product", () => {
    const director = new Director();

    const defaultProduct = director.createProduct(
      new ProductBuilder().setPartB("b2")
    );

    expect(defaultProduct.toString()).toEqual("A:a1,B:b2,C:a1+b2");
  });

  it("should be able to create the Upper Case Product", () => {
    const director = new Director();

    const upperCaseProduct = director.createProduct(
      new UpperCaseProductBuilder().setPartA("a2").setPartB("b2")
    );

    expect(upperCaseProduct.toString()).toEqual("A:A2,B:B2,C:A2+B2");
  });

  it("should be able to create the Upper Case Product without part C", () => {
    const director = new Director();

    const upperCaseProductWithoutPartC = director.createProductWithoutPartC(
      new UpperCaseProductBuilder().setPartA("a2")
    );

    expect(upperCaseProductWithoutPartC.toString()).toEqual("A:A2,B:B1,C:-");
  });
});
