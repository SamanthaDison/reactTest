import React, { useEffect, useState } from "react";
import { AuthService } from "../services/AuthService.js";

const AuthGuard = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem('user-token');
    if (!userToken || userToken === 'undefined') {
      setIsLoggedIn(false);
      return AuthService.loginWithRedirect({
        appState: {
          // if auth fails, redirects to original route
          targetUrl: location.hash
        }
      })
    }
    setIsLoggedIn(true);
  }
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    // if you are logged in, returns this fragment
    <React.Fragment>
      {
        // if logged in, render children, otherwise don't lol
        // eslint-disable-next-line react/prop-types

        isLoggedIn ? props.children : null
      }
    </React.Fragment>
  );
}
export default AuthGuard;