export const sortLowToHigh = (products) => {
  return [...products.sort((a, b) => a.price - b.price)];
};

export const highLowToLow = (products) => {
  return [...products.sort((a, b) => b.price - a.price)];
};

export const filterByPrice = (products, from, to) => {
  return [
    ...products.filter(
      (product) => product.price >= from && product.price < to
    ),
  ];
};
