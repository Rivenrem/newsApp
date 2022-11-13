import { useState, useContext } from "react";
import { NewsContext } from "contexts/news.context";
import { useDebouncedCallback } from "use-debounce";
import styles from "./header.module.scss";
import HeaderSpinner from "./HeaderSpinner";
import apiFetcher from "helpers/apiFetcher";

const debounceDelay = 500;

export default function Header() {
  const [isLoading, setisLoading] = useState(false);
  const {
    setNews,
    setNewsInput,
    newsInput,
    articlesPerPage,
    setArticlesPerPage,
    sortBy,
    setSortBy,
  } = useContext(NewsContext);

  async function inputHandler(event) {
    if (!event.target.value) return;

    setisLoading(true);
    setNewsInput(event.target.value);
    setNews(await apiFetcher(event.target.value, 1, articlesPerPage));
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

      <div className={styles["header__articles-selectors"]}>
        <label for="select-articles-per-page">Articles per page</label>
        <select
          className={styles["header__select"]}
          id="select-articles-per-page"
          onChange={async (event) => {
            setisLoading(true);
            setArticlesPerPage(event.target.value);
            setNews(await apiFetcher(newsInput, 1, event.target.value, sortBy));
            setisLoading(false);
          }}
        >
          <option value="6" selected>
            6
          </option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <label for="select-sort">Sort by</label>
        <select
          className={styles["header__select"]}
          id="select-sort"
          onChange={async (event) => {
            setisLoading(true);
            setSortBy(event.target.value);
            setNews(
              await apiFetcher(
                newsInput,
                1,
                articlesPerPage,
                event.target.value
              )
            );
            setisLoading(false);
          }}
        >
          <option value="relevancy">relevancy</option>
          <option value="popularity" selected>
            popularity
          </option>
          <option value="publishedAt">published at</option>
        </select>
      </div>

      {isLoading && <HeaderSpinner />}
    </div>
  );
}
