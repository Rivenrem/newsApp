import styles from "./article.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import starImage from "images/star-svgrepo-com.svg";
import inactiveStarImage from "../images/star-inactive.com.svg";
import { useState } from "react";

export default function Articles({ article, index, number }) {
  const date = article.publishedAt.slice(0, 10);
  const [searchParams] = useSearchParams();
  const [favorites, setFavorites] = useState(
    localStorage.getItem(article.title) ? starImage : inactiveStarImage
  );

  return (
    <div className={styles["article"]}>
      <button
        className={styles["article__favorite-button"]}
        onClick={() => {
          if (!localStorage.getItem(article.title)) {
            localStorage.setItem(
              article.title,
              JSON.stringify({
                title: article.title,
                urlToImage: article.urlToImage,
                author: article.author,
                content: article.content,
              })
            );
            setFavorites(starImage);
          } else {
            localStorage.removeItem(article.title);
            setFavorites(inactiveStarImage);
          }
        }}
      >
        <img
          src={favorites}
          alt="star"
          className={styles["article__favorite-image"]}
        ></img>
      </button>
      <Link
        className={styles["article__link"]}
        to={`/page/${number}/article/${index}?search=${searchParams.get(
          "search"
        )}&sortBy=${searchParams.get(
          "sortBy"
        )}&articlesPerPage=${searchParams.get("articlesPerPage")}`}
      >
        <h2 className={styles["article__title"]}>{article.title}</h2>
        <div className={styles["article__content"]}>
          <img
            className={styles["article__img"]}
            src={article.urlToImage}
            alt="newsImg"
          ></img>
        </div>
        <div className={styles["article__footer"]}>
          <p className={styles["article__footer-author"]}>{article.author}</p>
          <p className={styles["article__footer-date"]}>
            {"Published: " + date}
          </p>
        </div>
      </Link>
    </div>
  );
}
