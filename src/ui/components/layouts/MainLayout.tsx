import React, { FC, useEffect } from 'react';

import { TCategoriesState } from '../../../bll/reducers';
import { Footer } from '../modules/footer/Footer';
import { Header } from '../modules/header/Header';
import { Modals, TModal } from '../modules/modal/Modals';

import Head from 'next/head';

type TMainLayoutProps = {
  title: string;
  categories: TCategoriesState;
  history: Array<string>;
};

export const MainLayout: FC<TMainLayoutProps> = ({
  children,
  title = 'Noname Shop',
  categories,
  history,
}: any) => (
  <>
    <Head>
      <title>{title} | Noname Shop</title>
      <meta name="keywords" content="some_keyword,another_keyword" />
      <meta name="description" content="some description" />
      <meta charSet="utf-8" />
    </Head>
    <Header categories={categories} />
    <main className="wrapper _container">{children}</main>
    <Footer />
    <Modals />
  </>
);
