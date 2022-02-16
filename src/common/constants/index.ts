import { TFilters } from '../../bll/reducers';

export enum FilterNames {
  SORTBY = 'SORT BY',
  CONSCIOUS = 'CONSCIOUS',
  SIZE = 'SIZE',
  COLOR = 'COLOR',
  PATTERN = 'PATTERN',
  ALLFILTERS = 'ALL FILTERS',
}

export const SORTTITLES = ['Recommended', 'Newest', 'Lowest Price', 'Highest Price'];
export const SIZETITLES = [
  { code: 'womenswear', title: 'Womenswear' },
  { code: 'menswear', title: 'Menswear' },
  { code: 'waist', title: 'Waist(inches)' },
  { code: 'footwear', title: 'Footwear' },
] as const;
export const FILTERSSORTTITLES: Array<{ code: 'sort' | keyof TFilters; title: string }> =
  [
    { code: 'sort', title: 'Sort By' },
    { code: 'sizes', title: 'Size' },
    { code: 'contexts', title: 'Occasion' },
    { code: 'concepts', title: 'Concept' },
    { code: 'collection', title: 'Collection' },
    { code: 'qualities', title: 'Quality' },
    { code: 'fits', title: 'Fit' },
    { code: 'functions', title: 'Function' },
    { code: 'colorWithNames', title: 'Color' },
  ];

export enum IconColor {
  OK = '#00bb00',
  ERROR = '#ff0000',
  INITIAL = '#292825',
  OPTIONAL = '#5555ff',
  INFO = '#1111ff',
  FAVORITE = '#e50010',
}

export enum StatusCode {
  UNAUTHORIZED = 401,
}

export enum LanguageCodes {
  Italiano = 'it',
  Español = 'es',
  Français = 'fr',
  Français_Belgique = 'fr',
  Dutch_Vlaams = 'nl',
  Português = 'pt',
  Polski = 'pl',
  Slovenčina = 'sk',
  Čeština = 'cs',
  România = 'ro',
  Magyar = 'hu',
  Български = 'bg',
  Русский = 'ru',
  Deutsch = 'de',
  English = 'en',
  Greek = 'el',
  Dutch = 'nl',
  Türkçe = 'tr',
  Dansk = 'da',
  Suomi = 'fi',
  Norsk = 'no',
  Svenska = 'sv',
  中国的 = 'zh',
  日本語 = 'ja',
  한국어 = 'ko',
  中文 = 'zh',
  Español_Mexicano = 'es',
}

export enum CountryCodes {
  Italy = 'it',
  Spain = 'es',
  France = 'fr',
  Belgium = 'be',
  Portugal = 'pt',
  Poland = 'pl',
  Slovak = 'sk',
  Czech = 'cz',
  Romania = 'ro',
  Hungary = 'hu',
  Bulgaria = 'bg',
  Russia = 'ru',
  Switzerland = 'ch',
  United_Kingdom = 'gb',
  Ireland = 'ie',
  Croatia_hr_HR = 'eur',
  Estonia_et_EE = 'eur',
  Greece = 'gr',
  Latvia_lv_LV = 'eur',
  Lithuania_lt_LT = 'eur',
  Luxembourg_fr_LU = 'eur',
  Slovenia_sl_SI = 'eur',
  Netherlands = 'nl',
  Turkey = 'tr',
  Denmark = 'dk',
  Finland = 'fi',
  Cyprus_en_CY = 'eur',
  Norway = 'no',
  Sweden = 'se',
  Österreich = 'at',
  Germany = 'de',
  China = 'cn',
  Japan = 'jp',
  South_Korea = 'kr',
  Hong_Kong_en_HK = 'asia1',
  Hong_Kong_zh_HK = 'asia1',
  Taiwan_en_TW = 'asia3',
  Taiwan_zh_TW = 'asia3',
  Singapore_en_SG = 'asia2',
  Macau_en_MO = 'asia1',
  Macau_zh_MO = 'asia1',
  Malaysia_en_MY = 'asia4',
  Philippines_en_PH = 'asia5',
  India = 'in',
  Canada = 'ca',
  United_States = 'us',
  Mexico = 'mx',
  Australia = 'au',
}
