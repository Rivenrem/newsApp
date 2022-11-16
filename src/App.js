import "./app.module.scss";
import { NewsProvider } from "./contexts/news.context";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Index from "./pages/Index";
import SingleArticle from "./pages/SingleArticle";
export default function App() {
  return (
    <div>
      <NewsProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path={`/article/:id`} element={<SingleArticle />} />
        </Routes>
      </NewsProvider>
    </div>
  );
}
