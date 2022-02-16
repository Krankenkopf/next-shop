import {
  TGetProductsListRequestOptionalData,
  TGetProductsListRequestRequiredData,
  TGetCategoriesListRequestRequiredData,
  TGetProductDetailRequestRequiredData,
} from '../../common/types/request';
import { TCategoriesResponse } from '../../common/types/response/TCategoriesResponse';
import { TProductDetailResponse } from '../../common/types/response/TProductDetailResponse';
import { TProductsResponse } from '../../common/types/response/TProductsResponse';
import { HMAPI } from '../api';

export const ProductsAPI = {
  getCategories(params: TGetCategoriesListRequestRequiredData) {
    return HMAPI.get<TCategoriesResponse>(`categories/list`, { params });
  },
  getList(
    required: TGetProductsListRequestRequiredData,
    optional: TGetProductsListRequestOptionalData,
  ) {
    return HMAPI.get<TProductsResponse>(`products/list`, {
      params: { ...required, ...optional },
    });
  },
  getProductDetail(params: TGetProductDetailRequestRequiredData) {
    return HMAPI.get<TProductDetailResponse>(`products/detail`, { params });
  },
};
