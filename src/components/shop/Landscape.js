import classes from "./Landscape.module.css";
import Card from "../UI/Card";

const Landscape = (props) => {
  return (
    <Card>
      <div className={classes["landscape-box"]}>
        <img src={props.data.image} />
        <h3>{props.data.name}</h3>
        <span>{props.data.price}</span>
      </div>
    </Card>
  );
};

export default Landscape;
