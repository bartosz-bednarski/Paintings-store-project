import classes from "./Slider.module.css";
import SliderOne from "../../assets/slider-01.jpg";
import SliderTwo from "../../assets/slider-02.jpg";
import SliderThree from "../../assets/slider-03.jpg";
import SliderMobileOne from "../../assets/slider-mobile-01.webp";
import SliderMobileTwo from "../../assets/slider-mobile-02.webp";
import SliderMobileThree from "../../assets/slider-mobile-03.webp";
import { Fragment, useEffect, useState } from "react";

const Slider = () => {
  const [sliderItem, dispatchSliderItem] = useState({
    painting: SliderOne,
    paintingMobile: SliderMobileOne,
    itemNumber: 0,
    description: "Urban landscapes -20% this week.",
  });

  const SliderElements = () => {
    return (
      <Fragment>
        <picture>
          <source
            media="(max-width: 900px)"
            srcSet={sliderItem.paintingMobile}
          />
          <img src={sliderItem.painting} />
        </picture>

        <p>{sliderItem.description}</p>
      </Fragment>
    );
  };

  useEffect(() => {
    const dummyObject = {
      one: {
        painting: SliderOne,
        paintingMobile: SliderMobileOne,
        itemNumber: 0,
        description: "Urban landscapes -20% this week.",
      },
      two: {
        painting: SliderTwo,
        paintingMobile: SliderMobileTwo,
        itemNumber: 1,
        description: "Decore your home with beautifull landscapes.",
      },
      three: {
        painting: SliderThree,
        paintingMobile: SliderMobileThree,
        itemNumber: 2,
        description: "Find yourself in modern art paintings.",
      },
    };
    const interval = setInterval(() => {
      if (sliderItem.itemNumber === 0) {
        dispatchSliderItem({
          painting: dummyObject.two.painting,
          paintingMobile: dummyObject.two.paintingMobile,
          itemNumber: dummyObject.two.itemNumber,
          description: dummyObject.two.description,
        });
      } else if (sliderItem.itemNumber === 1) {
        dispatchSliderItem({
          painting: dummyObject.three.painting,
          paintingMobile: dummyObject.three.paintingMobile,
          itemNumber: dummyObject.three.itemNumber,
          description: dummyObject.three.description,
        });
      } else if (sliderItem.itemNumber === 2) {
        dispatchSliderItem({
          painting: dummyObject.one.painting,
          paintingMobile: dummyObject.one.paintingMobile,
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
