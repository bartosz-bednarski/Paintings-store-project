import classes from "./ShopPortraitItems.module.css";
import Portrait from "./Portrait";
import PaintingOne from "../../assets/painting-01.jpg";
const ShopPortraitItems = (props) => {
  return (
    <div className={classes["ShopPortraitItems-container"]}>
      <Portrait
        data={{
          name: "Dama",
          price: `$${15}`,
          description: "xxx",
          type: "portrait",
          image: `${PaintingOne}`,
        }}
      />
      <Portrait
        data={{
          name: "Dama2",
          price: `$${15}`,
          description: "xxx",
          type: "portrait",
          image: `${PaintingOne}`,
        }}
      />
      <Portrait
        data={{
          name: "Dama3",
          price: `$${15}`,
          description: "xxx",
          type: "portrait",
          image: `${PaintingOne}`,
        }}
      />
      <Portrait
        data={{
          name: "Dama4",
          price: `$${15}`,
          description: "xxx",
          type: "portrait",
          image: `${PaintingOne}`,
        }}
      />
    </div>
  );
};

export default ShopPortraitItems;
