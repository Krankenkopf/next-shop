import axios from "axios";
import { TUserData } from "../../a2-bll/auth-reducer";
import { krankAPI, krankAPI_URL, TResponse } from "../api";

type TAuthMeResponse = TResponse<TUserData>
type TLoginResponse = TResponse<TUserData>
type TSignupResponse = TResponse<TUserData>
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
            krankAPI.post<TLoginResponse>(`auth/login`, { email, password }).then(response => {
                const { accessToken, refreshToken } = response.data.auth
                if (accessToken && refreshToken) {
                    localStorage.setItem("NonameShopAccessToken", accessToken)
                    localStorage.setItem("NonameShopRefreshToken", refreshToken)
                }
                return { data: response.data.data, info: response.data.info }
            })
        )
    },

    logout() {
        return (
            krankAPI.get<TAuthMeResponse>(`auth/logout`).then(response => {
                localStorage.removeItem("NonameShopAccessToken")
                localStorage.removeItem("NonameShopRefreshToken")
                return { data: response.data.data, info: response.data.info }
            })
        )
    },

    me() {
        return (
            krankAPI.get<TAuthMeResponse>(`auth/me`).then(response => {
                return { data: response.data.data, info: response.data.info }
            })
        )
    },
    register({ email, password }: TSignupData) {
        return (
            krankAPI.post<TSignupResponse>(`user/register`, { email, password }).then(response => {
                const { accessToken, refreshToken } = response.data.auth
                if (accessToken && refreshToken) {
                    localStorage.setItem("NonameShopAccessToken", accessToken)
                    localStorage.setItem("NonameShopRefreshToken", refreshToken)
                }
                return {data: response.data.data, info: response.data.info}
            })
        )
    },
}

krankAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("NonameShopAccessToken")
    config.headers.Authorization = token ? `Bearer ${token}` : ""
    return config
})

krankAPI.interceptors.response.use(
    config => config,
    async error => {
        const originalRequest = error.config
        if (!error.response) {
            return Promise.reject(error)
        }
        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            try {
                const token = localStorage.getItem("NonameShopRefreshToken")
                const response = await axios.get<TResponse<TUserData>>(`${krankAPI_URL}auth/refresh`, {
                    withCredentials: true,
                    headers: {
                        "API-KEY": 'krankenkopf',
                        "Authorization": token ? `Bearer ${token}` : ""
                    }
                })
                const { accessToken, refreshToken } = response.data.auth
                if (accessToken && refreshToken) {
                    localStorage.setItem("NonameShopAccessToken", accessToken)
                    localStorage.setItem("NonameShopRefreshToken", refreshToken)
                }
                console.log("response intercepted")
                return krankAPI.request(originalRequest)
            } catch (error) {
                console.log("Error while refreshing");
            }
        }
        throw error
    }
)