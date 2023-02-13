import classes from "./PortraitItem.module.css";
import Card from "../../UI/Card";
import { Fragment, useState } from "react";
import PaintingModal from "../PaintingModal";
const PortraitItem = (props) => {
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
        <PaintingModal onClose={hidePainting} data={props.data} />
      )}
      <Card>
        <div
          className={classes.portraitItem}
          onClick={showPainting}
          data={props.data}
        >
          <img src={props.data.image} alt={props.data.name} />
          <h3>{props.data.name}</h3>
          <span>{props.data.price}.00 $</span>
        </div>
      </Card>
    </Fragment>
  );
};

export default PortraitItem;
