import React from 'react';

import campaignbaby01 from '../../public/images/campaignbaby01.jpg';
import campaignbaby02 from '../../public/images/campaignbaby02.jpg';
import campaignbaby03 from '../../public/images/campaignbaby03.jpg';
import { selectPageCategory, selectPageMeta } from '../../src/bll/selectors';
import { useAppSelector } from '../../src/common/hooks';
import { TCategory, TPageMeta } from '../../src/common/types/instance';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';
import { ProductLayout } from '../../src/ui/components/layouts/ProductLayout';
import { Banner } from '../../src/ui/components/modules/ads/Banner';
import { Campaign } from '../../src/ui/components/modules/ads/Campaign';

import Head from 'next/head';
import Router from 'next/router';

export default function Baby({ history }: any) {
  const categories = useAppSelector(state => state.categories);
  const category = useAppSelector<TCategory>(state => selectPageCategory(state, 'baby'));
  const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, 'baby'));
  return (
    <MainLayout title={pageMeta.title} categories={categories} history={history}>
      <ProductLayout category={category} rootCategoryName={pageMeta.path}>
        <div className="page-content">
          <Banner title="Up to 60% off new-to-sale styles" red />
          <Campaign
            preTitle="Online deal"
            title="Sweet finds from $9.99"
            text="Valid on select items at hm.com until 1/12/2022 or while supplies last"
            img={campaignbaby01}
            imgAltText="campaignbaby01"
          />
          <Banner title="Become an H&M Member & get 10% off your first purchase + rewards just for shopping!">
            <p>
              Don&apos;t forget to opt into Fashion News to have your offers and rewards
              delivered right to your inbox!
            </p>
          </Banner>
          <Campaign
            title="It takes a village"
            text="From growing bumps to raising babies, we're here for it all"
            img={campaignbaby02}
            imgAltText="campaignbaby02"
          />
          <Campaign
            title="Kinder cotton for kids"
            text="All organic, recycled or sourced through the Better Cotton Initiative (BCI)"
            buttonTitle="LEARN MORE"
            img={campaignbaby03}
            imgAltText="campaignbaby03"
          />
        </div>
      </ProductLayout>
    </MainLayout>
  );
}
