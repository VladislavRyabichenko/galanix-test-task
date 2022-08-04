import React, { useEffect, useState } from "react";
import styles from "./CSS/header.module.css";
import { getDate } from "../../helpers/getDate";

export function Header() {
  const [data, setData] = useState(getDate());

  useEffect(() => {
    (function () {
      setInterval(() => {
        setData(getDate);
      }, 1000);
    })();
  }, []);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.dateContainer}>
        <span>Date: {`${data.number}.${data.month}.${data.year}`}</span>
        <span>Time: {`${data.hours}:${data.mins}:${data.sec}`}</span>
      </div>
    </div>
  );
}
