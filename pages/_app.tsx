import "../src/a1-ui/u2-styles/style.scss"
import React, { useEffect, useState } from 'react';
import type { AppProps } from 'next/app'
import {wrapper} from '../src/a2-bll/store'
import { useRouter } from "next/router";
import { SpritesMap } from "../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/SpritesMap";
import { TCategoriesResponse } from "../src/a0-common/c1-types/t3-response/TCategoriesResponse";
import { setCategories } from "../src/a2-bll/categories-reducer";


const App = ({ Component, pageProps }: AppProps) => {
  const [history, setHistory] = useState<Array<string>>([]);
  const router = useRouter()
  const { asPath } = router;
  useEffect(() => {
    if (history[history.length - 1] !== asPath) {
      setHistory((prev) => ([...prev, asPath] ));
    }
  }, [asPath])
  
  return <>
    <SpritesMap />
    <Component history={history} {...pageProps} />
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


