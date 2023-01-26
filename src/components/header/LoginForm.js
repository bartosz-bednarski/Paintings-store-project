import classes from "./RegisterForm.module.css";
import Modal from "../UI/Modal";
const LoginForm = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <form>
        <div className={classes["registerForm-container"]}>
          <label htmlFor="e-mail">E-mail</label>
          <input type="text" id="e-mail" />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" />
          <button>Login</button>
        </div>
      </form>
    </Modal>
  );
};

export default LoginForm;
