"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

// With no saved choice the site follows the OS setting (via CSS media query).
// Clicking saves an explicit choice to localStorage and sets <html data-theme>.
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = document.documentElement.dataset.theme as Theme | undefined;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(saved ?? system);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Render nothing until mounted so server and client HTML match. */}
      <span aria-hidden="true">{theme === null ? "" : theme === "dark" ? "☀" : "☾"}</span>
    </button>
  );
}
