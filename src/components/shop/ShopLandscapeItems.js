import classes from "./ShopLandscapeItems.module.css";
import { useContext } from "react";
import PaintingsContext from "../../store/paintings-context";
import Landscape from "./Landscape";
const ShopLandscapeItems = (props) => {
  const ctx = useContext(PaintingsContext);
  const data = ctx.paintings;

  const landscapes = [];
  for (const key in data) {
    if (data[key].type === "Landscape") {
      landscapes.push({
        id: key,
        price: data[key].price,
        name: data[key].name,
        description: data[key].description,
        type: data[key].type,
        image: data[key].image,
        theme: data[key].theme,
      });
    }
  }
  return (
    <div className={classes["ShopLandscapeItems-container"]}>
      {landscapes.map((landscape) => {
        if (landscape.type === "Landscape") {
          return (
            <Landscape
              key={landscape.id}
              data={{
                name: landscape.name,
                price: `$${landscape.price}`,
                description: landscape.description,
                type: landscape.type,
                image: `${landscape.image}`,
              }}
            />
          );
        }
      })}
    </div>
  );
};

export default ShopLandscapeItems;