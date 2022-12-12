import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import { useDebouncedCallback } from "use-debounce";
import starImage from "images/star-svgrepo-com.svg";

const debounceDellay = 400;

export default function Header() {
  const navigate = useCallback(useNavigate(), []);
  const [searchParams] = useSearchParams();
  const [newsInput, setNewsInput] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [articlesPerPage, setArticlesPerPage] = useState(6);

  const debouncedInputHandler = useDebouncedCallback(function inputHandler(
    event
  ) {
    navigate({
      pathname: "/page/1",
      search: `?search=${event.target.value}&sortBy=${sortBy}&articlesPerPage=${articlesPerPage}`,
    });
  },
  debounceDellay);

  useEffect(() => {
    if (searchParams.has("search")) {
      setNewsInput(searchParams.get("search"));
    }
    if (searchParams.has("sortBy")) {
      setSortBy(searchParams.get("sortBy"));
    }
    if (searchParams.has("articlesPerPage")) {
      setArticlesPerPage(searchParams.get("articlesPerPage"));
    }
  }, []);

  return (
    <div className={styles.header}>
      <input
        onChange={(event) => {
          setNewsInput(event.target.value);
          debouncedInputHandler(event);
        }}
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
          onChange={(event) => {
            setArticlesPerPage(event.target.value);
            navigate({
              pathname: "/page/1",
              search: `?search=${newsInput}&sortBy=${sortBy}&articlesPerPage=${event.target.value}`,
            });
          }}
          value={articlesPerPage}
        >
          <option value="6">6</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

        <label htmlFor="select-sort">Sort by</label>
        <select
          className={styles["header__select"]}
          id="select-sort"
          onChange={(event) => {
            setSortBy(event.target.value);
            navigate({
              pathname: "/page/1",
              search: `?search=${newsInput}&sortBy=${event.target.value}&articlesPerPage=${articlesPerPage}`,
            });
          }}
          value={sortBy}
        >
          <option value="relevancy">relevancy</option>
          <option value="popularity">popularity</option>
          <option value="publishedAt">published at</option>
        </select>
      </div>
      <button
        className={styles["header__favorites"]}
        onClick={() => {
          if (JSON.parse(localStorage.getItem("favorites")).length) {
            navigate({
              pathname: "/favorites",
            });
          }
        }}
      >
        <img
          src={starImage}
          id="star"
          alt="star"
          className={styles["header__favorites-image"]}
        ></img>
        <p className={styles["header__favorites-paragraph"]}>Favorites</p>
      </button>
    </div>
  );
}
