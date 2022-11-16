import { useParams, Link } from "react-router-dom";
import styles from "./singleArticle.module.scss";
import { NewsContext } from "contexts/news.context";
import { useContext } from "react";

export default function SingleArticle() {
  const { news } = useContext(NewsContext);
  const { id } = useParams();
  const date = news.articles[id].publishedAt.slice(0, 10);

  return (
    <div className={styles["article"]}>
      <Link to={"/"} className={styles["article__back"]}>
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
    </div>
  );
}
