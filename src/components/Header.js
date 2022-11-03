import styles from "./header.module.scss";
import { useState, useContext } from "react";
import apiFetcher from "../helpers/apiFetcher";
import { NewsContext } from "../contexts/news.context";

export default function Header() {
  const [inputValue, setInputValue] = useState(0);

  const { setNews } = useContext(NewsContext);

  return (
    <div className={styles.header}>
      <input
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        className={styles["header__input"]}
        type="textarea"
        name="input"
        autoComplete="off"
        placeholder="Search..."
      ></input>

      <button
        onClick={async () => {
          setNews(await apiFetcher(inputValue));
        }}
        className={styles["header__submitbutton"]}
      >
        Go!
      </button>
    </div>
  );
}
