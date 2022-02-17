import { AxiosResponse } from 'axios';

import { Nullable, TRootCategory } from '../../common/types/instance';
import { TGetCategoriesListRequestRequiredData } from '../../common/types/request';
import { TCategoriesResponse } from '../../common/types/response/TCategoriesResponse';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { ProductsAPI } from '../../dal/hm/products-api';
import { AppThunk } from '../store';

import { setAppStatus, setError, setLoaded } from './app';

const initialState = {
  // keys must be equal to pages url
  ladies: null as Nullable<TRootCategory<'ladies', ['ladies_all']>>,
  divided: null as Nullable<TRootCategory<'divided', ['ladies_divided']>>,
  men: null as Nullable<TRootCategory<'men', ['men_all']>>,
  baby: null as Nullable<TRootCategory<'baby', ['kids_newbornbaby_viewall']>>,
  kids: null as Nullable<TRootCategory<'kids', ['kids_all']>>,
  home: null as Nullable<TRootCategory<'home', ['home_all']>>,
  sale: null as Nullable<TRootCategory<'sale', []>>,
};

export const categoriesReducer = (
  state: TCategoriesState = initialState,
  action: TCategoriesActions,
): TCategoriesState => {
  switch (action.type) {
    case categoriesActionVariables.SET_CATEGORIES:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// actions
export const setCategories = (categories: TCategoriesResponse) =>
  ({
    type: categoriesActionVariables.SET_CATEGORIES,
    payload: {
      ladies: categories[0],
      divided: categories[1],
      men: categories[2],
      baby: categories[3],
      kids: categories[4],
      home: categories[5],
      sale: categories[6],
    },
  } as const);

export const getCategories = (): AppThunk => async (dispatch, getState) => {
  dispatch(setAppStatus('content loading'));
  const state = getState();
  const requiredParams: TGetCategoriesListRequestRequiredData = {
    country: state.regions.country,
    lang: state.regions.lang,
  };
  const timeout = new Promise((res, rej) => {
    setTimeout(() => {
      rej(new Error('cs request timeout'));
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 3000);
  });
  const response = ProductsAPI.getCategories(requiredParams);
  Promise.race([response, timeout])
    .then(res => {
      const categories = (res as AxiosResponse<TCategoriesResponse>).data;
      // const response = await fetch("http://localhost:4200/categories")
      // const categories = await response.json() as TCategoriesResponse
      dispatch(setCategories(categories));
      dispatch(setError(null));
      dispatch(setLoaded());
      dispatch(setAppStatus('succeeded'));
    })
    .catch(error => {
      handleServerNetworkError(error, 'content', dispatch);
      dispatch(setLoaded());
    });
};

// types
export type TCategoriesState = typeof initialState;
export type TCategoriesActions = ReturnType<typeof setCategories>;

// variables
const categoriesActionVariables = {
  SET_CATEGORIES: 'CATEGORIES/SET-CATEGORIES' as const,
};
