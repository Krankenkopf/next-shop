import { krankAPI, TResponse } from "../api";

type TAuthMeResponse = TResponse<{ id: number, email: string, login: string }>
type TLoginResponse = TResponse<{ id: number }>
export type TLoginData = {
    email: string
    password: string
}

export type TSignupData = {
    email: string
    password: string
}

export const authAPI = {
    login({email, password}: TLoginData) {
        return (
            krankAPI.post<TLoginResponse>(`auth/login`, {email, password})
        )
    },

    logout() {
        return (
            krankAPI.get<TResponse>(`auth/logout`)
        )
    },

    me() {
        return (
            krankAPI.get<TAuthMeResponse>(`auth/me`).then(response => {
                return response.data
            })
        )
    },
    register({ email, password }: TSignupData) {
        return (
            krankAPI.post<TAuthMeResponse>(`auth/register`, { email, password }).then(response => {
                return response.data
            })
        )
    },
}