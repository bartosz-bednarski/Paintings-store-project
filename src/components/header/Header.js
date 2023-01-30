import classes from "./Header.module.css";
import Logo from "../UI/Logo";
import MenuItems from "./MenuItems";

const Header = (props) => {
  return (
    <div className={classes["header-container"]}>
      <Logo />
      <MenuItems
        onShowloginForm={props.onShowloginForm}
        onShowRegisterForm={props.onShowRegisterForm}
        onShowUserProfile={props.onShowUserProfile}
      />
    </div>
  );
};

export default Header;
