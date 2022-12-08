import { useEffect, useState } from "react";
import FavoriteArticle from "./FavoriteArticle";
import styles from "./favorites.module.scss";

export default function Favorites() {
  const [currentFavorites, setCurrentFavorites] = useState([]);

  useEffect(() => {
    const array = [];
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }
      array.push(JSON.parse(localStorage[key]));
    }
    setCurrentFavorites(array);
  }, []);

  return (
    <div className={styles.favorites}>
      {currentFavorites.map((article, index) => (
        <FavoriteArticle
          setCurrentFavorites={(index) => {
            localStorage.removeItem(article.title);
            setCurrentFavorites([
              ...currentFavorites.slice(0, index),
              ...currentFavorites.slice(index + 1),
            ]);
          }}
          article={article}
          index={index}
          key={index}
        />
      ))}
    </div>
  );
}
