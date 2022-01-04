import "../src/a1-ui/u2-styles/style.scss"
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import { wrapper } from '../src/a2-bll/store'
import { useRouter } from "next/router";
import { SpritesMap } from "../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/SpritesMap";
import { TCategoriesResponse } from "../src/a0-common/c1-types/t3-response/TCategoriesResponse";
import { getCategories, setCategories } from "../src/a2-bll/categories-reducer";
import { DebugContainer } from "../src/a1-ui/u1-components/cp1-elements/el18-DebugPanel/DebugContainer";
import { useWindowSize } from "../src/a0-common/c3-hooks/useWindowSize";
import { useAppDispatch, useAppSelector } from "../src/a0-common/c3-hooks";
import { setDeviceType } from "../src/a2-bll/layout-reducer";
import { me } from "../src/a2-bll/auth-reducer";
import { LoadingScreen } from "../src/a1-ui/u1-components/cp1-elements/el11-Preloader/LoadingScreen";
import { setAppStatus, setCSR, setError } from "../src/a2-bll/app-reducer";

const App = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { asPath } = router;
  const {isInitialized, isCSR} = useAppSelector(state => state.app)
  const [loadingStage, setLoadingStage] = useState<"loading" | "initialization" | "complete">("loading");
  const [isLoadingScreenVisible, setisLoadingScreenVisible] = useState(true);
  console.log("app");
  
  useEffect(() => {
    const onLoad = async () => { 
      dispatch(getCategories())
    }
    if (!pageProps.categories) {
      console.log("app client request");
      onLoad()
    }
    
    setTimeout(() => {
      setLoadingStage("initialization")
      dispatch(setCSR())
    }, 1000)
  }, [])
  useEffect(() => {
    isInitialized && setLoadingStage("complete");
  }, [isInitialized])

  const [history, setHistory] = useState<Array<string>>([]);
  useEffect(() => {
    if (history[history.length - 1] !== asPath) {
      setHistory((prev) => ([...prev, asPath]));
    }  
  }, [asPath])

  useEffect(() => {
    dispatch(me())
  }, [dispatch])

  const device = useAppSelector(state => state.layout.device)
  const { width } = useWindowSize()
  useEffect(() => {
    //$md1: 1182;
    //$md2: 991.98;
    //$md3: 767.98;
    //$md4: 479.98;
    switch (true) {
      case (width <= 479.98): {
        device !== "mobile" && dispatch(setDeviceType("mobile")); break
      }
      case (width > 479.98 && width <= 767.98): {
        device !== "tablet" && dispatch(setDeviceType("tablet")); break
      }
      case (width > 767.98 && width <= 991.98): {
        device !== "laptop" && dispatch(setDeviceType("laptop")); break
      }
      case (width > 991.98): {
        device !== "desktop" && dispatch(setDeviceType("desktop")); break
      }
    }
  }, [width])

  return <div style={{position: "relative"}} suppressHydrationWarning>
    {typeof window === 'undefined' && isCSR
      ? null
      : <>
      {/* <DebugContainer /> */}
    {/* <Component history={history} {...pageProps} /> */}
    {loadingStage === "complete" && <>
      <SpritesMap />
      <Component history={history} {...pageProps} />
    </>}
    {isLoadingScreenVisible && <LoadingScreen stage={loadingStage}/>}
      </>}
  </div>
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
  if (!ctx.req || (ctx.req.url && ctx.req.url.startsWith('/_next/data'))) {
    console.log("ss request dumped");
    return { pageProps: { } }
  }
  try {
      const response = await fetch("http://localhost:4200/categories")
      const categories = await response.json() as TCategoriesResponse
      store.dispatch(setCategories(categories))
  } catch (error: any) {
    store.dispatch(setError(error.message))
    store.dispatch(setAppStatus("ssr failed"))
  }
  
  return {
    pageProps: {
      //categories
      // Call page-level getInitialProps
      // DON'T FORGET TO PROVIDE STORE TO PAGE
      //...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      // Some custom thing for all pages
      //pathname: ctx.pathname,
    },
  }
})

export default wrapper.withRedux(App)
