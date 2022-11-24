import { createContext, useState } from "react";

const NewsContext = createContext(null);

function NewsProvider({ children }) {
  const [news, setNews] = useState({});
  const [newsInput, setNewsInput] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [articlesPerPage, setArticlesPerPage] = useState(6);
  const [search, setSearch] = useState({});
  return (
    <NewsContext.Provider
      value={{
        news,
        newsInput,
        sortBy,
        articlesPerPage,
        search,
        setNews,
        setNewsInput,
        setSortBy,
        setArticlesPerPage,
        setSearch,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };
