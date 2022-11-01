import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import { NewsProvider } from "./contexts/news.context";

export default function App() {
  return (
    <div>
      <NewsProvider>
        <Header />
        <Body />
      </NewsProvider>
    </div>
  );
}
