import React from "react";

const PaintingsContext = React.createContext({
  addBasketItem: () => {},
  basketItems: {},
  getPaintings: () => {},
  paintings: [],
});

export default PaintingsContext;
