import { describe, it, expect } from "vitest";
import { createDirector, createProductBuilder, createUpperCaseProductBuilder } from "./builder";

describe("director", () => {
  it("should be able to create the Default Product", () => {
    const director = createDirector();

    const defaultProduct = director.createProduct(
      createProductBuilder().setPartB("b2")
    );

    expect(defaultProduct.toString()).toEqual("A:a1,B:b2,C:a1+b2");
  });

  it("should be able to create the Upper Case Product", () => {
    const director = createDirector();

    const upperCaseProduct = director.createProduct(
      createUpperCaseProductBuilder().setPartA("a2").setPartB("b2")
    );

    expect(upperCaseProduct.toString()).toEqual("A:A2,B:B2,C:A2+B2");
  });

  it("should be able to create the Upper Case Product without part C", () => {
    const director = createDirector();

    const upperCaseProductWithoutPartC = director.createProductWithoutPartC(
      createUpperCaseProductBuilder().setPartA("a2")
    );

    expect(upperCaseProductWithoutPartC.toString()).toEqual("A:A2,B:B1,C:-");
  });
});
