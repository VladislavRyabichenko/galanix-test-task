import React from "react";
import styles from "./CSS/header.module.css";

export function TableHeader() {
  return (
    <thead>
      <tr className={styles.header}>
        <th>ID</th>
        <th>Country code</th>
        <th>Country</th>
        <th>Name</th>
        <th>Domains</th>
        <th>Web pages</th>
        <th>Check box</th>
      </tr>
    </thead>
  );
}
