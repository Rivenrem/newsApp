import styles from "./header.module.css";
import { useState, useContext } from "react";
import apiFetcher from "../helpers/apiFetcher";
import { NewsContext } from "../contexts/news.context";

export default function Header() {
  const [inputValue, setInputValue] = useState(0);

  const { setNews } = useContext(NewsContext);

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
          onClick={async () => {
            setNews(await apiFetcher(inputValue));
          }}
          className={styles["submit-button"]}
        >
          Go!
        </button>
      </div>
    </div>
  );
}
