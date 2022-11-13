import { createContext, useState } from "react";

const NewsContext = createContext(null);

function NewsProvider({ children }) {
  const [news, setNews] = useState({});
  const [newsInput, setNewsInput] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [articlesPerPage, setArticlesPerPage] = useState(6);

  return (
    <NewsContext.Provider
      value={{
        news,
        newsInput,
        sortBy,
        articlesPerPage,
        setNews,
        setNewsInput,
        setSortBy,
        setArticlesPerPage,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };
