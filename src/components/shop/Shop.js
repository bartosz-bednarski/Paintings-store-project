import classes from "./Shop.module.css";
import LandscapesCard from "./landscapes/LandscapesCard";
import PortraitsCard from "./portraits/PortraitsCard";
import Painting from "./PaintingModal";
import { Fragment } from "react";
import { useState } from "react";
const Shop = () => {
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
        <PortraitsCard
          onShowPainting={showPainting}
          onHidePainting={hidePainting}
        />
        <LandscapesCard
          onShowPainting={showPainting}
          onHidePainting={hidePainting}
        />
      </div>
    </Fragment>
  );
};

export default Shop;
