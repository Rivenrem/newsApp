import "./app.module.scss";
import { NewsProvider } from "./contexts/news.context";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Page from "./pages/Page";
import SingleArticle from "./pages/SingleArticle";
import Index from "pages/Index";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <NewsProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path={`/article/:id`} element={<SingleArticle />} />
            <Route path={`/page/:number`} element={<Page />} />
          </Routes>
        </NewsProvider>
      </BrowserRouter>
    </div>
  );
}
