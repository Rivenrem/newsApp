import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { NewsContext } from "contexts/news.context";
import styles from "./page.module.scss";
import Article from "../components/Article";
import Pagination from "../components/Pagination";
import sadCat from "images/crying-cat.png";
import apiFetcher from "helpers/apiFetcher";
import BodySpinner from "components/BodySpinner";

export default function Body() {
  const { news, setNews, previousParams, setPreviousParams } =
    useContext(NewsContext);
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

    if (
      number === previousParams["number"] &&
      searchParams.get("search") === previousParams["search"] &&
      searchParams.get("articlesPerPage") ===
        previousParams["articlesPerPage"] &&
      searchParams.get("sortBy") === previousParams["sortBy"]
    )
      return;

    (async function () {
      setisLoading(true);
      setPreviousParams({
        number: number,
        search: searchParams.get("search"),
        articlesPerPage: searchParams.get("articlesPerPage"),
        sortBy: searchParams.get("sortBy"),
      });

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
  }, [setNews, searchParams, number, setPreviousParams, previousParams]);

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
          <Article
            key={article.title}
            article={article}
            articleIndex={index}
            pageNumber={number}
          />
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
