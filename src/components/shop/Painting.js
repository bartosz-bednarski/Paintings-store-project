import classes from "./Painting.module.css";
import Modal from "../UI/Modal";
import { useContext } from "react";
import PaintingsContext from "../../store/paintings-context";
import Button from "../UI/Button";
const Painting = (props) => {
  const ctx = useContext(PaintingsContext);

  const addBasketItemHandler = () => {
    ctx.addBasketItem({ type: "ADD", painting: [props.data] });
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes["painting-container"]}>
        <div className={classes["painting-box"]}>
          <div className={classes["image-box"]}>
            <img src={props.data.image} />
          </div>
          <div className={classes["data-box"]}>
            <h1>{props.data.name}</h1>
            <p>{props.data.description}</p>
            <p>Type: {props.data.type}</p>
            <p>Theme: {props.data.theme}</p>
            <p>Size: 40 x 44"</p>
            <p>Price: {props.data.price}.00 $</p>
            <Button onClick={addBasketItemHandler}>Order</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Painting;
