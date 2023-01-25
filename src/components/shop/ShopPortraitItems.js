import classes from "./ShopPortraitItems.module.css";
import PortraitItem from "./PortraitItem";
const ShopPortraitItems = (props) => {
  return (
    <div className={classes["ShopPortraitItems-container"]}>
      <PortraitItem />
      <PortraitItem />
      <PortraitItem />
      <PortraitItem />
    </div>
  );
};

export default ShopPortraitItems;
