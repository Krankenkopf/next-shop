import { TCategoriesResponse} from './../a0-common/c1-types/t3-response/TCategoriesResponse'
import { Nullable, TRootCategory } from './../a0-common/c1-types/t1-instance/index'


const initialState = {
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



// types
export type TCategoriesState = typeof initialState
export type TCategoriesActions =
    ReturnType<typeof setCategories>
  

// variables
const categoriesActionVariables = {
    SET_CATEGORIES: "CATEGORIES/SET-CATEGORIES" as const, 
}