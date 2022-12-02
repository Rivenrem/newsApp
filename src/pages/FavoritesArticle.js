import styles from "./favoritesArticle.module.scss";
import { useState } from "react";
import trashCan from "images/garbage-bin-trash-can-svgrepo-com.svg";

export default function FavoritesArticle({ article }, index) {
  const [showMore, setShowMore] = useState("false");
  const [remove, setRemove] = useState(false);

  if (!localStorage.getItem(article.title)) return;
  return (
    <div className={styles["article"]} key={index}>
      <img
        src={trashCan}
        className={styles["article-trashCan"]}
        alt="trashCan"
        onClick={() => {
          localStorage.removeItem(article.title);
          setRemove(!remove);
        }}
      ></img>
      <div className={styles["article__mainPart"]}>
        <h2 className={styles["article__mainPart-title"]}>{article.title}</h2>
        <img
          className={styles["article__mainPart-img"]}
          src={article.urlToImage}
          alt="newsImg"
        ></img>
        <button
          className={styles["article__mainPart-moreButton"]}
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          Learn more
        </button>
      </div>
      <div
        className={styles["article__footer"]}
        style={showMore ? { display: "none" } : { display: "block" }}
        id="favoritesfooter"
      >
        <p className={styles["article__footer-content"]}>{article.content}</p>
        <p className={styles["article__footer-author"]}>
          Author: {article.author}
        </p>
      </div>
    </div>
  );
}
