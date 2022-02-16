import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { parseCookies } from 'nookies';

import { TUserData, TAppState } from '../../../../bll/reducers';
import { useAppSelector } from '../../../../common/hooks';
import { Nullable } from '../../../../common/types/instance';
import { getKeys } from '../../../../common/utils/state';

import { DebugPanel } from './DebugPanel';

export const DebugContainer = () => {
  const userData = useAppSelector<Nullable<TUserData>>(state => state.auth.userData);
  const appData = useAppSelector<Nullable<TAppState>>(state => state.app);
  const cartItemsCount = useAppSelector(state => state.cart.products.length);
  const userKeys = useMemo(
    () => ['user id', 'email', 'access level', 'LS access token', 'LS refresh token'],
    [],
  );

  const getTokens = () => {
    const isCSR = typeof window === 'object';
    const accessToken =
      isCSR && localStorage.getItem('NonameShopAccessToken')?.split('.')[2];
    const refreshToken =
      isCSR && localStorage.getItem('NonameShopRefreshToken')?.split('.')[2];
    return { accessToken, refreshToken };
  };

  const userValues = useMemo(
    () => [
      userData?.id,
      userData?.email,
      userData?.accessLevel,
      getTokens().accessToken,
      getTokens().refreshToken,
    ],
    [userData],
  );
  const [parsedCookies, setParsedCookies] = useState({});
  useEffect(() => {
    const cookies = parseCookies();
    setParsedCookies(cookies);
  }, []);
  const cookiesKeys = getKeys(parsedCookies);
  const cookiesValues = Object.values(parsedCookies);
  const appKeys = useMemo(
    () => ['status', 'error', 'initialization complete', 'need update'],
    [],
  );
  const appValues = useMemo(
    () => [
      appData?.status,
      appData?.error,
      appData?.isInitialized,
      appData?.isNeedUpdate,
    ],
    [appData],
  );
  const cartKey = 'cart items count';
  const cartValue = cartItemsCount;
  return (
    <DebugPanel
      keys={[...userKeys, ...cookiesKeys, ...appKeys, cartKey]}
      values={[...userValues, ...cookiesValues, ...appValues, cartValue]}
    />
  );
};
