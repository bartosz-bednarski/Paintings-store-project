import classes from "./PortraitsCard.module.css";
import PortraitItem from "./PortraitItem";
import PaintingsContext from "../../../store/paintings-context";
import { useContext } from "react";
const PortraitsCard = () => {
  const ctx = useContext(PaintingsContext);
  const data = ctx.paintings;

  const portraits = [];
  for (const key in data) {
    if (data[key].type === "Portrait") {
      portraits.push({
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
    <div className={classes["ShopPortraitItems-container"]}>
      <h1>PORTRAITS</h1>
      <div className={classes["ShopPortraitItems-box"]}>
        {portraits.map((portrait) => {
          return (
            <PortraitItem
              key={portrait.id}
              data={{
                id: portrait.id,
                name: portrait.name,
                price: portrait.price,
                description: portrait.description,
                type: portrait.type,
                image: portrait.image,
                theme: portrait.theme,
                amount: 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PortraitsCard;
