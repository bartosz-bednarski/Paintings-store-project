import classes from "./ListButton.module.css";

const ListButton = (props) => {
  return (
    <li className={classes.li}>
      <button onClick={props.onClick}>{props.children}</button>
    </li>
  );
};

export default ListButton;
