import { useContext } from "react";
import RegisterContext from "../../store/register-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import classes from "./UserProfile.module.css";
const UserProfile = (props) => {
  const ctx = useContext(RegisterContext);

  const userIsLoggedInHandler = () => {
    ctx.userIsLoggedInHandler("", false);
    localStorage.removeItem("email");
    localStorage.removeItem("isLoggedIn");
    props.onClose();
  };
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.userProfile}>
        <Button onClick={userIsLoggedInHandler}>Logout</Button>
      </div>
    </Modal>
  );
};

export default UserProfile;
