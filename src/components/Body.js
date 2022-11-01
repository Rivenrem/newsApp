import { useContext } from "react";
import styles from "./body.module.css";
import { NewsContext } from "../contexts/news.context";
import Articles from "./Article";

export default function Body() {
  const { news } = useContext(NewsContext);
  if (!news.articles) {
    return;
  }
  const shortNews = news.articles.slice(0, 4);
  return (
    <div className={styles["body-container"]}>
      {shortNews.map((article, index) => (
        <Articles key={index} article={article} />
      ))}
    </div>
  );
}
