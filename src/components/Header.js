import { useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { NewsContext } from "contexts/news.context";
import styles from "./header.module.scss";
import apiFetcher from "helpers/apiFetcher";

export default function Header() {
  const {
    setNews,
    setNewsInput,
    newsInput,
    articlesPerPage,
    setArticlesPerPage,
    sortBy,
    setSortBy,
  } = useContext(NewsContext);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function inputHandler(event) {
    setNewsInput(event.target.value);
    navigate(`../page/1`);
  }

  useEffect(() => {
    if (searchParams.has("search")) {
      setNewsInput(searchParams.get("search"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.header}>
      <input
        onChange={inputHandler}
        className={styles["header__input"]}
        type="textarea"
        name="input"
        autoComplete="off"
        placeholder="Search..."
        value={newsInput}
      ></input>

      <div className={styles["header__articles-selectors"]}>
        <label htmlFor="select-articles-per-page">Articles per page</label>
        <select
          className={styles["header__select"]}
          id="select-articles-per-page"
          onChange={async (event) => {
            setArticlesPerPage(event.target.value);
            setNews(await apiFetcher(newsInput, 1, event.target.value, sortBy));
          }}
        >
          <option value="6" defaultValue>
            6
          </option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <label htmlFor="select-sort">Sort by</label>
        <select
          className={styles["header__select"]}
          id="select-sort"
          onChange={async (event) => {
            setSortBy(event.target.value);
            setNews(
              await apiFetcher(
                newsInput,
                1,
                articlesPerPage,
                event.target.value
              )
            );
          }}
          defaultValue="popularity"
        >
          <option value="relevancy">relevancy</option>
          <option value="popularity">popularity</option>
          <option value="publishedAt">published at</option>
        </select>
      </div>
    </div>
  );
}
