import React, { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Slider from "./components/slider/Slider";
import Shop from "./components/shop/Shop";
import Register from "./components/header/authentication/Register";
import Login from "./components/header/authentication/Login";
import RegisterContext from "./store/register-context";
import UserProfile from "./components/header/UserProfile";
import Admin from "./components/admin/Admin";
import PaintingsContext from "./store/paintings-context";
import Basket from "./components/header/Basket";
import {
  firebaseUrl,
  adminFirebase,
  storage,
} from "./components/admin/firebase/firebase";
function App() {
  const [loginFormIsShown, setLoginFormIsShown] = useState(false);
  const [registerFormIsShown, setRegisterFormIsShown] = useState(false);
  const [userProfileIsShown, setUserProfileIsShown] = useState(false);
  const [paintingsData, setPaintingsData] = useState([]);
  const [basketIsShown, setBasketIsShown] = useState(false);
  const loggedInDefault = { email: " ", isLoggedIn: false };

  useEffect(() => {
    const localStorageUserStatus = localStorage.getItem("isLoggedIn");
    const localStorageUserEmail = localStorage.getItem("email");
    if (localStorageUserStatus === "true") {
      dispatchloggedIn({
        email: localStorageUserEmail,
        isLoggedIn: "true",
      });
    } else if (localStorageUserStatus === "false") {
      dispatchloggedIn({ email: " ", isLoggedIn: false });
    }
  }, []);
  const loggedInReducer = (state, action) => {
    return { email: action.email, isLoggedIn: action.isLoggedIn };
  };
  /// not working localStorage
  const [loggedIn, dispatchloggedIn] = useReducer(
    loggedInReducer,
    loggedInDefault
  );

  const showLoginForm = () => {
    setLoginFormIsShown(true);
  };

  const hideLoginForm = () => {
    setLoginFormIsShown(false);
  };
  const showRegisterForm = () => {
    setRegisterFormIsShown(true);
  };
  const hideRegisterForm = () => {
    setRegisterFormIsShown(false);
  };

  const showUserProfile = () => {
    setUserProfileIsShown(true);
  };
  const hideUserProfile = () => {
    setUserProfileIsShown(false);
  };
  const showBasket = () => {
    setBasketIsShown(true);
  };

  const hideBasket = () => {
    setBasketIsShown(false);
  };

  const registeredUsersReducer = (state, action) => {
    return { response: action.response };
  };
  // if (localStorage.getItem("isLoggedIn" === "true")) {
  //   setIsLoggedIn({ email: emailVal, isLoggedIn: true });
  // }
  const isLoggedInHandler = (emailVal, isLoggedInVal) => {
    dispatchloggedIn({ email: emailVal, isLoggedIn: isLoggedInVal });
  };
  const [registeredUsers, dispatchRegisteredUsers] = useReducer(
    registeredUsersReducer,
    { response: [] }
  );

  const basketReducer = (state, action) => {
    if (action.type === "ADD") {
      const updatedTotalAmount =
        state.totalAmount + action.painting[0].price * 1;
      let updatedPaintings;
      const existingPaintingIndex = state.paintings.findIndex(
        (item) => item.id === action.painting[0].id
      );
      const existingPainting = state.paintings[existingPaintingIndex];
      if (existingPainting) {
        const updatedPainting = {
          ...existingPainting,
          amount: existingPainting.amount + 1,
        };
        updatedPaintings = [...state.paintings];
        updatedPaintings[existingPaintingIndex] = updatedPainting;
      } else {
        updatedPaintings = state.paintings.concat(action.painting);
      }

      return {
        paintings: updatedPaintings,
        totalAmount: updatedTotalAmount,
      };
    } else if (action.type === "REMOVE") {
      let updatedPaintings;
      const existingPaintingIndex = state.paintings.findIndex(
        (item) => item.id === action.painting[0].id
      );
      const existingPainting = state.paintings[existingPaintingIndex];
      const updatedTotalAmount = state.totalAmount - existingPainting.price;
      if (existingPainting.amount === 1) {
        updatedPaintings = state.paintings.filter(
          (painting) => painting.id !== action.painting[0].id
        );
      } else {
        const updatedPainting = {
          ...existingPainting,
          amount: existingPainting.amount - 1,
        };
        updatedPaintings = [...state.paintings];
        updatedPaintings[existingPaintingIndex] = updatedPainting;
      }
      return { paintings: updatedPaintings, totalAmount: updatedTotalAmount };
    } else if (action.type === "ORDERED") {
      return { paintings: [], totalAmount: 0 };
    }
  };
  const [basketItem, dispatchBasketItem] = useReducer(basketReducer, {
    painting: [],
    paintings: [],
    totalAmount: 0,
  });

  const fetchUsersHandler = useCallback(async () => {
    const response = await fetch(`${firebaseUrl}/users.json`);
    const data = await response.json();

    dispatchRegisteredUsers({ response: data });
  }, []);

  useEffect(() => {
    fetchUsersHandler();
  }, [fetchUsersHandler]);

  async function addRegisteredUserHandler(registrationData) {
    const response = await fetch(`${firebaseUrl}/users.json`, {
      method: "POST",
      body: JSON.stringify(registrationData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    fetchUsersHandler();
  }

  const getStoreDataHandler = useCallback(async () => {
    const response = await fetch(`${firebaseUrl}/store.json`);
    const data = await response.json();

    const loadedData = [];

    for (const key in data) {
      loadedData.push({
        id: key,
        price: data[key].price,
        name: data[key].name,
        description: data[key].description,
        type: data[key].type,
        image: data[key].image,
        theme: data[key].theme,
      });
    }

    setPaintingsData(loadedData);
  }, []);
  useEffect(() => {
    getStoreDataHandler();
  }, []);
  return (
    <PaintingsContext.Provider
      value={{
        getPaintings: getStoreDataHandler,
        paintings: paintingsData,
        basketItems: basketItem,
        addBasketItem: dispatchBasketItem,
        removeBasketItem: dispatchBasketItem,
      }}
    >
      <RegisterContext.Provider
        value={{
          registrationData: addRegisteredUserHandler,
          registeredUsersData: registeredUsers,
          userIsLoggedInHandler: isLoggedInHandler,
          userIsLoggedIn: loggedIn,
        }}
      >
        {loginFormIsShown && !registerFormIsShown && (
          <Login
            onClose={hideLoginForm}
            onShowRegisterForm={showRegisterForm}
          />
        )}
        {registerFormIsShown && <Register onClose={hideRegisterForm} />}
        {userProfileIsShown && <UserProfile onClose={hideUserProfile} />}
        {basketIsShown && <Basket onClose={hideBasket} />}
        <Header
          onShowloginForm={showLoginForm}
          onShowUserProfile={showUserProfile}
          onShowBasket={showBasket}
        ></Header>
      </RegisterContext.Provider>
      {loggedIn.email === adminFirebase && <Admin />}
      <Slider />
      <Shop />
    </PaintingsContext.Provider>
  );
}
export default App;
