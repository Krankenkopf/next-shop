import React from 'react';

import { useAppSelector } from '../../src/common/hooks';
import { UnderConstruction } from '../../src/ui/components/elements';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';

import Head from 'next/head';
import Router from 'next/router';

export default function Favorites({ history }: any) {
  const categories = useAppSelector(state => state.categories);
  return (
    <MainLayout title="Favorites" categories={categories} history={history}>
      <UnderConstruction />
    </MainLayout>
  );
}
