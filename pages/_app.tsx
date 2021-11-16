import "../p-app/a1-ui/u2-styles/style.scss"
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import {store} from '../p-app/a2-bll/store'
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const [history, setHistory] = useState<Array<string>>([]);
  const router = useRouter()
  const { asPath } = router;
  useEffect(() => {
    if (history[history.length - 1] !== asPath) {
      setHistory((prev) => ([...prev, asPath] ));
    }
  }, [asPath])
  
  return (
    <Provider store={store}>
      <Component history={history} {...pageProps} />
    </Provider>
  )
}

