import { useState, useContext } from "react";
import { NewsContext } from "contexts/news.context";
import { useDebouncedCallback } from "use-debounce";
import styles from "./header.module.scss";
import HeaderSpinner from "./HeaderSpinner";
import apiFetcher from "helpers/apiFetcher";

const debounceDelay = 500;

export default function Header() {
  const [isLoading, setisLoading] = useState(false);
  const { setNews, setNewsInput } = useContext(NewsContext);

  async function inputHandler(event) {
    if (!event.target.value) return;

    setisLoading(true);
    setNewsInput(event.target.value);
    setNews(await apiFetcher(event.target.value));
    setisLoading(false);
  }

  return (
    <div className={styles.header}>
      <input
        onChange={useDebouncedCallback(inputHandler, debounceDelay)}
        className={styles["header__input"]}
        type="textarea"
        name="input"
        autoComplete="off"
        placeholder="Search..."
      ></input>
      {isLoading && <HeaderSpinner />}
    </div>
  );
}
