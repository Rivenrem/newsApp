import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { NewsContext } from "contexts/news.context";
import styles from "./page.module.scss";
import Article from "../components/Article";
import Pagination from "../components/Pagination";
import sadCat from "images/crying-cat.png";
import apiFetcher from "helpers/apiFetcher";
import BodySpinner from "components/BodySpinner";

export default function Body() {
  const { news, setNews } = useContext(NewsContext);
  const [isLoading, setisLoading] = useState(false);
  const { number } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (
      !searchParams.has("search") ||
      !searchParams.has("articlesPerPage") ||
      !searchParams.has("sortBy")
    ) {
      return;
    }

    (async function () {
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
    })();
  }, [setNews, searchParams, number]);

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

  const numberOfPages = Math.ceil(
    news.totalResults / searchParams.get("articlesPerPage")
  );

  return (
    <div className={styles["body"]}>
      <div className={styles["body__articles"]}>
        {news.articles.map((article, index) => (
          <Link
            className={styles["body__articles-link"]}
            key={index}
            to={`/page/${number}/article/${index}?search=${searchParams.get(
              "search"
            )}&sortBy=${searchParams.get(
              "sortBy"
            )}&articlesPerPage=${searchParams.get("articlesPerPage")}`}
          >
            <Article article={article} />
          </Link>
        ))}
      </div>
      {isLoading && <BodySpinner />}
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={+number}
        setCurrentPage={(page) => {
          navigate({
            pathname: `/page/${page}`,
            search: `?search=${searchParams.get(
              "search"
            )}&sortBy=${searchParams.get(
              "sortBy"
            )}&articlesPerPage=${searchParams.get("articlesPerPage")}`,
          });
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
