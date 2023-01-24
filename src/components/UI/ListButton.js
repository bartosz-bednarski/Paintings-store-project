import classes from "./ListButton.module.css";

const ListButton = (props) => {
  return (
    <li className={classes.li}>
      <a onClick={props.onClick}>{props.children}</a>
    </li>
  );
};

export default ListButton;
