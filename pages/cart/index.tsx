import React from 'react';

import { useAppSelector } from '../../src/common/hooks';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';
import { Usp } from '../../src/ui/components/modules/ads/Usp';
import { CartOverview } from '../../src/ui/components/modules/cart/CartOverview';

import Head from 'next/head';
import Router from 'next/router';

export default function Cart({ history }: any) {
  const categories = useAppSelector(state => state.categories);
  return (
    <MainLayout title="Cart" categories={categories} history={history}>
      <Usp />
      <CartOverview />
    </MainLayout>
  );
}
