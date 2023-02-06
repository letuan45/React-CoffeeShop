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

  if (!values.rePassword || values.rePassword.trim().length === 0) {
    errors.rePassword = "Please confirm password !";
  } else if (values.rePassword !== values.password) {
    errors.rePassword = "Typed password is not valid or not equal !";
  }

  if (!values.userDisplayName || values.userDisplayName.trim().length === 0) {
    errors.userDisplayName = "Please type your name !";
  }

  return errors;
};

const RegisterForm = (props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      userDisplayName: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      props.authencation(values);
      resetForm();
    },
  });

  const AuthClasses = `${classes["modal-card"]} ${classes.register} ${
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
          Register
        </h2>
      </header>
      <div className={classes.content}>
        <form className={classes["main-form"]} onSubmit={formik.handleSubmit}>
          <Input
            name="email"
            placeholder="Your Email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            half={true}
            error={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : null
            }
          />
          <Input
            name="password"
            placeholder="Minimun 8 characters, 1 number"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            half={true}
            error={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : null
            }
          />
          <Input
            name="userDisplayName"
            placeholder="Name"
            label="Name"
            type="text"
            value={formik.values.userDisplayName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            half={true}
            error={
              formik.touched.userDisplayName && formik.errors.userDisplayName
                ? formik.errors.userDisplayName
                : null
            }
          />
          <Input
            name="rePassword"
            placeholder="Confirm Password"
            label="Confirm Password"
            type="password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            half={true}
            error={
              formik.touched.rePassword && formik.errors.rePassword
                ? formik.errors.rePassword
                : null
            }
          />
          <div className={classes["btn-group"]}>
            <NormalButton
              color="black"
              type="submit"
              disabled={props.isLoading ? true : false}
            >
              {props.isLoading ? <LoadingIcon /> : "Register"}
            </NormalButton>
          </div>
        </form>
      </div>
      <footer className={classes.footer}>
        <span>Back to Login ?</span>
        <button onClick={props.onToLogin}>To Login Form</button>
      </footer>
    </div>
  );
};

export default RegisterForm;
