import React from "react";

const PaintingsContext = React.createContext({
  getPaintings: () => {},
  paintings: [],
});

export default PaintingsContext;
