import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styles from "./header.module.scss";
import { useDebouncedCallback } from "use-debounce";
import starImage from "images/star-svgrepo-com.svg";
import ThemeToggle from "./ThemeToggle";
import Selector from "./Selector";

const debounceDellay = 400;

export default function Header({ lightTheme, setLightTheme }) {
  const navigate = useCallback(useNavigate(), []);
  const [searchParams] = useSearchParams();
  const [newsInput, setNewsInput] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [articlesPerPage, setArticlesPerPage] = useState(6);

  const onChangeArticlesPerPage = function (event) {
    setArticlesPerPage(event.target.value);
    navigate({
      pathname: "/page/1",
      search: `?search=${newsInput}&sortBy=${sortBy}&articlesPerPage=${event.target.value}`,
    });
  };

  const onChangeSortBy = function (event) {
    setSortBy(event.target.value);
    navigate({
      pathname: "/page/1",
      search: `?search=${newsInput}&sortBy=${event.target.value}&articlesPerPage=${articlesPerPage}`,
    });
  };

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
      <div className={styles["header__themesetLightTheme"]}>
        <ThemeToggle
          defaultValue={lightTheme}
          toggle={(value) => {
            setLightTheme(value);
          }}
        />
      </div>

      <div className={styles["header__inputs"]}>
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
          <Selector
            labelText={"Articles per page"}
            onChange={onChangeArticlesPerPage}
            defaultValue={articlesPerPage}
            values={[6, 10, 20]}
          />

          <Selector
            labelText={"Sort by"}
            onChange={onChangeSortBy}
            defaultValue={sortBy}
            values={["relevancy", "popularity", "published at"]}
          />
        </div>
      </div>

      <button
        className={styles["header__favorites"]}
        onClick={() => {
          navigate({
            pathname: "/favorites",
          });
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
