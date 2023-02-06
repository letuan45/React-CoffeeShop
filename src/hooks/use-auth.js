import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { authActions } from "../store";

let logoutTimer;

//input: time, output: remainingTime
const calculateRemainingTime = (exprirationTime) => {
  const currentTime = new Date().getTime();
  const adjExprirationTime = new Date(exprirationTime).getTime();
  const remainingTime = adjExprirationTime - currentTime;

  return remainingTime;
};

//Take token and expiredTime from localStorage
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const expiredTime = localStorage.getItem("expiredTime");
  const userStored = JSON.parse(localStorage.getItem("user"));
  const remainingTime = calculateRemainingTime(expiredTime);

  if (remainingTime < 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiredTime");
    localStorage.removeItem("user");
    return null;
  }
  return {
    token: storedToken,
    remainingTime: remainingTime,
    user: userStored,
  };
};

const useAuth = () => {
  const dispatch = useDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout());

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, [dispatch]);

  const loginHandler = (token, exprirationTime, user) => {
    const payload = { token, exprirationTime, user };
    dispatch(authActions.login(payload));

    const remainingTime = calculateRemainingTime(exprirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  //When take token, set a time out to activate logout
  useEffect(() => {
    const tokenRetrived = retrieveStoredToken();
    if (tokenRetrived) {
      dispatch(
        authActions.applyData({
          token: tokenRetrived.token,
          user: tokenRetrived.user,
        })
      );
      logoutTimer = setTimeout(logoutHandler, tokenRetrived.remainingTime);
    }
  }, [logoutHandler, dispatch]);

  return {
    loginHandler,
    logoutHandler,
  };
};

export default useAuth;
