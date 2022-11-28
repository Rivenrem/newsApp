import { useParams, Link, useSearchParams } from "react-router-dom";
import styles from "./singleArticle.module.scss";
import { NewsContext } from "contexts/news.context";
import { useContext, useEffect, useState } from "react";
import apiFetcher from "../helpers/apiFetcher";
import BodySpinner from "components/BodySpinner";

export default function SingleArticle() {
  const { news, setNews } = useContext(NewsContext);
  const { number, id } = useParams();
  const [searchParams] = useSearchParams();
  const [isLoading, setisLoading] = useState();

  useEffect(() => {
    if (news.articles || !searchParams.has("search")) return;

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
  }, []);

  if (!news.articles) return;

  const date = news.articles[id].publishedAt.slice(0, 10);

  return (
    <div className={styles["article"]}>
      <Link to={-1} className={styles["article__back"]}>
        Back
      </Link>
      <div className={styles["article__container"]}>
        <h2 className={styles["article__title"]}>{news.articles[id].title}</h2>
        <div className={styles["article__content"]}>
          <img
            className={styles["article__content-image"]}
            src={news.articles[id].urlToImage}
            alt="newsImg"
          ></img>
          <h3 className={styles["article__content-description"]}>
            {news.articles[id].description}
          </h3>
          <p className={styles["article__content-text"]}>
            {news.articles[id].content}
          </p>
        </div>
        <div className={styles["article__footer"]}>
          <p className={styles["article__footer-author"]}>
            {news.articles[id].author}
          </p>
          <p className={styles["article__footer-date"]}>
            {"Published: " + date}
          </p>
        </div>
      </div>
      {isLoading && <BodySpinner />}
    </div>
  );
}
