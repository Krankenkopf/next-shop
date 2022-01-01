import "../src/a1-ui/u2-styles/style.scss"
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import { wrapper } from '../src/a2-bll/store'
import { useRouter } from "next/router";
import { SpritesMap } from "../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/SpritesMap";
import { TCategoriesResponse } from "../src/a0-common/c1-types/t3-response/TCategoriesResponse";
import { setCategories } from "../src/a2-bll/categories-reducer";
import { DebugContainer } from "../src/a1-ui/u1-components/cp1-elements/el18-DebugPanel/DebugContainer";
import { useWindowSize } from "../src/a0-common/c3-hooks/useWindowSize";
import { useAppDispatch, useAppSelector } from "../src/a0-common/c3-hooks";
import { setDeviceType } from "../src/a2-bll/layout-reducer";
import { me } from "../src/a2-bll/auth-reducer";
import { LoadingScreen } from "../src/a1-ui/u1-components/cp1-elements/el11-Preloader/LoadingScreen";


const App = ({ Component, pageProps }: AppProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { asPath } = router;
  const isInitialized = useAppSelector(state => state.app.isInitialized)
  const [loadingStage, setLoadingStage] = useState<"loading" | "initialization" | "complete">("loading");
  const [isLoadingScreenVisible, setisLoadingScreenVisible] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setLoadingStage("initialization")
    }, 1000)
  }, [])
  useEffect(() => {
    isInitialized && setLoadingStage("complete");
    /* setTimeout(() => {
      setisLoadingScreenVisible(false)
    }, 10000) */
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

  return <>
    {/* <DebugContainer /> */}
    {/* <Component history={history} {...pageProps} /> */}
    {loadingStage === "complete" && <>
      <SpritesMap />
      <Component history={history} {...pageProps} />
    </>}
    {isLoadingScreenVisible && <LoadingScreen stage={loadingStage}/>}
  </>
}

App.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {
  const response = await fetch("http://localhost:4200/categories")
  const categories = await response.json() as TCategoriesResponse
  store.dispatch(setCategories(categories))

  return {
    pageProps: {
      categories
      // Call page-level getInitialProps
      // DON'T FORGET TO PROVIDE STORE TO PAGE
      //...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {}),
      // Some custom thing for all pages
      //pathname: ctx.pathname,
    },
  }
})
export default wrapper.withRedux(App)


