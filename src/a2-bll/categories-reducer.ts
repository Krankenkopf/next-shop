import { TGetCategoriesListRequestRequiredData } from './../a0-common/c1-types/t2-request/index'
import { TCategoriesResponse} from './../a0-common/c1-types/t3-response/TCategoriesResponse'
import { Nullable, TRootCategory } from './../a0-common/c1-types/t1-instance/index'
import { setAppStatus, setError } from './app-reducer'
import { AppThunk } from './store'
import { ProductsAPI } from '../a3-dal/hm/products-api'
import { handleServerNetworkError } from '../a0-common/c4-utils/state/errorHandler'


const initialState = { // keys must be equal to pages url
    ladies: null as Nullable<TRootCategory<"ladies", ["ladies_all"]>>,
    divided: null as Nullable<TRootCategory<"divided", ["ladies_divided"]>>,
    men: null as Nullable<TRootCategory<"men", ["men_all"]>>,
    baby: null as Nullable<TRootCategory<"baby", ["kids_newbornbaby_viewall"]>>,
    kids: null as Nullable<TRootCategory<"kids", ["kids_all"]>>,
    home: null as Nullable<TRootCategory<"home", ["home_all"]>>,
    sale: null as Nullable<TRootCategory<"sale", []>>,
}

export const categoriesReducer =
    (state: TCategoriesState = initialState, action: TCategoriesActions): TCategoriesState => {
    switch (action.type) {
        case categoriesActionVariables.SET_CATEGORIES:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

// actions
export const setCategories = (categories: TCategoriesResponse) => (
    {
        type: categoriesActionVariables.SET_CATEGORIES,
        payload: {
            ladies: categories[0],
            divided: categories[1],
            men: categories[2],
            baby: categories[3],
            kids: categories[4],
            home: categories[5],
            sale: categories[6],
        }
    } as const)

export const getCategories = (): AppThunk =>
    async (dispatch, getState) => {
        try {
            dispatch(setAppStatus("content loading"))
            const state = getState()
            const requiredParams: TGetCategoriesListRequestRequiredData = {
                country: state.regions.country,
                lang: state.regions.lang,
            }
            //const response = await ProductsAPI.getCategories(requiredParams)
            //const categories = response.data
            const response = await fetch("http://localhost:4200/categories")
            const categories = await response.json() as TCategoriesResponse
            dispatch(setCategories(categories))
            dispatch(setError(null))
            dispatch(setAppStatus("succeeded"))
        } catch (e) {
            handleServerNetworkError(e, "content", dispatch)
        }
    }

// types
export type TCategoriesState = typeof initialState
export type TCategoriesActions =
    ReturnType<typeof setCategories>
  

// variables
const categoriesActionVariables = {
    SET_CATEGORIES: "CATEGORIES/SET-CATEGORIES" as const, 
}