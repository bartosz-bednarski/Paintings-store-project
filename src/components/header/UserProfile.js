import { useContext } from "react";
import RegisterContext from "../../store/register-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./UserProfile.module.css";
const UserProfile = (props) => {
  const ctx = useContext(RegisterContext);
  const userIsLoggedInHandler = () => {
    ctx.userIsLoggedInHandler("", false);
  };
  if (ctx.userIsLoggedIn.isLoggedIn === true) {
    return (
      <Modal onClose={props.onClose}>
        <div className={classes.userProfile}>
          <Button onClick={userIsLoggedInHandler}>Logout</Button>
        </div>
      </Modal>
    );
  }
};

export default UserProfile;
