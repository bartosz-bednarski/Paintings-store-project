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

      <div className={classes["interactive-box"]}>
        {!isLoggedIn.isLoggedIn && (
          <div className={classes["interactive-item"]}>
            <button
              onClick={props.onShowloginForm}
              className={classes["interactive-button"]}
            >
              <img src={UserIcon} className={classes["user-icon"]} />
            </button>
          </div>
        )}
        {isLoggedIn.isLoggedIn && (
          <div className={classes["interactive-item"]}>
            <button
              className={classes["interactive-button"]}
              onClick={props.onShowUserProfile}
            >
              {isLoggedIn.email}
            </button>
          </div>
        )}
        <div className={classes["interactive-item"]}>
          <button
            className={classes["interactive-button"]}
            onClick={props.onShowBasket}
          >
            <img src={Icon} className={classes["basket-icon"]} />
            <span className={classes.badge}>{badge}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
