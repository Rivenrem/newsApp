import styles from "./app.module.scss";
import { NewsProvider } from "./contexts/news.context";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Page from "./pages/Page";
import SingleArticle from "./pages/SingleArticle";
import Index from "pages/Index";
import Favorites from "./pages/Favorites";
import { useEffect, useState } from "react";

export default function App() {
  const [lightTheme, setLightTheme] = useState(
    localStorage.getItem("lightTheme")
      ? JSON.parse(localStorage.getItem("lightTheme"))
      : window.matchMedia("(prefers-color-scheme: light)").matches
  );

  useEffect(() => {
    localStorage.setItem("lightTheme", JSON.stringify(lightTheme));
  }, [lightTheme]);

  return (
    <div
      className={styles.container}
      color-scheme={lightTheme ? "light" : "dark"}
    >
      <BrowserRouter>
        <NewsProvider>
          <Header lightTheme={lightTheme} setLightTheme={setLightTheme} />
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
