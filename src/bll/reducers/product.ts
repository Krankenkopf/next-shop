import { Nullable } from '../../common/types/instance';
import { TProductDetail } from '../../common/types/instance/TProductDetail';
import { TGetProductDetailRequestRequiredData } from '../../common/types/request';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { ProductsAPI } from '../../dal/hm/products-api';
import { AppThunk } from '../store';

import { setAppStatus, setError } from './app';

const initialState = {
  product: null as Nullable<TProductDetail>,
};

export const productReducer = (
  state: TProductState = initialState,
  action: TProductActions,
): TProductState => {
  switch (action.type) {
    case productActionVariables.SET_PRODUCT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
// actions
export const setProduct = (product: TProductDetail) =>
  ({
    type: productActionVariables.SET_PRODUCT,
    payload: { product },
  } as const);

export const getProduct =
  (code: string): AppThunk =>
  async (dispatch, getState) => {
    try {
      dispatch(setAppStatus('content loading'));
      const state = getState();
      const requiredParams: TGetProductDetailRequestRequiredData = {
        country: state.regions.country,
        lang: state.regions.lang,
        productcode: code,
      };
      const response = await ProductsAPI.getProductDetail(requiredParams);

      // const response = await (await fetch("http://localhost:4200/detail")).json() as TProductDetailResponse
      const { product } = response.data;
      dispatch(setProduct(product));
      dispatch(setError(null));
      dispatch(setAppStatus('succeeded'));
    } catch (e) {
      handleServerNetworkError(e, 'content', dispatch);
    }
  };
// types
export type TProductState = typeof initialState;
export type TProductActions = ReturnType<typeof setProduct>;

// variables
const productActionVariables = {
  SET_PRODUCT: 'PRODUCT/SET-PRODUCT' as const,
};
