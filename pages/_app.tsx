/* eslint-disable @typescript-eslint/no-magic-numbers */
import '../src/ui/styles/style.scss';
import React, { useEffect, useState } from 'react';

import {
  setAppStatus,
  setCSR,
  setError,
  me,
  getCategories,
  setCategories,
  setDeviceType,
} from '../src/bll/reducers';
import { wrapper } from '../src/bll/store';
import { useAppDispatch, useAppSelector, useWindowSize } from '../src/common/hooks';
import { TGetCategoriesListRequestRequiredData } from '../src/common/types/request';
import { TCategoriesResponse } from '../src/common/types/response/TCategoriesResponse';
import { ProductsAPI } from '../src/dal/hm/products-api';
import { LoadingScreen } from '../src/ui/components/elements';
import { SpritesMap } from '../src/ui/components/modules/iconSpritesMaps/SpritesMap';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

const App = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { asPath } = router;
  const { isInitialized, isCSR } = useAppSelector(state => state.app);
  const [loadingStage, setLoadingStage] = useState<
    'loading' | 'initialization' | 'complete'
  >('loading');
  const [isLoadingScreenVisible, setisLoadingScreenVisible] = useState(true);

  useEffect(() => {
    const onLoad = async () => {
      dispatch(getCategories());
    };
    if (!pageProps.categories) {
      onLoad();
    }
    setLoadingStage('initialization');
    dispatch(setCSR());
  }, []);
  useEffect(() => {
    isInitialized && setLoadingStage('complete');
  }, [isInitialized]);

  const [history, setHistory] = useState<Array<string>>([]);
  useEffect(() => {
    if (history[history.length - 1] !== asPath) {
      setHistory(prev => [...prev, asPath]);
    }
  }, [asPath]);

  useEffect(() => {
    dispatch(me());
  }, [dispatch]);

  const device = useAppSelector(state => state.layout.device);
  const { width } = useWindowSize();
  useEffect(() => {
    // $md1: 1182;
    // $md2: 991.98;
    // $md3: 767.98;
    // $md4: 479.98;
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
    <div style={{ position: 'relative' }} suppressHydrationWarning>
      {typeof window === 'undefined' && isCSR ? null : (
        <>
          {/* <DebugContainer /> */}
          {loadingStage === 'complete' && (
            <>
              <SpritesMap />
              <Component history={history} {...pageProps} />
            </>
          )}
          {isLoadingScreenVisible && <LoadingScreen stage={loadingStage} />}
        </>
      )}
    </div>
  );
};

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
  if (!ctx.req || (ctx.req.url && ctx.req.url.startsWith('/_next/data'))) {
    // eslint-disable-next-line no-console
    console.log('ss request dumped');
    return { pageProps: {} };
  }
  try {
    const state = store.getState();
    const requiredParams: TGetCategoriesListRequestRequiredData = {
      country: state.regions.country,
      lang: state.regions.lang,
    };
    const response = await ProductsAPI.getCategories(requiredParams);
    const categories = response.data;
    // const response = await fetch("http://localhost:4200/categories")
    // const categories = await response.json() as TCategoriesResponse
    store.dispatch(setCategories(categories));
  } catch (error: any) {
    store.dispatch(setError(error.message));
    store.dispatch(setAppStatus('ssr failed'));
  }

  return {
    pageProps: {
      // categories
      // Call page-level getInitialProps
      // DON'T FORGET TO PROVIDE STORE TO PAGE
      // ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      // Some custom thing for all pages
      // pathname: ctx.pathname,
    },
  };
});

export default wrapper.withRedux(App);
