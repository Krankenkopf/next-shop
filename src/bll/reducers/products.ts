import { batch } from 'react-redux';

import { Nullable } from '../../common/types/instance';
import { TProduct } from '../../common/types/instance/TProduct';
import {
  TGetProductsListRequestRequiredData,
  TGetProductsListRequestOptionalCategories,
  TGetProductsListRequestOptionalSortBy,
  TGetProductsListRequestOptionalFilters,
  TGetProductsListRequestOptionalData,
} from '../../common/types/request';
import {
  getRequestedCategory,
  extendWithNonNullables,
  extractRelevantFacets,
} from '../../common/utils/state';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { ProductsAPI } from '../../dal/hm/products-api';
import { AppThunk } from '../store';

import {
  setAppStatus,
  setCategory,
  setCurrentPage,
  setPageSize,
  setTotalNumbers,
  setSortBy,
  setFacets,
  setError,
} from '.';

const initialState = {
  products: null as Nullable<Array<TProduct>>,
};

export const productsReducer = (
  state: TProductsState = initialState,
  action: TProductsActions,
): TProductsState => {
  switch (action.type) {
    case productsActionVariables.SET_PRODUCTS:
    case productsActionVariables.CLEAR_PRODUCTS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
// actions
export const setProducts = (products: Array<TProduct>) =>
  ({
    type: productsActionVariables.SET_PRODUCTS,
    payload: { products },
  } as const);
export const clearProducts = () =>
  ({
    type: productsActionVariables.CLEAR_PRODUCTS,
    payload: { products: null },
  } as const);

// thunk

export const getProducts =
  (path: string, queryCategories: Array<string>): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatus('content loading'));
      const state = getState();
      const targetedCategory = getRequestedCategory(
        path,
        queryCategories,
        state.categories,
      );
      if (!targetedCategory) {
        throw new Error('not found');
      }
      const requiredParams: TGetProductsListRequestRequiredData = {
        country: state.regions.country,
        lang: state.regions.lang,
        currentpage: state.navigation.currentPage,
        pagesize: state.navigation.pageSize,
      };
      const optionalCategories: TGetProductsListRequestOptionalCategories = {
        categories: targetedCategory?.tagCodes,
      };
      const optionalSortBy: TGetProductsListRequestOptionalSortBy = {
        sortBy: state.sort.sortBy,
      };
      const optionalFilters = extendWithNonNullables(
        {},
        state.filters.current as TGetProductsListRequestOptionalFilters,
      );
      const optionalParams: TGetProductsListRequestOptionalData = {
        ...optionalCategories,
        ...optionalSortBy,
        ...optionalFilters,
      };

      // const results = await fetch("http://localhost:4200/results")
      // const products = await results.json() as Array<TProduct>
      // const pagination = await fetch("http://localhost:4200/pagination")
      // const { currentPage, pageSize,
      //    numberOfPages, totalNumberOfResults,
      //    totalNumberOfResultsUnfiltered, sort } = await pagination.json() as TPagination
      // const facets = await fetch("http://localhost:4200/facets")
      // const anyFacets = await facets.json() as Array<TAnyFacet>

      const response = await ProductsAPI.getList(requiredParams, optionalParams);
      const products = response.data.results;
      const {
        currentPage,
        pageSize,
        numberOfPages,
        totalNumberOfResults,
        totalNumberOfResultsUnfiltered,
        sort,
      } = response.data.pagination;
      const anyFacets = response.data.facets;
      const relevantFacets = extractRelevantFacets(anyFacets, state.filters.facets);
      batch(() => {
        dispatch(setProducts(products));
        // navigation
        targetedCategory && dispatch(setCategory(targetedCategory));
        dispatch(setCurrentPage(currentPage));
        dispatch(setPageSize(pageSize));
        dispatch(
          setTotalNumbers(
            numberOfPages,
            totalNumberOfResults,
            totalNumberOfResultsUnfiltered,
          ),
        );
        // sort&filters
        dispatch(setSortBy(sort));
        dispatch(setFacets(relevantFacets));
      });
      dispatch(setError(null));
      dispatch(setAppStatus('succeeded'));
    } catch (e) {
      handleServerNetworkError(e, 'content', dispatch);
    }
  };

// types
export type TProductsState = typeof initialState;
export type TProductsActions =
  | ReturnType<typeof setProducts>
  | ReturnType<typeof clearProducts>;

// variables
const productsActionVariables = {
  SET_PRODUCTS: 'PRODUCTS/SET-PRODUCTS' as const,
  CLEAR_PRODUCTS: 'PRODUCTS/CLEAR-PRODUCTS' as const,
};
