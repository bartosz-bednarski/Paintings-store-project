import classes from "./Shop.module.css";
import ShopPortraitItems from "./ShopPortraitItems";
const Shop = (props) => {
  return (
    <div className={classes["shop-container"]}>
      <h1>Portrait paintings</h1>
      <ShopPortraitItems />
    </div>
  );
};

export default Shop;
