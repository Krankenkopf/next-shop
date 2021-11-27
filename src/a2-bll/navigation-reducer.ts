import { Nullable, TCategory } from './../a0-common/c1-types/t1-instance/index'

const initialState = {
    category: null as Nullable<TCategory>,
    pageSize: 30,
    currentPage: 0,
    numberOfPages: 0,
    totalNumberOfResults: 0,
    totalNumberOfResultsUnfiltered: 0
}

export const navigationReducer =
(state: TNavigationState = initialState, action: TNavigationActions): TNavigationState => {
switch (action.type) {
    case navigationActionVariables.SET_:
        return {
            ...state,
            ...action.payload
        }
    default: return state
    }
}
// actions
export const setNavigation = () => (
{
    type: navigationActionVariables.SET_,
    payload: {}
} as const)

// types
export type TNavigationState = typeof initialState
export type TNavigationActions =
    ReturnType<typeof setNavigation>

// variables
const navigationActionVariables = {
    SET_: "CATEGORIES/SET-CATEGORIES" as const,
}
