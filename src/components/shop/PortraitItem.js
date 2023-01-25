import classes from "./PortraitItem.module.css";
import Card from "../UI/Card";
import PaintingOne from "../../assets/painting-01.jpg";
const PortraitItem = (props) => {
  return (
    <Card>
      <div className={classes.portraitItem}>
        <img src={PaintingOne} />
        <h3>Dama z łasiczką</h3>
        <span>Price 15$</span>
      </div>
    </Card>
  );
};

export default PortraitItem;
