import { AxiosResponse } from 'axios';

import { Nullable, TRootCategory } from '../../common/types/instance';
import { TGetCategoriesListRequestRequiredData } from '../../common/types/request';
import { TCategoriesResponse } from '../../common/types/response/TCategoriesResponse';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { ProductsAPI } from '../../dal/hm/products-api';
import { AppThunk } from '../store';

import { setAppStatus, setError, setLoaded } from './app';

const initialState: TCategoriesState = {
  // keys must be equal to pages url
  ladies: null,
  divided: null,
  men: null,
  baby: null,
  kids: null,
  home: null,
  sale: null,
};

export const categoriesReducer = (
  state: TCategoriesState = initialState,
  action: TCategoriesActions,
): TCategoriesState => {
  switch (action.type) {
    case categoriesActionVariables.SET_CATEGORIES:
      const copy = { ...state };
      action.payload.forEach(category => {
        Object.assign(copy, { [category.CategoryValue]: category });
      });
      return {
        ...state,
        ...copy,
      };
    default:
      return state;
  }
};

// actions
export const setCategories = (categories: TCategoriesResponse) =>
  ({
    type: categoriesActionVariables.SET_CATEGORIES,
    payload: categories,
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
export type TCategoriesState = {
  // keys must be equal to pages url
  ladies: Nullable<TRootCategory<'ladies', ['ladies_all']>>;
  divided: Nullable<TRootCategory<'divided', ['ladies_divided']>>;
  men: Nullable<TRootCategory<'men', ['men_all']>>;
  baby: Nullable<TRootCategory<'baby', ['kids_newbornbaby_viewall']>>;
  kids: Nullable<TRootCategory<'kids', ['kids_all']>>;
  home: Nullable<TRootCategory<'home', ['home_all']>>;
  sale: Nullable<TRootCategory<'sale', []>>;
};
export type TCategoriesActions = ReturnType<typeof setCategories>;

// variables
const categoriesActionVariables = {
  SET_CATEGORIES: 'CATEGORIES/SET-CATEGORIES' as const,
};
