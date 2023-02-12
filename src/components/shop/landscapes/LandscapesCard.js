import classes from "./LandscapesCard.module.css";
import { useContext } from "react";
import PaintingsContext from "../../../store/paintings-context";
import LandscapeItem from "./LandscapeItem";
const LandscapesCard = () => {
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
      <h1>LANDSCAPES</h1>
      <div className={classes["ShopLandscapeItems-box"]}>
        {landscapes.map((landscape) => {
          if (landscape.type === "Landscape") {
            return (
              <LandscapeItem
                key={landscape.id}
                data={{
                  id: landscape.id,
                  name: landscape.name,
                  price: landscape.price,
                  description: landscape.description,
                  type: landscape.type,
                  image: landscape.image,
                  theme: landscape.theme,
                  amount: 1,
                }}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default LandscapesCard;
