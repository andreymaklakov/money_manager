import React from "react";
import { Redirect } from "react-router-dom";
import { useProviderContext } from "./context";

const withLogin = (Component) => (props) => {
  const { signedUser } = useProviderContext();

  return <>{signedUser ? <Component {...props} /> : <Redirect to="/main" />}</>;
};

export default withLogin;
