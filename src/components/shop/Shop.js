import classes from "./Shop.module.css";
import ShopLandscapeItems from "./ShopLandscapeItems";
import ShopPortraitItems from "./ShopPortraitItems";
const Shop = (props) => {
  return (
    <div className={classes["shop-container"]}>
      <h1>Portrait paintings</h1>
      <ShopPortraitItems />
      <ShopLandscapeItems />
    </div>
  );
};

export default Shop;
