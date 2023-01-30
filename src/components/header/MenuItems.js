import classes from "./MenuItems.module.css";
import ListButton from "../UI/ListButton";
import { useContext } from "react";
import RegisterContext from "../../store/register-context";
const MenuItems = (props) => {
  const ctx = useContext(RegisterContext);
  const isLoggedIn = ctx.userIsLoggedIn;
  return (
    <div className={classes["menu-container"]}>
      <ul>
        {isLoggedIn.isLoggedIn === false && (
          <>
            <ListButton onClick={props.onShowloginForm}>Login</ListButton>
            <ListButton onClick={props.onShowRegisterForm}>Register</ListButton>
          </>
        )}
        {isLoggedIn.isLoggedIn && (
          <ListButton onClick={props.onShowUserProfile}>
            {isLoggedIn.email}
          </ListButton>
        )}
        <ListButton>Menu</ListButton>
      </ul>
    </div>
  );
};

export default MenuItems;
