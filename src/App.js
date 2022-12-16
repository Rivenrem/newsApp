import styles from "./app.module.scss";
import { NewsProvider } from "./contexts/news.context";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Page from "./pages/Page";
import SingleArticle from "./pages/SingleArticle";
import Index from "pages/Index";
import Favorites from "./pages/Favorites";
import { useState } from "react";

export default function App() {
  const [defaultValue, toggle] = useState(
    window.matchMedia("(prefers-color-scheme: light)").matches
  );

  return (
    <div
      className={styles.container}
      color-scheme={defaultValue ? "light" : "dark"}
    >
      <BrowserRouter>
        <NewsProvider>
          <Header defaultValue={defaultValue} toggle={toggle} />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path={`/page/:number/article/:id`}
              element={<SingleArticle />}
            />
            <Route path={`/page/:number`} element={<Page />} />
            <Route path={`/favorites`} element={<Favorites />} />
          </Routes>
        </NewsProvider>
      </BrowserRouter>
    </div>
  );
}
