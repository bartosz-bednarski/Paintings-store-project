import { useContext, useEffect } from "react";
import classes from "./Admin.module.css";

import PaintingsContext from "../../store/paintings-context";

import PaintingForm from "./PaintingForm";
import PaintingsList from "./PaintingsList";
const Admin = () => {
  const ctx = useContext(PaintingsContext);

  useEffect(() => {
    ctx.getPaintings();
  }, []);

  return (
    <div className={classes["admin-container"]}>
      <PaintingForm />
      <PaintingsList />
    </div>
  );
};
export default Admin;
