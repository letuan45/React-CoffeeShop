import React, { useState, useEffect, useImperativeHandle, useRef } from "react";
import classes from "./NumberInput.module.css";

const NumberInput = React.forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
  const setNewQuantity = props.setNewQuantity ? props.setNewQuantity : null;

  const inputRef = useRef();

  useImperativeHandle(ref, () => {
    return {
        value: inputRef.current.value    
    };
  });

  useEffect(() => {
    if(setNewQuantity) {
      setNewQuantity(value);
    }
  }, [value, setNewQuantity]);

  const increase = (event) => {
    event.preventDefault();

    if (value < props.quantity) {
      setValue((prevValue) => prevValue + 1);
    }
  };

  const decrease = (event) => {
    event.preventDefault();

    if (value > 1) {
      setValue((prevValue) => prevValue - 1);
    }
  };

  const changeValueHandler = (event) => {
    const oldValue = props.value;
    const targetValue = event.target.value;

    if (targetValue > 0 && targetValue < props.quantity) {
      setValue(event.target.value);
    } else {
      setValue(oldValue);
    }
  };

  return (
    <div
      className="d-flex"
      style={{ position: "relative", width: "fit-content" }}
    >
      <input
        ref={inputRef}
        type="number"
        step="1"
        min="1"
        max={props.quantity}
        value={value}
        className={classes["control-input"]}
        onChange={changeValueHandler}
      ></input>
      <div className={classes["controls"]}>
        <button onClick={increase}>
          <i className="fa-sharp fa-solid fa-chevron-up"></i>
        </button>
        <button onClick={decrease}>
          <i className="fa-sharp fa-solid fa-chevron-down"></i>
        </button>
      </div>
    </div>
  );
});

export default NumberInput;
