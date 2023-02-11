import classes from "./Header.module.css";
import Logo from "../UI/Logo";
import UserIcon from "../../assets/user-icon.png";
import Icon from "../../assets/cart.png";
import { useContext } from "react";
import RegisterContext from "../../store/register-context";
import PaintingsContext from "../../store/paintings-context";
const Header = (props) => {
  const ctxPaintings = useContext(PaintingsContext);
  const ctx = useContext(RegisterContext);
  const isLoggedIn = ctx.userIsLoggedIn;
  const badge = ctxPaintings.basketItems.paintings.length;
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
            <button
              className={classes["profile-button"]}
              onClick={props.onShowUserProfile}
            >
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
            <span className={classes.badge}>{badge}</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
