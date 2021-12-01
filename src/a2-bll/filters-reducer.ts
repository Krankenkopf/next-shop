import { Nullable } from "../a0-common/c1-types/t1-instance"
import { TSortValue } from "../a0-common/c1-types/t2-request"

const initialState = {
    current: {
        sizes: null as Nullable<Array<string>>,
        sortBy: "stock" as TSortValue,
        contexts: null as Nullable<Array<string>>,
        concepts: null as Nullable<Array<string>>,
        collection: null as Nullable<Array<string>>,
        qualities: null as Nullable<Array<string>>,
        fits: null as Nullable<Array<string>>,
        descriptiveLengths: null as Nullable<Array<string>>,
        functions: null as Nullable<Array<string>>,
        colorWithNames: null as Nullable<Array<string>>,
    },
    facets: {
        sizes: null as Nullable<Array<string>>,
        sortBy: "stock" as TSortValue,
        contexts: null as Nullable<Array<string>>,
        concepts: null as Nullable<Array<string>>,
        collection: null as Nullable<Array<string>>,
        qualities: null as Nullable<Array<string>>,
        fits: null as Nullable<Array<string>>,
        descriptiveLengths: null as Nullable<Array<string>>,
        functions: null as Nullable<Array<string>>,
        colorWithNames: null as Nullable<Array<string>>,
    }

}

export const filtersReducer =
    (state: TFiltersState = initialState, action: TFiltersActions): TFiltersState => {
        switch (action.type) {
            case filtersActionVariables.SET_FACETS:
                return {
                    ...state,
                    ...action.payload
                }
            case filtersActionVariables.SET_FILTER:
            case filtersActionVariables.SET_SORTBY:
                return {
                    ...state,
                    ...action.payload.current
                }
            default: return state
        }
    }
// actions
export const setFacets = (facets: typeof initialState.facets) => (
    {
        type: filtersActionVariables.SET_FACETS,
        payload: {facets}
    } as const)

export type TSortByKey = "sortBy"
export type TFilterKey = keyof Omit<typeof initialState.current, "sortBy">
type TFilter = { [key in TFilterKey]?: Nullable<Array<string>> } //хуяссе я умею =)))
type TSortBy = {[key in TSortByKey]?: TSortValue}
export const setFilter = (filter: TFilter) => (
    {
        type: filtersActionVariables.SET_FILTER,
        payload: { current: {filter} }
    } as const)
export const setSortBy = (sortBy: TSortValue) => (
    {
        type: filtersActionVariables.SET_SORTBY,
        payload: { current: { sortBy } }
    } as const)

// types
export type TFiltersState = typeof initialState
export type TFiltersActions =
    ReturnType<typeof setFilter> | ReturnType<typeof setFacets> | ReturnType<typeof setSortBy>

// variables
const filtersActionVariables = {
    SET_FACETS: "FILTERS/SET-FACETS" as const,
    SET_FILTER: "FILTERS/SET-FILTER" as const,
    SET_SORTBY: "FILTERS/SET-SORTBY" as const,
}
