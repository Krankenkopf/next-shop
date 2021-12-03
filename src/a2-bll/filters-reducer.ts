import { TFacet } from './../a0-common/c1-types/t3-response/TProductsResponse'
import { Nullable } from './../a0-common/c1-types/t1-instance/index'
import { TSortValue } from "../a0-common/c1-types/t2-request"

export type TFilters = {
    sizes: Array<string>
    contexts: Array<string>
    concepts: Array<string>
    collection: Array<string>
    qualities: Array<string>
    fits: Array<string>
    functions: Array<string>
    colorWithNames: Array<string>
}

export type TFacets = {
    sizes: Nullable<TFacet>
    contexts: Nullable<TFacet>
    concepts: Nullable<TFacet>
    collection: Nullable<TFacet>
    qualities: Nullable<TFacet>
    fits: Nullable<TFacet>
    functions: Nullable<TFacet>
    colorWithNames: Nullable<TFacet>
}

const initialState = {
    current: {
        sizes: [],
        contexts: [],
        concepts: [],
        collection: [],
        qualities: [],
        fits: [],
        //descriptiveLengths: [],
        functions: [],
        colorWithNames: [],
    } as TFilters,
    facets: {
        sizes: null,
        contexts: null,
        concepts: null,
        collection: null,
        qualities: null,
        fits: null,
        //descriptiveLengths: null, obsolete
        functions: null,
        colorWithNames: null,
    } as TFacets

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
        payload: { facets }
    } as const)

export type TFilterKey = keyof typeof initialState.current
type TFilter = { [key in TFilterKey]?: Nullable<Array<string>> }

export const setFilter = (filter: TFilter) => (
    {
        type: filtersActionVariables.SET_FILTER,
        payload: { current: { filter } }
    } as const)


// types
export type TFiltersState = typeof initialState
export type TFiltersActions =
    ReturnType<typeof setFilter> | ReturnType<typeof setFacets>

// variables
const filtersActionVariables = {
    SET_FACETS: "FILTERS/SET-FACETS" as const,
    SET_FILTER: "FILTERS/SET-FILTER" as const,
}
