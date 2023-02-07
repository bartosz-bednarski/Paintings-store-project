import classes from "./Landscape.module.css";
import Card from "../UI/Card";
import { useState } from "react";
import { Fragment } from "react";
import Painting from "./Painting";
const Landscape = (props) => {
  const [paintingIsShown, setPaintingIsShown] = useState(false);

  const showPainting = () => {
    setPaintingIsShown(true);
  };
  const hidePainting = () => {
    setPaintingIsShown(false);
  };

  return (
    <Fragment>
      {paintingIsShown === true && (
        <Painting onClose={hidePainting} data={props.data} />
      )}
      <Card>
        <div
          className={classes["landscape-box"]}
          onClick={showPainting}
          data={props.data}
        >
          <img src={props.data.image} />
          <h3>{props.data.name}</h3>
          <span>{props.data.price}.00 $</span>
        </div>
      </Card>
    </Fragment>
  );
};

export default Landscape;
