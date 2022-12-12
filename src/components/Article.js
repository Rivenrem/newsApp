import styles from "./article.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import starImage from "images/star-svgrepo-com.svg";
import inactiveStarImage from "../images/star-inactive.com.svg";
import { useState } from "react";

export default function Articles({ article, articleIndex, pageNumber }) {
  const date = article.publishedAt.slice(0, 10);
  const [searchParams] = useSearchParams();
  const [buttonImage, setButtonImage] = useState(
    localStorage.getItem("favorites") &&
      JSON.parse(localStorage.getItem("favorites")).some(
        (element) => element.title === article.title
      )
      ? starImage
      : inactiveStarImage
  );

  return (
    <div className={styles["article"]}>
      <button
        className={styles["article__favorite-button"]}
        onClick={() => {
          if (!localStorage.getItem("favorites")) {
            localStorage.setItem("favorites", "[]");
          }

          const favoritesStorage = JSON.parse(
            localStorage.getItem("favorites")
          );

          const favoriteArticleIndex = favoritesStorage.findIndex(
            (element) => element.title === article.title
          );

          if (favoriteArticleIndex !== -1) {
            favoritesStorage.splice(favoriteArticleIndex, 1);
            setButtonImage(inactiveStarImage);
          } else {
            favoritesStorage.push({
              title: article.title,
              urlToImage: article.urlToImage,
              author: article.author,
              content: article.content,
            });
            setButtonImage(starImage);
          }
          localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
        }}
      >
        <img
          src={buttonImage}
          alt="star"
          className={styles["article__favorite-image"]}
        ></img>
      </button>
      <Link
        className={styles["article__link"]}
        to={`/page/${pageNumber}/article/${articleIndex}?search=${searchParams.get(
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
