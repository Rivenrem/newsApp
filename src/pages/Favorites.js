import FavoritesArticle from "./FavoritesArticle";
import styles from "./favorites.module.scss";

export default function Favorites() {
  const favoritesCurrent = [];

  for (let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue;
    }
    favoritesCurrent.push(JSON.parse(localStorage[key]));
  }

  return (
    <div className={styles.favorites}>
      {favoritesCurrent.map((article, index) => (
        <FavoritesArticle article={article} index={index} key={index} />
      ))}
    </div>
  );
}
