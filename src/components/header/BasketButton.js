import BasketIcon from "../UI/BusketIcon";
import classes from "./BasketButton.module.css";

const BasketButton = (props) => {
  return (
    <button className={classes.button}>
      <span className={classes.icon}>Basket here</span>
      <span className={classes.badge}>5</span>
    </button>
  );
};

export default BasketButton;
