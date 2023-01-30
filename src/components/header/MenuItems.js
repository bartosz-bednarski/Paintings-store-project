import classes from "./MenuItems.module.css";
import ListButton from "../UI/ListButton";
import { useContext } from "react";
import RegisterContext from "../../store/register-context";
import BasketButton from "./BasketButton";
const MenuItems = (props) => {
  const ctx = useContext(RegisterContext);
  const isLoggedIn = ctx.userIsLoggedIn;
  return (
    <div className={classes["menu-container"]}>
      <ul>
        {isLoggedIn.isLoggedIn === false && (
          <>
            <li>
              <button onClick={props.onShowloginForm}>Login</button>
            </li>
            <li>
              <button onClick={props.onShowRegisterForm}>Register</button>
            </li>
          </>
        )}
        {isLoggedIn.isLoggedIn && (
          <li>
            <button onClick={props.onShowUserProfile}>
              {isLoggedIn.email}
            </button>
          </li>
        )}
        <li>
          <BasketButton />
        </li>
      </ul>
    </div>
  );
};

export default MenuItems;
