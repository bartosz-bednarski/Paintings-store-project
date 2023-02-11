import React from "react";

const PaintingsContext = React.createContext({
  addBasketItem: () => {},
  removeBasketItem: () => {},
  basketItems: {},
  getPaintings: () => {},
  paintings: [],
});

export default PaintingsContext;
