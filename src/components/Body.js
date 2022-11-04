import { useContext } from "react";
import { NewsContext } from "contexts/news.context";
import styles from "./body.module.scss";
import Articles from "./Article";
import sadCat from "images/crying-cat.png";

export default function Body() {
  const { news } = useContext(NewsContext);

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

  const shortNews = news.articles.slice(0, 4);

  return (
    <div className={styles["body"]}>
      {shortNews.map((article, index) => (
        <Articles key={index} article={article} />
      ))}
    </div>
  );
}
