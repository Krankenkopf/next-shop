import axios from 'axios';
import qs from "qs"

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



export const mockAPI = axios.create(
    {
        baseURL: 'http://localhost:4200/'
    }
)

export type TResponse<TData = {}> = {
    data: TData
    auth: {accessToken: string, refreshToken: string}
    info: Array<string>
}