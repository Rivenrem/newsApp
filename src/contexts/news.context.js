import { createContext, useState } from "react";

const NewsContext = createContext(null);

function NewsProvider({ children }) {
  const [news, setNews] = useState({});
  const [params, setParams] = useState({});

  return (
    <NewsContext.Provider
      value={{
        news,
        params,
        setNews,
        setParams,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };
