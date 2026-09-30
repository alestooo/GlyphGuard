export type AppLocale =
  | "en"
  | "es"
  | "pt"
  | "fr"
  | "de"
  | "it"
  | "ja"
  | "ko"
  | "zh-CN"
  | "zh-TW"
  | "ru"
  | "ar";

export interface LocaleOption {
  code: AppLocale;
  name: string;
  flag: string;
  direction: "ltr" | "rtl";
}