import styles from "./article.module.scss";

export default function Articles({ article }) {
  const data = article.publishedAt.slice(0, 10);

  return (
    <div className={styles["article"]}>
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
        <p className={styles["article__footer-date"]}>{"Published: " + data}</p>
      </div>
    </div>
  );
}
