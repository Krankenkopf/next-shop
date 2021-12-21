import { CountryCodes, LanguageCodes } from "../a0-common/c2-constants"


const initialState = {
    lang: LanguageCodes.Français as LanguageCodes,
    country: CountryCodes.France as CountryCodes
}

export const regionsReducer =
(state: TRegionsState = initialState, action: TRegionsActions): TRegionsState => {
switch (action.type) {
    case regionsActionVariables.SET_:
        return {
            ...state,
            ...action.payload
        }
    default: return state
    }
}
// actions
export const setRegions = () => (
{
    type: regionsActionVariables.SET_,
    payload: {}
} as const)

// types
export type TRegionsState = typeof initialState
export type TRegionsActions =
    ReturnType<typeof setRegions>

// variables
const regionsActionVariables = {
    SET_: "" as const,
}