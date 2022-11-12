import { useContext, useState } from "react";
import { NewsContext } from "contexts/news.context";
import styles from "./body.module.scss";
import Article from "./Article";
import Pagination from "./Pagination";
import sadCat from "images/crying-cat.png";
import apiFetcher from "helpers/apiFetcher";

export default function Body() {
  const { news, newsInput, setNews } = useContext(NewsContext);
  const [isLoading, setisLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(6);

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

  const numberOfPages = Math.ceil(news.totalResults / articlesPerPage);

  return (
    <div className={styles["body"]}>
      <div className={styles["body__articles"]}>
        {news.articles.map((article, index) => (
          <Article key={index} article={article} />
        ))}
      </div>
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        setCurrentPage={async (page) => {
          setisLoading(true);
          setCurrentPage(page);
          setNews(await apiFetcher(newsInput, page));
          setisLoading(false);
        }}
        isLoading={isLoading}
      />
    </div>
  );
}
