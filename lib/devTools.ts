export function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  html.classList.toggle("dark", newTheme === "dark");
  localStorage.setItem("colortheme", newTheme);
}

export function showBorders() {
  const html = document.documentElement;
  if (html.classList.contains("show-all-borders")) {
    html.classList.remove("show-all-borders");
  } else {
    html.classList.add("show-all-borders");
  }
}
