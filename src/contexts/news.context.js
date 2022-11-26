import { createContext, useState } from "react";

const NewsContext = createContext(null);

function NewsProvider({ children }) {
  const [news, setNews] = useState({});

  return (
    <NewsContext.Provider
      value={{
        news,
        setNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };
