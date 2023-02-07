import classes from "./ShopPortraitItems.module.css";
import Portrait from "./Portrait";
import PaintingOne from "../../assets/painting-01.jpg";
import PaintingsContext from "../../store/paintings-context";
import { useContext } from "react";
const ShopPortraitItems = (props) => {
  const ctx = useContext(PaintingsContext);
  const data = ctx.paintings;
  const consoleLogHandler = () => {
    console.log(data);
  };

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
      <div className={classes["ShopPortraitItems-box"]}>
        <h1>Portraits</h1>
        {portraits.map((portrait) => {
          return (
            <Portrait
              key={portrait.id}
              data={{
                id: portrait.id,
                name: portrait.name,
                price: portrait.price,
                description: portrait.description,
                type: portrait.type,
                image: portrait.image,
                theme: portrait.theme,
              }}
            />
          );
        })}

        <button onClick={consoleLogHandler}>dummy console log</button>
      </div>
    </div>
  );
};

export default ShopPortraitItems;
