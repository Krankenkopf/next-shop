import { Nullable } from "../a0-common/c1-types/t1-instance"

const initialState = {
    sizes: null as Nullable<Array<string>>,
    sortBy: "stock" as "ascPrice" | "descPrice" | "stock" | "newProduct",
    contexts: null as Nullable<Array<string>>,
    concepts: null as Nullable<Array<string>>,
    collection: null as Nullable<Array<string>>,
    qualities: null as Nullable<Array<string>>,
    fits: null as Nullable<Array<string>>,
    descriptiveLengths: null as Nullable<Array<string>>,
    functions: null as Nullable<Array<string>>,
    colorWithNames: null as Nullable<Array<string>>,
}

export const filtersReducer =
(state: TFiltersState = initialState, action: TFiltersActions): TFiltersState => {
switch (action.type) {
    case filtersActionVariables.SET_:
        return {
            ...state,
            ...action.payload
        }
    default: return state
    }
}
// actions
export const setFilters = () => (
{
    type: filtersActionVariables.SET_,
    payload: {}
} as const)

// types
export type TFiltersState = typeof initialState
export type TFiltersActions =
    ReturnType<typeof setFilters>

// variables
const filtersActionVariables = {
    SET_: "" as const,
}
