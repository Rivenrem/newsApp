import { createContext, useState } from "react";

const NewsContext = createContext(null);

function NewsProvider({ children }) {
  const [news, setNews] = useState({});
  const [newsInput, setNewsInput] = useState("");

  return (
    <NewsContext.Provider value={{ news, newsInput, setNews, setNewsInput }}>
      {children}
    </NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };
