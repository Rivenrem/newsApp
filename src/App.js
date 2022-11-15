import "./app.module.scss";
import Header from "./components/Header";
import Body from "./components/Body";
import { NewsProvider } from "./contexts/news.context";
import { Route, Routes } from "react-router-dom";
import SingleArticle from "components/SingleArticle";

export default function App() {
  return (
    <div>
      <NewsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path={`/article/:id`} element={<SingleArticle />} />
        </Routes>
      </NewsProvider>
    </div>
  );
}
