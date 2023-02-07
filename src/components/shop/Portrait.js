import classes from "./Portrait.module.css";
import Card from "../UI/Card";
import { Fragment, useState } from "react";
import Painting from "./Painting";
const Portrait = (props) => {
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
          className={classes.portraitItem}
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

export default Portrait;
