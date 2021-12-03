import { Nullable } from "../a0-common/c1-types/t1-instance"

const initialState = {
    status: "idle" as TRequestStatus,
    error: null as Nullable<string>,
    isInitialized: false,
    needUpdate: true
}

export const appReducer = (state: TAppState = initialState, action: TAppActions): TAppState => {
    switch (action.type) {
        case appActionVariables.SET_STATUS:
            return {...state, status: action.status}
        case appActionVariables.SER_ERROR:
            return {...state, error: action.error}
        case appActionVariables.SET_INITIALIZED:
            return {...state, isInitialized: true}
        case appActionVariables.SET_NEED_UPDATE:
            return {...state, ...action.payload}
        default: return state
    }
}

// actions
export const setAppStatus = (status: TRequestStatus) => ({type: appActionVariables.SET_STATUS, status} as const)
export const setError = (error: Nullable<string>) => ({type: appActionVariables.SER_ERROR, error} as const)
export const setInitialized = () => ({type: appActionVariables.SET_INITIALIZED} as const)
export const setNeedUpdate = (status: boolean) => ({type: appActionVariables.SET_NEED_UPDATE, payload: {needUpdate: status}}) as const
// thunks

// types
export type TRequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type TAppState = typeof initialState
export type TAppActions =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setError>
    | ReturnType<typeof setInitialized>
    | ReturnType<typeof setNeedUpdate>

// variables
const appActionVariables = {
    SET_STATUS: "APP/SET-STATUS" as const,
    SER_ERROR: "APP/SET-ERROR" as const,
    SET_INITIALIZED: "APP/SET-INITIALIZED" as const,
    SET_NEED_UPDATE: "APP/SET-NEED-UPDATE" as const,
}