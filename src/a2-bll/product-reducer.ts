import { TGetProductDetailRequestRequiredData } from './../a0-common/c1-types/t2-request/index'
import { TProductDetail } from './../a0-common/c1-types/t1-instance/TProductDetail'
import { Nullable } from './../a0-common/c1-types/t1-instance/index'
import { AppThunk } from './store'
import { setAppStatus, setError } from './app-reducer'
import { ProductsAPI } from '../a3-dal/hm/products-api'
import { TProductDetailResponse } from '../a0-common/c1-types/t3-response/TProductDetailResponse'
import { handleServerNetworkError } from '../a0-common/c4-utils/state/errorHandler'

const initialState = {
    product: null as Nullable<TProductDetail>
}

export const productReducer =
(state: TProductState = initialState, action: TProductActions): TProductState => {
switch (action.type) {
    case productActionVariables.SET_PRODUCT:
        return {
            ...state,
            ...action.payload
        }
    default: return state
    }
}
// actions
export const setProduct = (product: TProductDetail) => (
{
    type: productActionVariables.SET_PRODUCT,
    payload: {product}
} as const)

export const getProduct = (code: number): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatus("content loading"))
            const state = getState()
            const requiredParams: TGetProductDetailRequestRequiredData = {
                country: state.regions.country,
                lang: state.regions.lang,
                productcode: code,
            }
            const response = await ProductsAPI.getProductDetail(requiredParams)

            //const response = await (await fetch("http://localhost:4200/detail")).json() as TProductDetailResponse
            const product = response.data.product
            dispatch(setProduct(product))
            dispatch(setError(null))
            dispatch(setAppStatus("succeeded"))
        } catch (e) {
            handleServerNetworkError(e, "content", dispatch)
        }
    }


// types
export type TProductState = typeof initialState
export type TProductActions =
    ReturnType<typeof setProduct>

// variables
const productActionVariables = {
    SET_PRODUCT: "PRODUCT/SET-PRODUCT" as const,
}
