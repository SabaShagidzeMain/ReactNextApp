import { useState, useEffect } from "react";
import "./ThemeToggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(systemPrefersDark ? "dark" : "light");
      applyTheme(systemPrefersDark ? "dark" : "light");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e) => {
      if (theme === "system") {
        const systemTheme = e.matches ? "dark" : "light";
        setTheme(systemTheme);
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemChange);
    };
  }, [theme]);

  const applyTheme = (newTheme) => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (newTheme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  };

  const toggleTheme = (selectedTheme) => {
    setTheme(selectedTheme);
    applyTheme(selectedTheme);
  };

  return (
    <div>
      <button
        onClick={() => toggleTheme("light")}
        className={`p-2 ${theme === "light" ? "bg-gray-300" : ""}`}
      >
        Light
      </button>
      <button
        onClick={() => toggleTheme("dark")}
        className={`p-2 ${theme === "dark" ? "bg-gray-300" : ""}`}
      >
        Dark
      </button>
      <button
        onClick={() => toggleTheme("system")}
        className={`p-2 ${theme === "system" ? "bg-gray-300" : ""}`}
      >
        System
      </button>
    </div>
  );
};

export default ThemeToggle;
