import React from "react";

const RegisterContext = React.createContext({
  registrationData: () => {},
  registeredUsers: {},
});

export default RegisterContext;
