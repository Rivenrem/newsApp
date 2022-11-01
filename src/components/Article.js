import styles from "./article.module.css";

export default function Articles({ article }) {
  const data = article.publishedAt.slice(0, 10);
  return (
    <div className={styles["article-container"]}>
      <div className={styles["article-description"]}>{article.description}</div>
      <div className={styles["article-content"]}>
        <img
          className={styles["article-img"]}
          src={article.urlToImage}
          alt="newsImg"
        ></img>
        {article.content}
      </div>
      <div className={styles["article-footer-container"]}>
        <div className={styles["article-author"]}>{article.author}</div>
        <div className={styles["aticle-date"]}>{"Published: " + data}</div>
      </div>
    </div>
  );
}
