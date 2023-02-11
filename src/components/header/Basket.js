import classes from "./Basket.module.css";
import Modal from "../UI/Modal";
import { Fragment, useContext, useReducer, useState } from "react";
import PaintingsContext from "../../store/paintings-context";
import Button from "../UI/Button";
const Basket = (props) => {
  const ctx = useContext(PaintingsContext);
  const basketItems = [...ctx.basketItems.paintings];

  const addBasketItemHandler = (item) => {
    ctx.addBasketItem({ type: "ADD", painting: [item] });
    console.log(item.amount);
  };

  const removeBasketItemHandler = (item) => {
    ctx.removeBasketItem({ type: "REMOVE", painting: [item] });
    console.log(item.amount);
  };

  const [orderIsConfirmedModal, setOrderIsConfirmedModal] = useState(false);

  const showOrderIsConfirmedModal = () => {
    setOrderIsConfirmedModal(true);
    ctx.removeBasketItem({ type: "ORDERED" });
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes["basket-container"]}>
        <div className={classes["basket-box"]}>
          {orderIsConfirmedModal && (
            <Fragment>
              <h1>Your order is completed. </h1>
              <h3>
                We will send you delivery and payment informations on your
                e-mail.
              </h3>
            </Fragment>
          )}
          {!orderIsConfirmedModal && (
            <Fragment>
              {basketItems.length === 0 && <h1>Your basket is empty</h1>}
              {basketItems.length > 0 && (
                <Fragment>
                  <ul>
                    {basketItems.map((item) => {
                      return (
                        <li key={item.id}>
                          <span className={classes["painting-name"]}>
                            {item.name}
                          </span>
                          <span className={classes["amount-price-box"]}>
                            <span className={classes["painting-price"]}>
                              {item.price} $
                            </span>
                            <span className={classes["amount"]}>
                              {item.amount}
                            </span>
                            <Button
                              onClick={removeBasketItemHandler.bind(null, item)}
                            >
                              -
                            </Button>
                            <Button
                              onClick={addBasketItemHandler.bind(null, item)}
                            >
                              +
                            </Button>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <span className={classes["total-price"]}>
                    Total price: {ctx.basketItems.totalAmount}$
                  </span>
                  <Button onClick={showOrderIsConfirmedModal}>
                    Confirm order
                  </Button>
                </Fragment>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Basket;
