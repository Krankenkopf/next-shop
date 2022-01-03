import { TGetCategoriesListRequestRequiredData, TGetProductDetailRequestRequiredData } from './../../a0-common/c1-types/t2-request/index'
import { TGetProductsListRequestOptionalData, TGetProductsListRequestRequiredData } from "../../a0-common/c1-types/t2-request"
import { TProductsResponse } from "../../a0-common/c1-types/t3-response/TProductsResponse"
import { HMAPI } from "../api"
import { TCategoriesResponse } from '../../a0-common/c1-types/t3-response/TCategoriesResponse'
import { TProductDetailResponse } from '../../a0-common/c1-types/t3-response/TProductDetailResponse'

export const ProductsAPI = {
    getCategories(params: TGetCategoriesListRequestRequiredData) {
        return (
            HMAPI.get<TCategoriesResponse>(`categories/list`, { params })
        )
    },
    getList(required: TGetProductsListRequestRequiredData, optional: TGetProductsListRequestOptionalData) {
        return (
            HMAPI.get<TProductsResponse>(`products/list`, { params: { ...required, ...optional } })
        )
    },
    getProductDetail(params: TGetProductDetailRequestRequiredData) {
        return (
            HMAPI.get<TProductDetailResponse>(`products/detail`, { params })
        )
    },
}



