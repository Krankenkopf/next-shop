export type TRegionsListResponse = {
  region: string;
  countries: TCountry[];
};

type TCountry = {
  name: string;
  code: string;
  languages: TLanguage[];
};

type TLanguage = {
  name: string;
  code: string;
};
