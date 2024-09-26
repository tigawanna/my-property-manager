import { useState } from "react";

export function useTheme() {
  const [theme,seTheme] = useState(() => {
  if (typeof window === "undefined") return "light";
  return (
    localStorage.getItem("theme") as ("light"|"dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"
  );
  })
function updateTheme(newTheme: typeof theme) {
    if (typeof window !== "undefined") {
      document.documentElement.dataset.theme = newTheme;
      localStorage.setItem("theme", newTheme);
      seTheme(newTheme)
    }
  }
  return {
    theme,
    updateTheme,
  };
}
