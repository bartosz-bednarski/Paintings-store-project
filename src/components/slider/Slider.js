import classes from "./Slider.module.css";
import SliderOne from "../../assets/slider-01.jpg";
import SliderTwo from "../../assets/slider-02.jpg";
import SliderThree from "../../assets/slider-03.jpg";
import { Fragment, useEffect, useState } from "react";

const Slider = () => {
  const [sliderItem, dispatchSliderItem] = useState({
    painting: SliderOne,
    itemNumber: 0,
    description: "Urban landscapes -20% this week.",
    output: (
      <Fragment>
        <img src={SliderOne} />
        <h1>"Urban landscapes -20% this week."</h1>
      </Fragment>
    ),
  });

  const SliderElements = () => {
    return (
      <Fragment>
        <img src={sliderItem.painting} />
        <h1>{sliderItem.description}</h1>
      </Fragment>
    );
  };

  useEffect(() => {
    const dummyObject = {
      one: {
        painting: SliderOne,
        itemNumber: 0,
        description: "Urban landscapes -20% this week.",
      },
      two: {
        painting: SliderTwo,
        itemNumber: 1,
        description: "Decore your home with beautifull landscapes.",
      },
      three: {
        painting: SliderThree,
        itemNumber: 2,
        description: "Find yourself with modern art paintings.",
      },
    };
    const interval = setInterval(() => {
      if (sliderItem.itemNumber === 0) {
        dispatchSliderItem({
          painting: dummyObject.two.painting,
          itemNumber: dummyObject.two.itemNumber,
          description: dummyObject.two.description,
        });
      } else if (sliderItem.itemNumber === 1) {
        dispatchSliderItem({
          painting: dummyObject.three.painting,
          itemNumber: dummyObject.three.itemNumber,
          description: dummyObject.three.description,
        });
      } else if (sliderItem.itemNumber === 2) {
        dispatchSliderItem({
          painting: dummyObject.one.painting,
          itemNumber: dummyObject.one.itemNumber,
          description: dummyObject.one.description,
        });
      }
      // console.log(sliderItem);
      return clearInterval(interval);
    }, 8000);
  }, [sliderItem]);

  return (
    <div className={classes["slider-container"]}>
      <div className={classes["slider-box"]}>
        {/* {sliderItem.output} */}
        <SliderElements />
        <div className={classes["dots-box"]}>
          <span
            className={
              classes[
                `${sliderItem.itemNumber === 0 ? "active-dot" : "inactive-dot"}`
              ]
            }
          />
          <span
            className={
              classes[
                `${sliderItem.itemNumber === 1 ? "active-dot" : "inactive-dot"}`
              ]
            }
          />
          <span
            className={
              classes[
                `${sliderItem.itemNumber === 2 ? "active-dot" : "inactive-dot"}`
              ]
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Slider;
