import { Nullable } from "../a0-common/c1-types/t1-instance"
import { TModal } from "../a1-ui/u1-components/cp2-modules/Modal/Modals"

const initialState = {
    status: "idle" as TRequestStatus,
    error: null as Nullable<string>,
    isInitialized: false,
    isNeedUpdate: true,

    modal: null as TModal
}

export const appReducer = (state: TAppState = initialState, action: TAppActions): TAppState => {
    switch (action.type) {
        case appActionVariables.SET_INITIALIZED:
        case appActionVariables.SET_STATUS:
        case appActionVariables.SER_ERROR:
        case appActionVariables.SET_NEED_UPDATE:
        case appActionVariables.SET_MODAL:
        case appActionVariables.CLOSE_MODAL:
            return {
                ...state,
                ...action.payload
            }
        default: return state
    }
}

// actions
export const setAppStatus = (status: TRequestStatus) => (
    { type: appActionVariables.SET_STATUS, payload: { status } } as const)
export const setError = (error: Nullable<string>) => (
    { type: appActionVariables.SER_ERROR, payload: { error } } as const)
export const setInitialized = () => (
    { type: appActionVariables.SET_INITIALIZED, payload: { isInitialized: true } } as const)
export const setNeedUpdate = (isNeedUpdate: boolean) => (
    { type: appActionVariables.SET_NEED_UPDATE, payload: { isNeedUpdate } }) as const
export const setModal = (modal: TModal) => (
    { type: appActionVariables.SET_MODAL, payload: { modal } }) as const
export const closeModal = () => (
    { type: appActionVariables.CLOSE_MODAL, payload: { modal: null } }) as const
// thunks

// types
export type TRequestStatus = "idle" | "auth loading" | "content loading" | "succeeded" | "failed"
export type TAppState = typeof initialState
export type TAppActions =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setError>
    | ReturnType<typeof setInitialized>
    | ReturnType<typeof setNeedUpdate>
    | ReturnType<typeof setModal>
    | ReturnType<typeof closeModal>

// variables
const appActionVariables = {
    SET_STATUS: "APP/SET-STATUS" as const,
    SER_ERROR: "APP/SET-ERROR" as const,
    SET_INITIALIZED: "APP/SET-INITIALIZED" as const,
    SET_NEED_UPDATE: "APP/SET-NEED-UPDATE" as const,
    SET_MODAL: "APP/SET-MODAL" as const,
    CLOSE_MODAL: "APP/CLOSE-MODAL" as const,
}