import { createContext, useState } from "react";

const NewsContext = createContext(null);

function NewsProvider({ children }) {
  const [news, setNews] = useState({});
  const [previousParams, setPreviousParams] = useState({});

  return (
    <NewsContext.Provider
      value={{
        news,
        previousParams,
        setNews,
        setPreviousParams,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}

export { NewsContext, NewsProvider };
