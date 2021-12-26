import axios from 'axios';
import qs from "qs"
import { TUserData } from '../a2-bll/auth-reducer';

const HMAPI_URL = "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/"
export const krankAPI_URL = "http://localhost:5000/api/"

export const HMAPI = axios.create(
    {
        baseURL: HMAPI_URL,
        //withCredentials: true,
        headers: {
            'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
            'x-rapidapi-key': 'e41cc2ca38mshe692195e19a8e36p180bd2jsn8a12c69cf37f'
        },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
    }
)

export const krankAPI = axios.create(
    {
        baseURL: krankAPI_URL,
        withCredentials: true,
        headers: {
            "API-KEY": 'krankenkopf',
            "Authorization": "Bearer "
        },
    }
)

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
                localStorage.removeItem("NonameShopAccessToken")
                localStorage.removeItem("NonameShopRefreshToken") 
                const response = await axios.get<TAuthResponse<TUserData>>(`${krankAPI_URL}auth/refresh`, {
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

export const mockAPI = axios.create(
    {
        baseURL: 'http://localhost:4200/'
    }
)

export type TResponse<TData = {}> = {
    data: TData
    info: Array<string>
}
export type TAuthResponse<TData = {}> = {
    data: TData
    auth: { accessToken: string, refreshToken: string }
    info: Array<string>
}