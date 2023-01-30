import React from "react";

const RegisterContext = React.createContext({
  registrationData: () => {},
  registeredUsersData: {},
  userIsLoggedInHandler: {},
  userIsLoggedIn: {},
});

export default RegisterContext;
