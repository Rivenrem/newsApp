import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { NewsContext } from "contexts/news.context";
import styles from "./page.module.scss";
import Article from "../components/Article";
import Pagination from "../components/Pagination";
import sadCat from "images/crying-cat.png";
import apiFetcher from "helpers/apiFetcher";
import BodySpinner from "components/BodySpinner";

const debounceDellay = 400;

export default function Body() {
  const { news, newsInput, articlesPerPage, sortBy, setNews } =
    useContext(NewsContext);
  const [isLoading, setisLoading] = useState(false);
  const { number } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const debouncedNewsSetter = useDebouncedCallback(async function () {
    setisLoading(true);
    setNews(
      await apiFetcher(
        searchParams.get("search"),
        number,
        searchParams.get("articlesPerPage"),
        searchParams.get("sortBy")
      )
    );
    setisLoading(false);
  }, debounceDellay);

  useEffect(() => {
    setSearchParams({
      search: `${newsInput}`,
      sortBy: `${sortBy}`,
      articlesPerPage: `${articlesPerPage}`,
    });

    if (!searchParams.get("search")) return;

    debouncedNewsSetter();
  }, [
    searchParams,
    debouncedNewsSetter,
    setSearchParams,
    newsInput,
    articlesPerPage,
    number,
    sortBy,
    setNews,
  ]);

  if (!news.articles) {
    return;
  }
  if (!news.articles.length) {
    return (
      <div className={styles["body__error"]}>
        <p>I c...c...can't find anything !</p>
        <img src={sadCat} alt="crying-cat"></img>
      </div>
    );
  }

  const numberOfPages = Math.ceil(news.totalResults / articlesPerPage);

  return (
    <div className={styles["body"]}>
      <div className={styles["body__articles"]}>
        {news.articles.map((article, index) => (
          <Link
            className={styles["body__articles-link"]}
            key={index}
            to={`/page/${number}/article/${index}`}
          >
            <Article article={article} />
          </Link>
        ))}
      </div>
      {isLoading && <BodySpinner />}
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={+number}
        setCurrentPage={async (page) => {
          navigate(`../page/${page}`);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
