import React from "react";
import styles from "./CSS/button.module.css";
import classNames from "classnames";

export function Button({ text, callback, disabled }) {
  const btnClasses = classNames({ [styles.disabled]: disabled });
  return (
    <div className={styles.buttonContainer}>
      <button
        className={btnClasses}
        disabled={disabled}
        onClick={() => {
          callback();
        }}
      >
        {text}
      </button>
    </div>
  );
}
