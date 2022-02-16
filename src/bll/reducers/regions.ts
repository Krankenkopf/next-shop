import { LanguageCodes, CountryCodes } from '../../common/constants';

const initialState = {
  lang: LanguageCodes.English as LanguageCodes,
  country: CountryCodes.United_States as CountryCodes,
};

export const regionsReducer = (
  state: TRegionsState = initialState,
  action: TRegionsActions,
): TRegionsState => {
  switch (action.type) {
    case regionsActionVariables.SET_COUNTRY:
    case regionsActionVariables.SET_LANG:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
// actions
export const setCountry = (country: CountryCodes) =>
  ({
    type: regionsActionVariables.SET_COUNTRY,
    payload: { country },
  } as const);
export const setLanguage = (language: LanguageCodes) =>
  ({
    type: regionsActionVariables.SET_LANG,
    payload: { lang: language },
  } as const);

// types
export type TRegionsState = typeof initialState;
export type TRegionsActions =
  | ReturnType<typeof setCountry>
  | ReturnType<typeof setLanguage>;

// variables
const regionsActionVariables = {
  SET_COUNTRY: 'REGIONS/SET-COUNTRY' as const,
  SET_LANG: 'REGIONS/SET-LANG' as const,
};
