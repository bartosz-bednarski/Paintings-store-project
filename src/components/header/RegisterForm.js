import classes from "./RegisterForm.module.css";
import Modal from "../UI/Modal";
const RegisterForm = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <form>
        <div className={classes["registerForm-container"]}>
          <label htmlFor="e-mail">E-mail</label>
          <input type="text" id="e-mail" />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" />
          <label htmlFor="passwordConfirm">Confirm password</label>
          <input type="text" id="passwordConfirm" />
          <button>Register</button>
        </div>
      </form>
    </Modal>
  );
};
export default RegisterForm;
