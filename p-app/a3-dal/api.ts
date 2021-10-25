import axios from 'axios';

export const HMAPI = axios.create(
    {
        baseURL: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/',
        //withCredentials: true,
        headers: {
            'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com',
            'x-rapidapi-key': 'e41cc2ca38mshe692195e19a8e36p180bd2jsn8a12c69cf37f'
        }
    }
)

export const mockAPI = axios.create(
    {
        baseURL: 'http://localhost:4200/'
    }
)