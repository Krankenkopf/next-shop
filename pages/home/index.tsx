import React from 'react';

import campaignhome01 from '../../public/images/campaignhome01.jpg';
import { selectPageCategory, selectPageMeta } from '../../src/bll/selectors';
import { useAppSelector } from '../../src/common/hooks';
import { TCategory, TPageMeta } from '../../src/common/types/instance';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';
import { ProductLayout } from '../../src/ui/components/layouts/ProductLayout';
import { Banner } from '../../src/ui/components/modules/ads/Banner';
import { Campaign } from '../../src/ui/components/modules/ads/Campaign';

import Head from 'next/head';
import Router from 'next/router';

const PAGE_DESC = `Level up your interior aesthetics with our home décor range. Whether you've
            moved into a new home, or you want to breathe new life into your existing
            living space, our collection has every room in the house covered. Our
            furniture edit offers stunning side tables and comfy lounge chairs, plus
            there's an array of chic lighting to create a calming ambience. Looking for
            those finishing touches? Check out our beautiful bed linen, and top it off by
            scrolling for decorative cushions and cushion covers, or create textured
            layers with blankets and throws. When it comes to decorations, add scented
            candles to your bathroom, give your favorite plants a place to call home in
            our chic plant pots, or experiment with wall hangings and elegant glassware.
            Whether your preferred style is minimalistic or bold, we've got something to
            suit every taste in our home décor range.`;

export default function Home({ history }: any) {
  const categories = useAppSelector(state => state.categories);
  const category = useAppSelector<TCategory>(state => selectPageCategory(state, 'home'));
  const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, 'home'));
  return (
    <MainLayout title={pageMeta.title} categories={categories} history={history}>
      <ProductLayout category={category} rootCategoryName={pageMeta.path}>
        <Head>
          <title>Household | Noname Shop</title>
        </Head>
        <div className="page-content">
          <Banner title="Up to 60% off new-to-sale styles" red />
          <Campaign
            title={`Find your new bathroom favorites `}
            text="Soft towels, stylish storage & comfy robes"
            img={campaignhome01}
            imgAltText="campaignhome01"
          />
          <Banner title="Become an H&M Member & get 10% off your first purchase + rewards just for shopping!">
            <p>
              Don&apos;t forget to opt into Fashion News to have your offers and rewards
              delivered right to your inbox!
            </p>
          </Banner>
          <p className="paragraph">{PAGE_DESC}</p>
        </div>
      </ProductLayout>
    </MainLayout>
  );
}
