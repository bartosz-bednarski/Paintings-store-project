import { useEffect, useState } from "react";
import classes from "./Admin.module.css";
import Portrait from "../shop/Portrait";
import Landscape from "../shop/Landscape";
import { useCallback } from "react";
const Admin = (props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [paintingType, setPaintingType] = useState("");
  const [description, setDescription] = useState("");

  const handleOnDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    event.preventDefault();
    setPreviewUrl(URL.createObjectURL(event.dataTransfer.files[0]));
    console.log(event.dataTransfer.files[0]);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
    console.log(storageData);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
    console.log(event.target.value);
  };
  const typeChangeHandler = (event) => {
    (event.target.value === "Portrait" &&
      setPaintingType(event.target.value)) ||
      (event.target.value === "Landscape" &&
        setPaintingType(event.target.value));
    console.log(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
    console.log(event.target.value);
  };

  const [storageData, setStorageData] = useState({});
  const [paintingsList, setPaintingsList] = useState("");

  const getStoreDataHandler = useCallback(async () => {
    const response = await fetch(
      "https://paintings4sale-28dda-default-rtdb.europe-west1.firebasedatabase.app/store.json"
    );
    const data = await response.json();
    console.log(data);
    // for (const key in data) {
    //   users.push({
    //     email: data[key].email,
    //     password: data[key].password,
    //   });
    // }
    const paintingsListHandler = () => {
      for (const key in storageData) {
        return (
          <tr>
            <td>{storageData[key].name}</td>
            <td>{storageData[key].price}</td>
            <td>{storageData[key].description}</td>
            <td>{storageData[key].type}</td>
            <td>{storageData[key].image}</td>
          </tr>
        );
      }
    };

    setStorageData({ data });
    setPaintingsList(paintingsListHandler);
  }, [storageData]);
  // useEffect(() => {
  //   getStoreDataHandler();
  // }, [getStoreDataHandler]);

  async function addPainting(paintingData) {
    const response = await fetch(
      "https://paintings4sale-28dda-default-rtdb.europe-west1.firebasedatabase.app/store.json",
      {
        method: "POST",
        body: JSON.stringify(paintingData),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (previewUrl && name && price && paintingType && description) {
      const dummyPortrait = {
        name: name,
        price: price,
        type: paintingType,
        description: description,
        image: previewUrl,
      };
      addPainting(dummyPortrait);
      getStoreDataHandler();
      console.log(dummyPortrait);
    }
  };

  return (
    <div className={classes["admin-container"]}>
      <form onSubmit={submitHandler}>
        <div className={classes["text-data"]}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={nameChangeHandler} />
          <label htmlFor="price">Price</label>
          <input type="number" id="price" onChange={priceChangeHandler} />

          <input
            list="paintingTypes"
            name="paintingType"
            onChange={typeChangeHandler}
          />
          <datalist id="paintingTypes">
            <option value="Portrait" />
            <option value="Landscape" />
          </datalist>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            onChange={descriptionChangeHandler}
          />
          <div
            className={classes.dropzone}
            onDragOver={handleOnDragOver}
            onDrop={handleOnDrop}
          >
            <h1>Drag and drop image</h1>
            {/* {previewUrl && <img src={previewUrl} />} */}
          </div>
          <button>Accept</button>
        </div>
        {previewUrl && paintingType === "Portrait" && (
          <Portrait
            data={{
              name: name,
              price: `$${price}`,
              description: { description },
              type: paintingType,
              image: `${previewUrl}`,
            }}
          />
        )}
        {previewUrl && paintingType === "Landscape" && (
          <Landscape
            data={{
              name: name,
              price: `$${price}`,
              description: { description },
              type: paintingType,
              image: `${previewUrl}`,
            }}
          />
        )}
      </form>
      <div className={classes["paintings-list-container"]}>
        <table>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Type</th>
            <th>Image</th>
          </tr>
          {paintingsList}
        </table>
      </div>
      {/* <img src={storageData.data["-NNC2cqo_y_mNBuKFjPg"].image} /> */}
    </div>
  );
};

export default Admin;
