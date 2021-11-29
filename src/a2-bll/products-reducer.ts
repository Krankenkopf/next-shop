import { getRequestedCategory } from './../a0-common/c4-utils/index'
import { TProduct } from './../a0-common/c1-types/t1-instance/TProduct'
import { Nullable, TCategory } from './../a0-common/c1-types/t1-instance/index'
import { AppThunk } from './store'
import { setAppStatus, setError } from './app-reducer'
import { TGetProductsListRequestOptionalData, TGetProductsListRequestRequiredData } from '../a0-common/c1-types/t2-request'
import { handleServerNetworkError } from '../a0-common/c4-utils/errorHandler'
import { ProductsAPI } from '../a3-dal/hm/products-api'

const initialState = {
    products: null as Nullable<Array<TProduct>>
}

export const productsReducer =
(state: TProductsState = initialState, action: TProductsActions): TProductsState => {
switch (action.type) {
    case productsActionVariables.SET_PRODUCTS:
    case productsActionVariables.CLEAR_PRODUCTS:
        return {
            ...state,
            ...action.payload
        }
    default: return state
    }
}
// actions
export const setProducts = (products: Array<TProduct>) => (
    {
        type: productsActionVariables.SET_PRODUCTS,
        payload: {products}
    } as const)
export const clearProducts = () => (
    {
        type: productsActionVariables.CLEAR_PRODUCTS,
        payload: { products: null }
    } as const)

//thunk

export const getProducts = (path: string, queryCategories: Array<string>): AppThunk =>
    async (dispatch, getState) => {
    try {
        dispatch(setAppStatus("loading"))
        const state = getState()
        const targetedCategory = getRequestedCategory(path, queryCategories, state.categories)
        const requiredParams: TGetProductsListRequestRequiredData = {
            country: state.regions.country,
            lang: state.regions.lang,
            currentpage: state.navigation.currentPage,
            pagesize: state.navigation.pageSize,
        }
        const optionalParams: TGetProductsListRequestOptionalData = {
            categories: targetedCategory?.tagCodes
        }
        const response = await fetch("http://localhost:4200/results")
        const products = await response.json() as Nullable<Array<TProduct>>
        //const response = await ProductsAPI.getList(requiredParams, optionalParams)
        //const products = response.data.results
        //products && dispatch(setProducts(products))
        dispatch(setError(""))
        dispatch(setAppStatus("succeeded"))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

// types
export type TProductsState = typeof initialState
export type TProductsActions =
    ReturnType<typeof setProducts> | ReturnType<typeof clearProducts>

// variables
const productsActionVariables = {
    SET_PRODUCTS: "PRODUCTS/SET-PRODUCTS" as const,
    CLEAR_PRODUCTS: "PRODUCTS/CLEAR-PRODUCTS" as const,
}