import classes from "./Header.module.css";
import Logo from "../UI/Logo";
import UserIcon from "../../assets/user-icon.png";
import Icon from "../../assets/cart.png";
import { useContext } from "react";
import RegisterContext from "../../store/register-context";
const Header = (props) => {
  const ctx = useContext(RegisterContext);
  const isLoggedIn = ctx.userIsLoggedIn;
  return (
    <div className={classes["header-container"]}>
      <Logo />

      <ul>
        {!isLoggedIn.isLoggedIn && (
          <li>
            <button
              onClick={props.onShowloginForm}
              className={classes["profile-button"]}
            >
              <img src={UserIcon} />
            </button>
          </li>
        )}
        {isLoggedIn.isLoggedIn && (
          <li>
            <button onClick={props.onShowUserProfile}>
              {isLoggedIn.email}
            </button>
          </li>
        )}
        <li>
          <button
            className={classes["basket-button"]}
            onClick={props.onShowBasket}
          >
            <img src={Icon} className={classes.icon} />
            <span className={classes.badge}>0</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
