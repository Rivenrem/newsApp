import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavoriteArticle from "./FavoriteArticle";
import styles from "./favorites.module.scss";

export default function Favorites() {
  const [currentFavorites, setCurrentFavorites] = useState([]);

  useEffect(() => {
    const array = JSON.parse(localStorage.getItem("favorites"));
    setCurrentFavorites(array);
  }, []);

  if (currentFavorites.length) {
    return (
      <div className={styles.favorites}>
        {currentFavorites.map((article, index) => (
          <FavoriteArticle
            setCurrentFavorites={(index) => {
              const favorites = [
                ...currentFavorites.slice(0, index),
                ...currentFavorites.slice(index + 1),
              ];
              setCurrentFavorites(favorites);
              localStorage.setItem("favorites", JSON.stringify(favorites));
            }}
            article={article}
            index={index}
            key={index}
          />
        ))}
      </div>
    );
  }
  return (
    <div className={styles.noFavorites}>
      <h2 className={styles["noFavorites__paragraph"]}>
        There are no favorites, add some to see them !
      </h2>
      <Link to={-1} className={styles["noFavorites__back"]}>
        Back to the articles
      </Link>
    </div>
  );
}
