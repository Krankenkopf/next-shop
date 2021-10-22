import App from 'next/app'
import "../styles/globals.css"
import type { AppProps , AppContext } from 'next/app'
import React from 'react';

type THistoryState = {
    history: Array<string>
}

export default class MyApp extends App {

    // Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }
  
    state: THistoryState = {
      history: [] // keep history items in state
    };
  
    componentDidMount() {
      const { asPath } = this.props.router;
  
      // lets add initial route to `history`
      this.setState((prevState: THistoryState) => ({ history: [...prevState.history, asPath] }));
    }
  
    componentDidUpdate() {
      const { history } = this.state;
      const { asPath } = this.props.router;
  
      // if current route (`asPath`) does not equal
      // the latest item in the history,
      // it is changed so lets save it
      if (history[history.length - 1] !== asPath) {
        this.setState((prevState: THistoryState) => ({ history: [...prevState.history, asPath] }));
      }
    }
  
    render() {
      const { Component, pageProps } = this.props;
  
      return (
          <Component history={this.state.history} {...pageProps} />
      );
    }
  }
  


