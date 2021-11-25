
import {AppThunk} from './store';
import {setAppStatus, setInitialized} from "./app-reducer";
import { authAPI, TLoginData, TSignupData } from '../a3-dal/krank/auth-api';
import { handleServerNetworkError } from '../a0-common/c4-utils/errorHandler';
import { Nullable } from '../a0-common/c1-types/t1-instance';
import { batch } from 'react-redux';

export enum AccessLevel {
    UNREGISTERED = 0,
    REGISTERED = 1,
    ADMIN = 2,
    MASTER = 3
}

export type TUserData = {
    id: string,
    email?: string,
    accessLevel: AccessLevel,
    isActivated?: boolean
}

const initialState = {
    signupUserData: null as Nullable<TSignupData>,
    isSignupPassConfirmed: null as Nullable<boolean>,
    //isRegistered: false,
    isLoggedIn: false,

    loginUserData: null as Nullable<TLoginData>,

    userData: null as Nullable<TUserData>
}

export const authReducer = (state: TAuthState = initialState, action: TAuthActions): TAuthState => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
        case "AUTH/SET_IS_SIGNUP_PASS_CONFIRMED":
        case "AUTH/SET_SIGNUP_USER_DATA":
        case "AUTH/SET_LOGIN_USER_DATA":
        //case 'AUTH/SET_IS_REGISTERED':
        case "AUTH/SET_IS_LOGGED_IN":
            return {...state, ...action.payload}
        default: return state
    }
}

// actions

export const setUserData = (userData: TUserData | null) =>
    ({ type: 'AUTH/SET_USER_DATA', payload: { userData } } as const)
export const setSignupUserData = (data: Nullable<TSignupData>) =>
    ({ type: 'AUTH/SET_SIGNUP_USER_DATA', payload: { signupUserData: data } } as const)
export const setLoginUserData = (data: Nullable<TLoginData>) =>
    ({ type: 'AUTH/SET_LOGIN_USER_DATA', payload: { loginUserData: data } } as const)
export const setIsSignupPassConfirmed = (value: Nullable<boolean>) =>
    ({ type: 'AUTH/SET_IS_SIGNUP_PASS_CONFIRMED', payload: { isSignupPassConfirmed: value } } as const)
//export const setIsRegistered = (status: boolean) =>
    //({ type: 'AUTH/SET_IS_REGISTERED', payload: { isRegistered: status }} as const)
export const setIsLoggedIn = (status: boolean) =>
    ({ type: 'AUTH/SET_IS_LOGGED_IN', payload: { isLoggedIn: status}} as const)

// thunks

export const login = (): AppThunk => async (dispatch, getState) => {
    try {
        dispatch(setAppStatus('loading'))
        const loginData = getState().auth.loginUserData as TLoginData
        const response = await authAPI.login(loginData)
        const {accessLevel}  = response.data
        dispatch(setUserData(response.data))
        if (accessLevel >= AccessLevel.REGISTERED) {
            dispatch(setIsLoggedIn(true))
        }
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const logout = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.logout()
        dispatch(setUserData(response.data))
        batch(() => {
            dispatch(setIsLoggedIn(false))
            dispatch(setIsSignupPassConfirmed(null))
            dispatch(setSignupUserData(null))
        })   
        dispatch(setAppStatus('succeeded'))
    } catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

export const me = (): AppThunk => async dispatch => {
    try {
        dispatch(setAppStatus('loading'))
        const response = await authAPI.me()
        dispatch(setUserData(response.data))
        if (response.data.accessLevel >= AccessLevel.REGISTERED) {
            dispatch(setIsLoggedIn(true))
        }
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
       /*  await new Promise((res) => {
            setTimeout(() => {
                res(console.log("Registered"))
            }, 100)
        }) */
        const response = await authAPI.register(signupData)
        const {accessLevel} = response.data
        dispatch(setUserData(response.data))
        if (accessLevel >= AccessLevel.REGISTERED) {
            batch(() => {
            dispatch(setIsSignupPassConfirmed(null))
            dispatch(setSignupUserData(null))
            dispatch(setIsLoggedIn(true)) 
            })
        }
        dispatch(setAppStatus('succeeded'))
    }
    catch (e) {
        handleServerNetworkError(e, dispatch)
    }
}

// types



export type TAuthState = typeof initialState
export type TAuthActions =
    ReturnType<typeof setUserData>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setSignupUserData>
    | ReturnType<typeof setLoginUserData>
    | ReturnType<typeof setIsSignupPassConfirmed>
    //| ReturnType<typeof setIsRegistered>
