import React, { useEffect, useRef, useState } from "react";
import styles from "./CSS/table.module.css";
import Item from "../item";
import TableHeader from "../table-header";

export function Table({ data, localSaved, setLocalSaved }) {
  const [counter, setCounter] = useState(localSaved.length);
  const [saved, setSaved] = useState(localSaved);

  const handleClick = (e) => {
    e.stopPropagation();
    if (e.target.tagName === "INPUT") {
      const name = e.target.parentNode.parentNode.id;

      if (e.target.checked) {
        setSaved([...saved, name]);
        setCounter(counter + 1);
      } else {
        const newVal = saved.filter((item) => item !== name);
        setSaved(newVal);
        setCounter(counter - 1);
      }
    }
  };

  useEffect(() => {
    setLocalSaved(saved);
  }, [saved]);

  return (
    <>
      <div className={styles.counterContainer}>
        <span>
          Saved list counter: <span>{counter}</span>
        </span>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table} onClick={(e) => handleClick(e)}>
          <TableHeader />
          <tbody>
            {data.map((item, idx) => {
              return (
                <Item
                  key={idx}
                  item={item}
                  counter={idx + 1}
                  checked={saved.includes(item["name"])}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
