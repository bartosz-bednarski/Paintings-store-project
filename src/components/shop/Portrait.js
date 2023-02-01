import classes from "./Portrait.module.css";
import Card from "../UI/Card";

const Portrait = (props) => {
  return (
    <Card>
      <div className={classes.portraitItem}>
        <img src={props.data.image} />
        <h3>{props.data.name}</h3>
        <span>{props.data.price}</span>
      </div>
    </Card>
  );
};

export default Portrait;
