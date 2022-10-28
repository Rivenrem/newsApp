import styles from "./header.module.css";
import { useState } from "react";
import apiFetcher from "../helpers/apiFetcher";

export default function Header() {
  const [inputValue, setInputValue] = useState(0);
  return (
    <div className={styles.header}>
      <div className={styles["input-container"]}>
        <input
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          className={styles["header-input"]}
          type="textarea"
          name="input"
          autoComplete="off"
          placeholder="Search..."
        ></input>

        <button
          onClick={() => {
            apiFetcher(inputValue);
          }}
          className={styles["submit-button"]}
        >
          Go!
        </button>
      </div>
    </div>
  );
}
