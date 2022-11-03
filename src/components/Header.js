import styles from "./header.module.scss";
import { useState, useContext } from "react";
import apiFetcher from "../helpers/apiFetcher";
import { NewsContext } from "../contexts/news.context";
import debounce from "../helpers/debounce";
// import Spinner from "./Spinner";

export default function Header() {
  const [isSearching, setIsSearching] = useState(false);
  const { setNews } = useContext(NewsContext);

  async function inputHandler(event) {
    if (!event.target.value) return;
    setIsSearching(true);
    setNews(await apiFetcher(event.target.value));
    setIsSearching(false);
  }

  return (
    <div className={styles.header}>
      <input
        onChange={debounce(inputHandler, 500)}
        className={styles["header__input"]}
        type="textarea"
        name="input"
        autoComplete="off"
        placeholder="Search..."
      ></input>
      {isSearching && <div className={styles["header__spinner"]}></div>}
    </div>
  );
}
