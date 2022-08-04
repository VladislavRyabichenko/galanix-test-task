import React, { useState, useEffect } from "react";
import styles from "./CSS/styles.module.css";
import axios from "axios";
import Table from "../resultsTable/table";
import Loader from "../loader";
import Button from "../button";

import useLocalStorage from "../../hooks/useLocalStorage";

export function Form() {
  const [localData, setLocalData] = useLocalStorage("data", []);
  const [localInput, setLocalInput] = useLocalStorage("input", "");
  const [localSaved, setLocalSaved] = useLocalStorage("saved", []);

  const [inputVal, setInputVal] = useState(localInput);
  const [status, setStatus] = useState("idle");
  const [isErr, setIsErr] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isFound, setIsFound] = useState(false);

  const [data, setData] = useState(localData);

  const setDefaults = () => {
    setLocalInput("");
    setLocalData([]);
    setLocalSaved([]);

    setInputVal("");
    setData([]);
    setIsFound(false);
  };

  useEffect(() => {
    if (isFetching) {
      (async () => {
        try {
          setStatus("loading");
          const { data } = await axios.get(
            "http://universities.hipolabs.com/search",
            {
              params: {
                country: inputVal,
              },
            }
          );
          setLocalData(data);
          setIsFound(true);
          setData(data);
        } catch (error) {
          console.log("err");
          setIsErr(true);
        } finally {
          setStatus("idle");
          setIsFetching(false);
        }
      })();
    }
  }, [isFetching]);

  return (
    <>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Enter country name..."
            value={inputVal}
            onInput={(e) => {
              setInputVal(e.target.value);
            }}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button
            text="SEND"
            disabled={status === "loading"}
            callback={() => {
              setIsFetching(true);
              setLocalInput(inputVal);
            }}
          />
          <Button
            text="RESET"
            disabled={false}
            callback={() => {
              setDefaults();
            }}
          />
        </div>
      </div>
      <div className={styles.resultsContainer}>
        <h1>Let's find something!</h1>
        {isFound && data.length < 1 && status === "idle" && (
          <h2>Not found...</h2>
        )}
        {status === "loading" && <Loader />}
        {status === "idle" && data.length > 0 && (
          <Table
            data={data}
            localSaved={localSaved}
            setLocalSaved={setLocalSaved}
          />
        )}
      </div>
    </>
  );
}
