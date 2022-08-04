import React from "react";
import styles from "./CSS/loader.module.css";
import ClipLoader from "react-spinners/ClipLoader";

export function Loader() {
  return (
    <div className={styles.container}>
      <ClipLoader />
    </div>
  );
}
