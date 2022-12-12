import styles from "./article.module.scss";
import { Link, useSearchParams } from "react-router-dom";
import starImage from "images/star-svgrepo-com.svg";
import inactiveStarImage from "../images/star-inactive.com.svg";
import { useState } from "react";

export default function Articles({ article, articleIndex, pageNumber }) {
  let currentIndexInStorage;
  const date = article.publishedAt.slice(0, 10);
  const [searchParams] = useSearchParams();
  const [buttonImage, setButtonImage] = useState(
    JSON.parse(localStorage.getItem("favorites")).some(isAlreadyInStorage)
      ? starImage
      : inactiveStarImage
  );

  function isAlreadyInStorage(element, index) {
    currentIndexInStorage = index;
    return element.title === article.title;
  }

  return (
    <div className={styles["article"]}>
      <button
        className={styles["article__favorite-button"]}
        onClick={() => {
          if (!localStorage.getItem("favorites")) {
            const favorites = [];
            localStorage.setItem("favorites", JSON.stringify(favorites));
          }

          const favoritesStorage = JSON.parse(
            localStorage.getItem("favorites")
          );

          if (favoritesStorage.some(isAlreadyInStorage)) {
            favoritesStorage.splice(currentIndexInStorage, 1);
            localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
            setButtonImage(inactiveStarImage);
          } else {
            favoritesStorage.push({
              title: article.title,
              urlToImage: article.urlToImage,
              author: article.author,
              content: article.content,
            });
            localStorage.setItem("favorites", JSON.stringify(favoritesStorage));
            setButtonImage(starImage);
          }
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
