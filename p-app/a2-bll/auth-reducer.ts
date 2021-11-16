
import {AppThunk} from './store';
import {setAppStatus, setInitialized} from "./app-reducer";
import { authAPI, TLoginData, TSignupData } from '../a3-dal/krank/auth-api';
import { handleServerNetworkError } from '../a0-common/c4-utils/errorHandler';


const initialState = {
    signupUserData: null as TSignupData | null,
    isSignupPassConfirmed: false,
    isRegistered: false,
    isLoggedIn: false
}

export const authReducer = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
    switch (action.type) {
        //case 'LOGIN/SET_USER_DATA':
        //    return {...state, userData: action.userData}
        case "AUTH/SET_IS_SIGNUP_PASS_CONFIRMED":
        case "AUTH/SET_SIGNUP_USER_DATA":
        case 'AUTH/SET_IS_REGISTERED':
        case "AUTH/SET_IS_LOGGED_IN":
            return {...state, ...action.payload}
        default: return state
    }
}

// actions

//export const setUserData = (userData: TUserData | null) =>
//    ({type: 'LOGIN/SET_USER_DATA', userData} as const)
export const setSignupUserData = (data: TSignupData) =>
    ({ type: 'AUTH/SET_SIGNUP_USER_DATA', payload: { signupUserData: data } } as const)
export const setIsSignupPassConfirmed = (value: boolean) =>
    ({ type: 'AUTH/SET_IS_SIGNUP_PASS_CONFIRMED', payload: { isSignupPassConfirmed: value } } as const)
export const setIsRegistered = (status: boolean) =>
    ({ type: 'AUTH/SET_IS_REGISTERED', payload: { isRegistered: status }} as const)
export const setIsLoggedIn = (value: boolean) =>
    ({ type: 'AUTH/SET_IS_LOGGED_IN', payload: { isLoggedIn: value}} as const)

// thunks

export const login = (data: TLoginData): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.login(data)
        //dispatch(setUserData(response.data))
        dispatch(me())
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const logout = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        await authAPI.logout()
        dispatch(setIsLoggedIn(false))
        //dispatch(setUserData(null))
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const me = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.me()
        //dispatch(setUserData(response.data))
        dispatch(setIsLoggedIn(true))
        dispatch(setInitialized())
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(setInitialized())
    }
}

export const signup = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setAppStatus('loading'))  
        const signupData = getState().auth.signupUserData as TSignupData
        //await authAPI.register(signupData)
        await new Promise((res) => {
            setTimeout(() => {
                res(console.log("Registered"))
            }, 1000)
        })
        dispatch(setIsRegistered(true))
        dispatch(setAppStatus('succeeded'))
    }
    catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

// types



export type TAuthState = typeof initialState
export type TAuthActions =
    //ReturnType<typeof setUserData>
    ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setSignupUserData>
    | ReturnType<typeof setIsSignupPassConfirmed>
    | ReturnType<typeof setIsRegistered>