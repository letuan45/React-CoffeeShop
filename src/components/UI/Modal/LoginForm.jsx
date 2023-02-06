import { useFormik } from "formik";

import classes from "./AuthModal.module.css";
import leafPattern from "../../../assets/leaves_pattern.png";
import Input from "../Input/Input";
import NormalButton from "../Button/NormalButton";
import Notify from "./Notify";
import LoadingIcon from "../../LoadingIcon/LoadingIcon";

const validate = (values) => {
  const errors = {};

  if (!values.email || values.email.trim().length === 0) {
    errors.email = "Please type your email !";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Email is not valid !";
  }

  if (!values.password || values.password.trim().length === 0) {
    errors.password = "Please type your password !";
  } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(values.password)) {
    errors.password = "Password is not valid !";
  }

  return errors;
};

const LoginForm = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      props.authencation(values);
      resetForm();
    },
  });

  const AuthClasses = `${classes["modal-card"]} ${
    props.className ? classes[`${props.className}`] : ""
  }`;

  return (
    <div className={AuthClasses}>
      {props.notify && <Notify notify={props.notify} />}
      <button className={classes.close} onClick={props.onClose}>
        <i className="fa-solid fa-xmark"></i>
      </button>
      <header className={classes.header}>
        <h2
          style={{
            backgroundImage: `url(${leafPattern})`,
          }}
          className={classes["header-content"]}
        >
          Login
        </h2>
      </header>
      <div className={classes.content}>
        <form className={classes["login-form"]} onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            placeholder="Your Email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
          <Input
            name="password"
            placeholder="Your Password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />
          <div className={classes["btn-group"]}>
          <NormalButton
              color="black"
              type="submit"
              disabled={props.isLoading ? true : false}
            >
              {props.isLoading ? <LoadingIcon /> : "Login"}
            </NormalButton>
          </div>
        </form>
      </div>
      <footer className={classes.footer}>
        <span>Doesn't have any account ?</span>
        <button onClick={props.onToRegister}>Register</button>
      </footer>
    </div>
  );
};

export default LoginForm;