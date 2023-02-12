import { useContext } from "react";
import classes from "./PaintingsList.module.css";
import PaintingsContext from "../../store/paintings-context";

const PaintingsList = () => {
  const ctx = useContext(PaintingsContext);
  return (
    <div className={classes["paintings-list-container"]}>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Id</th>
            <th>Theme</th>
            <th>Price</th>
            <th>Description</th>

            <th>Image</th>
          </tr>
        </tbody>
        {ctx.paintings &&
          ctx.paintings.map((painting) => {
            return (
              <tbody key={painting.id}>
                <tr>
                  <td>{painting.name}</td>
                  <td>{painting.type}</td>
                  <td>{painting.id}</td>
                  <td>{painting.theme}</td>
                  <td>{painting.price}</td>
                  <td>{painting.description}</td>

                  <td>{painting.image}</td>
                </tr>
              </tbody>
            );
          })}
      </table>
    </div>
  );
};

export default PaintingsList;
