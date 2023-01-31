import classes from "./Admin.module.css";

const Admin = (props) => {
  const submitHandler = (event) => {};

  return (
    <div className={classes["admin-container"]}>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" />
        <label htmlFor="price">Price</label>
        <input type="number" id="price" />
        <label htmlFor="description">Description</label>
        <input type="text" id="description" />
        <button>Accept</button>
      </form>
    </div>
  );
};

export default Admin;
