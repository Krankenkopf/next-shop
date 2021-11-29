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
    case navigationActionVariables.SET_CATEGORY:
    case navigationActionVariables.SET_PAGESIZE:
    case navigationActionVariables.SET_CURRENTPAGE:
    case navigationActionVariables.SET_TOTALNUMBERS:
        return {
            ...state,
            ...action.payload
        }
    default: return state
    }
}
// actions
export const setCategory = (category: TCategory) => (
    {
        type: navigationActionVariables.SET_CATEGORY,
        payload: {category}
    } as const)
export const setPageSize = (pageSize: number) => (
    {
        type: navigationActionVariables.SET_PAGESIZE,
        payload: { pageSize }
    } as const)
export const setCurrentPage = (currentPage: number) => (
    {
        type: navigationActionVariables.SET_CURRENTPAGE,
        payload: { currentPage }
    } as const)
export const setTotalNumbers = (
    numberOfPages: number,
    totalNumberOfResults: number,
    totalNumberOfResultsUnfiltered: number) => (
    {
        type: navigationActionVariables.SET_TOTALNUMBERS,
        payload: { numberOfPages, totalNumberOfResults, totalNumberOfResultsUnfiltered }
    } as const)


// types
export type TNavigationState = typeof initialState
export type TNavigationActions =
    ReturnType<typeof setCategory> | ReturnType<typeof setPageSize>
    | ReturnType<typeof setCurrentPage> | ReturnType<typeof setTotalNumbers>

// variables
const navigationActionVariables = {
    SET_CATEGORY: "NAVIGATION/SET-CATEGORY" as const,
    SET_PAGESIZE: "NAVIGATION/SET-PAGESIZE" as const,
    SET_CURRENTPAGE: "NAVIGATION/SET-CURRENTPAGE" as const,
    SET_TOTALNUMBERS: "NAVIGATION/SET-TOTALNUMBERS" as const,
}
