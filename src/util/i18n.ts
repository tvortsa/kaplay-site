import { englishLocales } from "@/locales/en/ui";
import { spanishLocales } from "@/locales/es/ui";
import { russianLocales } from "@/locales/ru/ui";

export type Locale = "en" | "es" | "ru";
export type LocaleMap = {
    [K in keyof typeof englishLocales]: {
        [K2 in keyof (typeof englishLocales)[K]]: string;
    };
};
export type LocaleKeys = keyof LocaleMap;
export type LocaleSubKeys = {
    [K in LocaleKeys]: keyof LocaleMap[K];
};

// TODO: Automate this
export type TranslationStringsSidebar = `sidebar.${LocaleSubKeys["sidebar"]}`;
export type TranslationStringsGuides = `guides.${LocaleSubKeys["guides"]}`;
export type TranslationStringsMisc = `misc.${LocaleSubKeys["misc"]}`;
export type TranslationString =
    | TranslationStringsSidebar
    | TranslationStringsGuides
    | TranslationStringsMisc;

export const locales = ["en"];
export const DEFAULT_LANG = "en";

export const localesMap = {
    en: englishLocales,
    es: spanishLocales,
    ru: russianLocales,
};

function splitLocaleKey(key: TranslationString) {
    return key.split(".") as [
        keyof LocaleMap,
        keyof LocaleMap[keyof LocaleMap],
    ];
}

export function t(locale: Locale, key: TranslationString) {
    const keys = splitLocaleKey(key);
    const localKey = keys[0];
    const localSubKey = keys[1];
    const localeMap = localesMap[locale];
    const defaultLocaleMap = localesMap[locales[0] as Locale];

    return (
        localeMap?.[localKey]?.[localSubKey]
            ?? defaultLocaleMap[localKey][localSubKey]
    );
}

export function localedT(locale: Locale) {
    return (tString: TranslationString) => t(locale, tString);
}
