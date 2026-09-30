export type ThemeMode =
  | "system"
  | "dark"
  | "light";

const STORAGE_KEY =
  "glyphguard-theme";

export function getStoredTheme():
  ThemeMode {
  const saved =
    localStorage.getItem(
      STORAGE_KEY,
    );

  if (
    saved === "dark" ||
    saved === "light" ||
    saved === "system"
  ) {
    return saved;
  }

  return "system";
}

function getSystemTheme():
  "dark" | "light" {
  return window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";
}

export function resolveTheme(
  mode: ThemeMode,
): "dark" | "light" {
  return mode === "system"
    ? getSystemTheme()
    : mode;
}

export function applyTheme(
  mode: ThemeMode,
) {
  const resolved =
    resolveTheme(mode);

  document.documentElement.dataset.theme =
    resolved;

  document.documentElement.dataset.themeMode =
    mode;

  localStorage.setItem(
    STORAGE_KEY,
    mode,
  );
}

export function initializeTheme() {
  const mode =
    getStoredTheme();

  applyTheme(mode);

  const media =
    window.matchMedia(
      "(prefers-color-scheme: dark)",
    );

  media.addEventListener(
    "change",
    () => {
      if (
        getStoredTheme() ===
        "system"
      ) {
        applyTheme(
          "system",
        );
      }
    },
  );
}