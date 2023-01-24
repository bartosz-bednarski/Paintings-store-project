import classes from "./MenuItems.module.css";
import ListButton from "../UI/ListButton";
const MenuItems = () => {
  return (
    <div className={classes["menu-container"]}>
      <ul>
        <ListButton onClick={"toSet"}>Register</ListButton>
        <ListButton onClick={"toSet"}>Login</ListButton>
        <ListButton onClick={"toSet"}>Menu</ListButton>
      </ul>
    </div>
  );
};

export default MenuItems;
