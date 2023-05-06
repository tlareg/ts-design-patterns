type Product = {
  toString: () => string;
};

const createProduct = (
  partA: string,
  partB: string,
  partC?: string
): Product => ({
  toString: () => [`A:${partA}`, `B:${partB}`, `C:${partC ?? "-"}`].join(","),
});

type ProductBuilder = {
  setPartA: (partA: string) => ProductBuilder;
  setPartB: (partB: string) => ProductBuilder;
  createPartC: () => ProductBuilder;
  changePartsCase: () => ProductBuilder;
  build: () => Product;
};

type ProductBuilderConfig = {
  changePartsCase?: (
    partA: string,
    partB: string
  ) => { partA: string; partB: string };
};

export const createProductBuilder = (
  config?: ProductBuilderConfig
): ProductBuilder => {
  let partA = "a1";
  let partB = "b1";
  let partC: string | undefined = undefined;

  return {
    setPartA(a: string): ProductBuilder {
      partA = a;
      return this;
    },
    setPartB(b: string): ProductBuilder {
      partB = b;
      return this;
    },
    createPartC(): ProductBuilder {
      partC = `${partA}+${partB}`;
      return this;
    },
    changePartsCase() {
      if (config?.changePartsCase) {
        const { partA: newPartA, partB: newPartB } = config.changePartsCase(
          partA,
          partB
        );
        partA = newPartA;
        partB = newPartB;
      }
      return this;
    },
    build: () => createProduct(partA, partB, partC),
  };
};

export const createUpperCaseProductBuilder = () =>
  createProductBuilder({
    changePartsCase: (partA, partB) => ({
      partA: partA.toUpperCase(),
      partB: partB.toUpperCase(),
    }),
  });

type Director = {
  createProduct: (builder: ProductBuilder) => Product;
  createProductWithoutPartC: (builder: ProductBuilder) => Product;
};

export const createDirector = (): Director => ({
  createProduct: (builder: ProductBuilder) =>
    builder.changePartsCase().createPartC().build(),
  createProductWithoutPartC: (builder: ProductBuilder) =>
    builder.changePartsCase().build(),
});
