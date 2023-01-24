import classes from "./Header.module.css";
import Logo from "../UI/Logo";
import MenuItems from "./MenuItems";
const Header = (props) => {
  return (
    <div className={classes["header-container"]}>
      <Logo />
      <MenuItems />
    </div>
  );
};

export default Header;
