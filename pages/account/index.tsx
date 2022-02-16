import React from 'react';

import { useSelector } from 'react-redux';

import { TAuthState } from '../../src/bll/reducers';
import { TState } from '../../src/bll/store';
import { useAppSelector } from '../../src/common/hooks';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';

import Head from 'next/head';
import Router from 'next/router';

export default function Account({ history }: any) {
  const categories = useAppSelector(state => state.categories);
  const { userData } = useSelector<TState, TAuthState>(state => state.auth);
  const { id, accessLevel, email } = userData || {
    id: 'Not initialized',
    accessLevel: 'Not initialized' as const,
    email: 'Not registered',
  };

  return (
    <MainLayout title="Account" categories={categories} history={history}>
      <h3>Account</h3>
      <p>id: {id}</p>
      <p>email: {email}</p>
      <p>Access Level: {accessLevel}</p>
    </MainLayout>
  );
}
