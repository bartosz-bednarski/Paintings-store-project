import classes from "./Painting.module.css";
import Modal from "../UI/Modal";
const Painting = (props) => {
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
            <div className={classes["price-box"]}>
              <h3>Price: {props.data.price}.00 $</h3>
              <button
                onClick={() => {
                  console.log(props.data);
                }}
              >
                Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Painting;
