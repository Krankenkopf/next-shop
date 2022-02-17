import { TCheckedProduct } from '../../common/types/instance/TCheckedProduct';
import { TProduct } from '../../common/types/instance/TProduct';
import { TProductDetailArticle } from '../../common/types/instance/TProductDetail';
import { handleServerNetworkError } from '../../common/utils/state/errorHandler';
import { userAPI } from '../../dal/krank/user-api';
import { AppThunk } from '../store';

import { setAppStatus } from './app';

const initialState = {
  products: [] as Array<TCheckedProduct>,
  recentlyRemoved: [] as Array<TCheckedProduct>,
};

export const cartReducer = (state: TCartState = initialState, action: TCartActions): TCartState => {
  switch (action.type) {
    case cartActionVariables.SET_ITEMS:
      return {
        ...state,
        ...action.payload,
      };
    case cartActionVariables.ADD_ITEM:
      return {
        ...state,
        products: [...state.products, action.payload.product],
      };
    case cartActionVariables.REMOVE_ITEM:
      return {
        ...state,
        products: state.products.filter(product => product.code !== action.payload.product.code),
        recentlyRemoved: [...state.recentlyRemoved, action.payload.product],
      };
    case cartActionVariables.CLEAR_CART:
      return {
        ...state,
        products: [],
        recentlyRemoved: [...state.recentlyRemoved, ...state.products],
      };
    default:
      return state;
  }
};
// actions
export const setItems = (products: Array<TCheckedProduct>) =>
  ({
    type: cartActionVariables.SET_ITEMS,
    payload: { products },
  } as const);

export const addItem = (product: TCheckedProduct) =>
  ({
    type: cartActionVariables.ADD_ITEM,
    payload: { product },
  } as const);
export const removeItem = (product: TCheckedProduct) =>
  ({
    type: cartActionVariables.REMOVE_ITEM,
    payload: { product },
  } as const);
export const clearCart = () =>
  ({
    type: cartActionVariables.CLEAR_CART,
  } as const);

// thunk

export const getCartItems = (): AppThunk => async dispatch => {
  try {
    dispatch(setAppStatus('user data loading'));
    const response = await userAPI.getCartItems();
    dispatch(setItems(response.data));
    dispatch(setAppStatus('succeeded'));
  } catch (e) {
    handleServerNetworkError(e, 'user data', dispatch);
  }
};

export const addCartItem =
  (productHeapData: TProduct | TProductDetailArticle, from: 'list' | 'detail' = 'list'): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus('user data loading'));
      let product;
      let productDTO;
      if (from === 'detail') {
        product = productHeapData as TProductDetailArticle;
        productDTO = {
          code: product.code,
          name: product.name,
          color: product.color.text,
          size: 'S',
          quantity: 1,
          price: product.whitePrice.price,
          imgSrc: `${product.galleryDetails[0].url}&call=url[file:/product/main]`,
          imgSrcAlt: `${
            product.galleryDetails.find(item => item.assetType === 'DESCRIPTIVESTILLLIFE')?.url
          }&call=url[file:/product/main]`,
        };
      } else {
        product = productHeapData as TProduct;
        productDTO = {
          code: product.articles[0].code,
          name: product.name,
          color: product.articles[0].color.text,
          size: 'S',
          quantity: 1,
          price: product.price.value,
          imgSrc: product.images[0].url,
          imgSrcAlt: product.articles[0].normalPicture[0].url,
        };
      }

      const response = await userAPI.addCartItem(productDTO);
      dispatch(addItem(response.data));
      dispatch(setAppStatus('succeeded'));
    } catch (e) {
      handleServerNetworkError(e, 'user data', dispatch);
    }
  };

export const deleteCartItem =
  (code: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setAppStatus('user data loading'));
      const response = await userAPI.deleteCartItem(code);
      dispatch(removeItem(response.data));
      dispatch(setAppStatus('succeeded'));
    } catch (e) {
      handleServerNetworkError(e, 'user data', dispatch);
    }
  };

// types
export type TCartState = typeof initialState;
export type TCartActions =
  | ReturnType<typeof setItems>
  | ReturnType<typeof addItem>
  | ReturnType<typeof removeItem>
  | ReturnType<typeof clearCart>;

// variables
const cartActionVariables = {
  SET_ITEMS: 'CART/SET-ITEMS' as const,
  ADD_ITEM: 'CART/ADD-ITEM' as const,
  REMOVE_ITEM: 'CART/REMOVE-ITEM' as const,
  CLEAR_CART: 'CART/CLEAR-CART' as const,
};
