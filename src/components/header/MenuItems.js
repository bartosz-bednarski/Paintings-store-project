import classes from "./MenuItems.module.css";
import ListButton from "../UI/ListButton";
const MenuItems = (props) => {
  return (
    <div className={classes["menu-container"]}>
      <ul>
        <ListButton onClick={props.onShowRegisterForm}>Register</ListButton>
        <ListButton onClick={props.onShowloginForm}>Login</ListButton>
        <ListButton>Menu</ListButton>
      </ul>
    </div>
  );
};

export default MenuItems;
