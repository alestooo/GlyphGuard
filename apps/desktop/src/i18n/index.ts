import {
  createI18n,
} from "vue-i18n";

import type {
  AppLocale,
  LocaleOption,
} from "./types";

import en from "./locales/en";
import es from "./locales/es";
import pt from "./locales/pt";
import fr from "./locales/fr";
import de from "./locales/de";
import it from "./locales/it";
import ja from "./locales/ja";
import ko from "./locales/ko";
import zhCN from "./locales/zh-CN";
import zhTW from "./locales/zh-TW";
import ru from "./locales/ru";
import ar from "./locales/ar";

const STORAGE_KEY =
  "glyphguard-language";

export const localeOptions: LocaleOption[] = [
  {
    code: "en",
    name: "English",
    flag: "us",
    direction: "ltr",
  },
  {
    code: "es",
    name: "Español",
    flag: "es",
    direction: "ltr",
  },
  {
    code: "pt",
    name: "Português",
    flag: "pt",
    direction: "ltr",
  },
  {
    code: "fr",
    name: "Français",
    flag: "fr",
    direction: "ltr",
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "de",
    direction: "ltr",
  },
  {
    code: "it",
    name: "Italiano",
    flag: "it",
    direction: "ltr",
  },
  {
    code: "ja",
    name: "日本語",
    flag: "jp",
    direction: "ltr",
  },
  {
    code: "ko",
    name: "한국어",
    flag: "kr",
    direction: "ltr",
  },
  {
    code: "zh-CN",
    name: "简体中文",
    flag: "cn",
    direction: "ltr",
  },
  {
    code: "zh-TW",
    name: "繁體中文",
    flag: "tw",
    direction: "ltr",
  },
  {
    code: "ru",
    name: "Русский",
    flag: "ru",
    direction: "ltr",
  },
  {
    code: "ar",
    name: "العربية",
    flag: "sa",
    direction: "rtl",
  },
];

function getInitialLocale(): AppLocale {
  const saved =
    localStorage.getItem(
      STORAGE_KEY,
    ) as AppLocale | null;

  if (
    saved &&
    localeOptions.some(
      (option) =>
        option.code === saved,
    )
  ) {
    return saved;
  }

  return "en";
}

export const i18n =
  createI18n({
    legacy: false,

    locale:
      getInitialLocale(),

    fallbackLocale:
      "en",

    messages: {
      en,
      es,
      pt,
      fr,
      de,
      it,
      ja,
      ko,
      "zh-CN": zhCN,
      "zh-TW": zhTW,
      ru,
      ar,
    },
  });

export function setAppLocale(
  locale: AppLocale,
) {
  i18n.global.locale.value =
    locale;

  localStorage.setItem(
    STORAGE_KEY,
    locale,
  );

  const option =
    localeOptions.find(
      (item) =>
        item.code === locale,
    );

  document.documentElement.lang =
    locale;

  document.documentElement.dir =
    option?.direction ??
    "ltr";
}

const initialLocale =
  i18n.global.locale.value as AppLocale;

setAppLocale(
  initialLocale,
);