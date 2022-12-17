import { useState, useEffect } from "react";

export default function useTheme() {
  const [lightTheme, setLightTheme] = useState(
    localStorage.getItem("lightTheme")
      ? JSON.parse(localStorage.getItem("lightTheme"))
      : window.matchMedia("(prefers-color-scheme: light)").matches
  );

  useEffect(() => {
    localStorage.setItem("lightTheme", JSON.stringify(lightTheme));
  }, [lightTheme]);

  return { lightTheme, setLightTheme };
}
