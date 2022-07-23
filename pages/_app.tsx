/* eslint-disable @typescript-eslint/no-magic-numbers */
import '../src/ui/styles/style.scss';
import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';

import {
  setAppStatus,
  setCSR,
  setError,
  me,
  getCategories,
  setCategories,
  setDeviceType,
  setLoaded,
} from '../src/bll/reducers';
import { wrapper } from '../src/bll/store';
import { useAppDispatch, useAppSelector, useWindowSize } from '../src/common/hooks';
import { TGetCategoriesListRequestRequiredData } from '../src/common/types/request';
import { TCategoriesResponse } from '../src/common/types/response/TCategoriesResponse';
import { ProductsAPI } from '../src/dal/hm/products-api';
import { DebugContainer, LoadingScreen } from '../src/ui/components/elements';
import { SpritesMap } from '../src/ui/components/modules/iconSpritesMaps/SpritesMap';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

export enum LOADING_STAGE {
  'loading' = 1,
  'initialization' = 2,
  'complete' = 3,
}

const App = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { asPath } = router;
  const { isLoaded, isInitialized, isCSR } = useAppSelector(state => state.app);
  const [loadingStage, setLoadingStage] = useState<LOADING_STAGE>(1);
  const [scrollLock, setScrollLock] = useState(true);
  const [isLoadingScreenVisible, setisLoadingScreenVisible] = useState(true);

  useEffect(() => {
    const onLoad = async () => {
      dispatch(getCategories());
    };
    if (!pageProps.ssr) {
      console.log('no ss data');
      onLoad();
    }
    setLoadingStage(2);
    dispatch(setCSR());
  }, []);
  useEffect(() => {
    if (isInitialized && isLoaded) {
      setLoadingStage(3);
      setTimeout(() => {
        setScrollLock(false);
      }, 500);
    }
  }, [isLoaded, isInitialized]);

  const [history, setHistory] = useState<Array<string>>([]);
  useEffect(() => {
    if (history[history.length - 1] !== asPath) {
      setHistory(prev => [...prev, asPath]);
    }
  }, [asPath]);

  useEffect(() => {
    dispatch(me());
  }, []);

  const device = useAppSelector(state => state.layout.device);
  const { width } = useWindowSize();
  useEffect(() => {
    // $md1: 1182;
    // $md2: 991.98;
    // $md3: 767.98;
    // $md5: 479.98;
    switch (true) {
      case width <= 479.98: {
        device !== 'mobile' && dispatch(setDeviceType('mobile'));
        break;
      }
      case width > 479.98 && width <= 767.98: {
        device !== 'tablet' && dispatch(setDeviceType('tablet'));
        break;
      }
      case width > 767.98 && width <= 991.98: {
        device !== 'laptop' && dispatch(setDeviceType('laptop'));
        break;
      }
      case width > 991.98: {
        device !== 'desktop' && dispatch(setDeviceType('desktop'));
        break;
      }
      // no default
    }
  }, [width]);

  return (
    <div
      className={scrollLock ? '_lock' : undefined}
      style={{ position: 'relative' }}
      suppressHydrationWarning>
      {typeof window === 'undefined' && isCSR ? null : (
        <>
          {/* <DebugContainer /> */}
          {isLoadingScreenVisible && <LoadingScreen stage={loadingStage} />}
          {loadingStage >= LOADING_STAGE.initialization && (
            <>
              {process.env.NEXT_PUBLIC_NODE_ENV === 'development' && <DebugContainer />}
              <SpritesMap />
              <Component history={history} {...pageProps} />
            </>
          )}
        </>
      )}
    </div>
  );
};

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
  if (!ctx.req || (ctx.req.url && ctx.req.url.startsWith('/_next/data'))) {
    console.log('ss request dumped');
    return { pageProps: { ssr: false } };
  }
  const state = store.getState();
  const requiredParams: TGetCategoriesListRequestRequiredData = {
    country: state.regions.country,
    lang: state.regions.lang,
  };
  const timeout = new Promise((res, rej) => {
    setTimeout(() => {
      rej(new Error('ss request timeout'));
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 8000);
  });
  const response = ProductsAPI.getCategories(requiredParams);
  try {
    const categories = (
      (await Promise.race([response, timeout])) as AxiosResponse<TCategoriesResponse>
    ).data;
    // const response = await fetch("http://localhost:4200/categories")
    // const categories = await response.json() as TCategoriesResponse
    store.dispatch(setCategories(categories));
    store.dispatch(setLoaded());
    return {
      pageProps: {
        ssr: true,
        // Call page-level getInitialProps
        // ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
        // Some custom thing for all pages
        // pathname: ctx.pathname,
      },
    };
  } catch (error: any) {
    console.log(error.message);
    store.dispatch(setError(error.message));
    store.dispatch(setAppStatus('ss request failed'));
    return {
      pageProps: {
        ssr: false,
      },
    };
  }
});

export default wrapper.withRedux(App);
