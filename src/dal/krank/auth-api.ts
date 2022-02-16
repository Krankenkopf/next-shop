import { TUserData } from '../../bll/reducers';
import { krankAPI, KRANKAPI_URL, TAuthResponse } from '../api';

type TAuthMeResponse = TAuthResponse<TUserData>;
type TLoginResponse = TAuthResponse<TUserData>;
type TSignupResponse = TAuthResponse<TUserData>;
export type TLoginData = {
  email: string;
  password: string;
};

export type TSignupData = {
  email: string;
  password: string;
};

export const authAPI = {
  login({ email, password }: TLoginData) {
    return krankAPI
      .post<TLoginResponse>(`auth/login`, { email, password })
      .then(response => {
        const { accessToken, refreshToken } = response.data.auth;
        if (accessToken && refreshToken) {
          localStorage.setItem('NonameShopAccessToken', accessToken);
          localStorage.setItem('NonameShopRefreshToken', refreshToken);
        }
        return { data: response.data.data, info: response.data.info };
      });
  },

  logout() {
    return krankAPI
      .get<TAuthMeResponse>(`auth/logout`)
      .then(response => ({ data: response.data.data, info: response.data.info }))
      .finally(() => {
        localStorage.removeItem('NonameShopAccessToken');
        localStorage.removeItem('NonameShopRefreshToken');
      });
  },

  me() {
    return krankAPI
      .get<TAuthMeResponse>(`auth/me`)
      .then(response => ({ data: response.data.data, info: response.data.info }));
  },
  register({ email, password }: TSignupData) {
    return krankAPI
      .post<TSignupResponse>(`user/register`, { email, password })
      .then(response => {
        const { accessToken, refreshToken } = response.data.auth;
        if (accessToken && refreshToken) {
          localStorage.setItem('NonameShopAccessToken', accessToken);
          localStorage.setItem('NonameShopRefreshToken', refreshToken);
        }
        return { data: response.data.data, info: response.data.info };
      });
  },
};
