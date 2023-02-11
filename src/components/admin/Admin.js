import { useContext, useEffect, useState } from "react";
import classes from "./Admin.module.css";
import Portrait from "../shop/Portrait";
import Landscape from "../shop/Landscape";
import PaintingsContext from "../../store/paintings-context";
import { storage } from "./firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import Button from "../UI/Button";
const Admin = (props) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageBlob, setImageBlob] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [paintingType, setPaintingType] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const ctx = useContext(PaintingsContext);
  const handleOnDragOver = (event) => {
    event.preventDefault();
  };
  const handleOnDrop = (event) => {
    event.preventDefault();

    let blobUrl = URL.createObjectURL(event.dataTransfer.files[0]);
    setImageBlob(blobUrl);
    // setPreviewUrl(blobUrl);
    setPreviewUrl(event.dataTransfer.files[0]);
    console.log(event.dataTransfer.files[0]);
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
    console.log(event.target.value);
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
  const themeChangeHandler = (event) => {
    setTheme(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);

    console.log(event.target.value);
  };

  useEffect(() => {
    ctx.getPaintings();
  }, []);

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
    ctx.getPaintings();
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (previewUrl && name && price && paintingType && description && theme) {
      const storageRef = ref(storage, previewUrl.name);
      console.log(storageRef);
      await uploadBytes(storageRef, previewUrl).then(() => {
        console.log("file uploaded");
      });
      const responce = await getDownloadURL(storageRef);
      const url = responce;
      console.log(url);

      const dummyPortrait = {
        name: name,
        price: price,
        type: paintingType,
        theme: theme,
        description: description,
        image: url,
      };
      console.log(dummyPortrait);
      addPainting(dummyPortrait);
      ctx.getPaintings();
      setPreviewUrl(false);
      event.target.reset();
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
          <label>Type</label>
          <input
            list="paintingTypes"
            name="paintingType"
            onChange={typeChangeHandler}
          />
          <datalist id="paintingTypes">
            <option value="Portrait" />
            <option value="Landscape" />
          </datalist>
          <label htmlFor="theme">Theme</label>
          <input type="text" id="theme" onChange={themeChangeHandler} />
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
          </div>
          <Button>Accept</Button>
        </div>
        {previewUrl && paintingType === "Portrait" && (
          <Portrait
            data={{
              name: name,
              price: `$${price}`,
              description: { description },
              type: paintingType,
              image: `${imageBlob}`,
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
              image: `${imageBlob}`,
            }}
          />
        )}
      </form>
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
      {/* <img src={storageData.data["-NNC2cqo_y_mNBuKFjPg"].image} /> */}
    </div>
  );
};
//MAP NOT WORKING !!!!!!!!!!!!!!!!!!!!!!!!!
export default Admin;
