import classes from "./Shop.module.css";
import ShopLandscapeItems from "./ShopLandscapeItems";
import ShopPortraitItems from "./ShopPortraitItems";
import Painting from "./Painting";
import { Fragment } from "react";
import { useState } from "react";
const Shop = (props) => {
  const [paintingIsShown, setPaintingIsShown] = useState(false);

  const showPainting = () => {
    setPaintingIsShown(true);
  };
  const hidePainting = () => {
    setPaintingIsShown(false);
  };

  return (
    <Fragment>
      {paintingIsShown && <Painting />}

      <div className={classes["shop-container"]}>
        <ShopPortraitItems
          onShowPainting={showPainting}
          onHidePainting={hidePainting}
        />
        <ShopLandscapeItems
          onShowPainting={showPainting}
          onHidePainting={hidePainting}
        />
      </div>
    </Fragment>
  );
};

export default Shop;
