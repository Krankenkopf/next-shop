import React from 'react';

import { wrapper } from '../src/bll/store';
import { useAppSelector } from '../src/common/hooks';
import { BrandIcon, Button, Icon } from '../src/ui/components/elements';
import { MainLayout } from '../src/ui/components/layouts/MainLayout';

import Link from 'next/link';
import Router, { useRouter } from 'next/router';

export default function NotFound({ history, props }: any) {
  const router = useRouter();
  const categories = useAppSelector(state => state.categories);
  const onGotoPreviousClick = () => {
    if (!history || history.length < 2) {
      // to main page
      router.push('/');
    } else {
      router.push(history[history.length - 2]);
    }
  };
  return (
    <MainLayout title="Page Not Found" categories={categories} history={history}>
      <div className="notFound">
        <div className="iconized logo">
          <Link href="/">
            <a>
              <BrandIcon name="handmfull" size="max" />
            </a>
          </Link>
        </div>
        <h2>page not found</h2>
        <p>We&apos;re sorry, but the page you&apos;re looking for is currently unavailable</p>
        <Button variant="ok__alt" onClick={onGotoPreviousClick} orientation="left">
          <div className="iconized wide">
            <Icon name="chevron-right" size="full" rotate={3} />
            <div className="button-text">
              {!history || history.length < 2 ? 'go to main' : 'go to previous'}
            </div>
          </div>
        </Button>
      </div>
    </MainLayout>
  );
}
