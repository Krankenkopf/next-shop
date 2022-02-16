import React from 'react';

import { selectPageCategory, selectPageMeta } from '../../src/bll/selectors';
import { useAppSelector } from '../../src/common/hooks';
import { TCategory, TPageMeta } from '../../src/common/types/instance';
import { UnderConstruction } from '../../src/ui/components/elements';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';
import { ProductLayout } from '../../src/ui/components/layouts/ProductLayout';

import Head from 'next/head';
import Router from 'next/router';

export default function Sale(props: any) {
  const categories = useAppSelector(state => state.categories);
  const category = useAppSelector<TCategory>(state => selectPageCategory(state, 'sale'));
  const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, 'sale'));
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <MainLayout title={pageMeta.title} categories={categories} history={props.history}>
      <ProductLayout>
        <Head>
          <title>Sale | Noname Shop</title>
        </Head>
        <UnderConstruction />
      </ProductLayout>
    </MainLayout>
  );
}
