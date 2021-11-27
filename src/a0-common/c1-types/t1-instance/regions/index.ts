export enum LanguageCodes {
    Italiano = "it",
    Español = "es",
    Français = "fr",
    Français_Belgique = "fr",
    Dutch_Vlaams = "nl",
    Português = "pt",
    Polski = "pl",
    Slovenčina = "sk",
    Čeština = "cs",
    România = "ro",
    Magyar = "hu",
    Български = "bg",
    Русский = "ru",
    Deutsch = "de",
    English = "en",
    Greek = "el",
    Dutch = "nl",
    Türkçe = "tr",
    Dansk = "da",
    Suomi = "fi",
    Norsk = "no",
    Svenska = "sv",
    中国的 = "zh",
    日本語 = "ja",
    한국어 = "ko",
    中文 = "zh",
    Español_Mexicano = "es"
}

export enum CountryCodes {
    Italy = "it",
    Spain = "es",
    France = "fr",
    Belgium = "be",
    Portugal = "pt",
    Poland = "pl",
    Slovak = "sk",
    Czech = "cz",
    Romania = "ro",
    Hungary = "hu",
    Bulgaria = "bg",
    Russia = "ru",
    Switzerland = "ch",
    United_Kingdom = "gb",
    Ireland = "ie",
    Croatia_hr_HR = "eur",
    Estonia_et_EE = "eur",
    Greece = "gr",
    Latvia_lv_LV = "eur",
    Lithuania_lt_LT = "eur",
    Luxembourg_fr_LU = "eur",
    Slovenia_sl_SI = "eur",
    Netherlands = "nl",
    Turkey = "tr",
    Denmark = "dk",
    Finland = "fi",
    Cyprus_en_CY = "eur",
    Norway = "no",
    Sweden = "se",
    Österreich = "at",
    Germany = "de",
    China = "cn",
    Japan = "jp",
    South_Korea = "kr",
    Hong_Kong_en_HK = "asia1",
    Hong_Kong_zh_HK = "asia1",
    Taiwan_en_TW = "asia3",
    Taiwan_zh_TW = "asia3",
    Singapore_en_SG = "asia2",
    Macau_en_MO = "asia1",
    Macau_zh_MO = "asia1",
    Malaysia_en_MY = "asia4",
    Philippines_en_PH = "asia5",
    India = "in",
    Canada = "ca",
    United_States = "us",
    Mexico = "mx",
    Australia = "au"
}

export type TRegionsListResponse = {
    region: string;
    countries: TCountry[];
}

type TCountry = {
    name: string;
    code: string;
    languages: TLanguage[];
}

type TLanguage = {
    name: string;
    code: string;
}