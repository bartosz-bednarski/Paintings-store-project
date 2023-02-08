import classes from "./Basket.module.css";
import Modal from "../UI/Modal";
import { useContext, useReducer } from "react";
import PaintingsContext from "../../store/paintings-context";

const Basket = (props) => {
  const ctx = useContext(PaintingsContext);
  const basketItems = [...ctx.basketItems.paintings];

  const addBasketItemHandler = (item) => {
    ctx.addBasketItem({ type: "ADD", painting: item });
    console.log(item);
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes["basket-container"]}>
        <div className={classes["basket-box"]}>
          <ul>
            {basketItems.map((item) => {
              return (
                <li key={item.id}>
                  <span className={classes["painting-name"]}>{item.name}</span>
                  <span className={classes["amount-price-box"]}>
                    <span className={classes["painting-price"]}>
                      {item.price} $
                    </span>
                    <span className={classes["amount"]}>{item.amount}</span>
                    <button onClick={addBasketItemHandler}>+</button>
                    <button>-</button>
                  </span>
                </li>
              );
            })}
          </ul>
          <span className={classes["total-price"]}>
            Total price: {ctx.basketItems.totalAmount}$
          </span>
          <button>Confirm order</button>
        </div>
      </div>
    </Modal>
  );
};

export default Basket;
