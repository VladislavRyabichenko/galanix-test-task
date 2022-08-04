import React from "react";
import styles from "./CSS/item.module.css";

export function Item({ item, counter, checked }) {
  return (
    <tr id={item["name"]}>
      <td>{counter}</td>
      <td>{item["alpha_two_code"]}</td>
      <td>{item["country"]}</td>
      <td>{item["name"]}</td>
      <td>{item["domains"][0]}</td>
      <td>{item["web_pages"].join("\n")}</td>
      <td>
        <input readOnly={true} defaultChecked={checked} type="checkbox" />
      </td>
    </tr>
  );
}
