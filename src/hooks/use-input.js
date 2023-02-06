import { useReducer } from "react";

const innitialState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return { value: action.value, isTouched: true };
  }
  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return innitialState;
};

const useInput = (validateFn) => {
  const [inputState, inputDispatcher] = useReducer(inputReducer, innitialState);

  const inputChangeHandler = (event) => {
    inputDispatcher({ type: "CHANGE", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    inputDispatcher({ type: "BLUR" });
  };

  const inputResetHandler = (event) => {
    inputDispatcher({ type: "RESET" });
  };

  const valueIsValid = validateFn(inputState.value);
  const hasError = inputState.isTouched && !valueIsValid;

  return {
    value: inputState.value,
    valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    inputResetHandler,
  };
};

export default useInput;
