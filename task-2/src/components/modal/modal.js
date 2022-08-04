import React from "react";
import styles from "./CSS/modal.module.css";

export function Modal({ callback, imageSrc }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt="" />
      </div>
      <div className={styles.btnContainer}>
        <button
          onClick={() => {
            callback(false);
          }}
        >
          <img src="./icons/icon-close.svg" alt="CLOSE" />
        </button>
      </div>
    </div>
  );
}
