import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

import useHttp from "../../../hooks/use-http";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import useAuth from "../../../hooks/use-auth";
import { modalActions } from "../../../store/index";

const urlRegister =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHGRTkgFb7vKJmO9UZHDfWSgKoXsq_w9o";

const urlLogin =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHGRTkgFb7vKJmO9UZHDfWSgKoXsq_w9o";

const userURL =
  "https://coffee-shop-818d1-default-rtdb.asia-southeast1.firebasedatabase.app/User.json";

const updateUserUrl =
  "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDHGRTkgFb7vKJmO9UZHDfWSgKoXsq_w9o";

const AuthModal = (props) => {
  const dispatch = useDispatch();
  const [isInRegister, setIsInRegister] = useState(false);
  const [notify, setNotify] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { loginHandler } = useAuth();

  //Use for create new user
  const { fetchHandler: fetchUser } = useHttp();

  const toRegisterHandler = () => {
    setIsInRegister(true);
  };

  const toLoginHandler = () => {
    setIsInRegister(false);
  };

  const authenticationHandler = (values) => {
    setIsLoading(true);
    let url;
    if (isInRegister) {
      url = urlRegister;
    } else {
      url = urlLogin;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else {
          const data = await res.json();
          //Show error
          let errorMessage = "Authentication failed !";
          if (data && data.error) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        }
      })
      .then((data) => {
        if (isInRegister) {
          //Reate new user in firebase
          fetchUser(
            {
              url: userURL,
              method: "POST",
              body: {
                email: values.email,
                userDisplayName: values.userDisplayName,
              },
              header: {
                "Content-Type": "application/json",
              },
            },
            () => {}
          );

          //Update displayName
          fetch(updateUserUrl, {
            method: "POST",
            body: JSON.stringify({
              idToken: data.idToken,
              displayName: values.userDisplayName,
              photoUrl: "",
              deleteAttribute: [],
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                throw new Error(data.error);
              }
            });
          setNotify({ type: "success", message: "Register successfully !" });
        } else {
          fetchUser({ url: userURL }, (dbUser) => {
            //get user
            let userId;
            for (let i in dbUser) {
              if (dbUser[i].email === data.email) {
                userId = i;
              }
            }
            const user = {
              id: userId,
              email: data.email,
              displayName: data.displayName,
            };
            const expirationTime = new Date(
              new Date().getTime() + +data.expiresIn * 1000
            );

            loginHandler(data.idToken, expirationTime.toISOString(), {
              ...user,
            });
            setNotify({ type: "success", message: "Login successfully !" });
            dispatch(modalActions.closeAuth());
          });
        }
      })
      .catch((err) => {
        setNotify({ type: "error", message: err.message });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const hideNotify = setTimeout(() => {
      setNotify(false);
    }, 4000);

    return () => {
      clearTimeout(hideNotify);
    };
  }, [notify]);

  if (!isInRegister) {
    return (
      <React.Fragment>
        {ReactDOM.createPortal(
          <LoginForm
            className={props.className}
            onClose={props.onClose}
            onToRegister={toRegisterHandler}
            authencation={authenticationHandler}
            notify={notify ? notify : null}
            isLoading={isLoading}
          />,
          document.getElementById("overlay-root")
        )}
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <RegisterForm
          className={props.className}
          onClose={props.onClose}
          onToLogin={toLoginHandler}
          authencation={authenticationHandler}
          notify={notify ? notify : null}
          isLoading={isLoading}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default AuthModal;
