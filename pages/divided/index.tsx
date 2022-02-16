import React from 'react';

import campaigndivided01 from '../../public/images/campaigndivided01.jpg';
import campaigndivided02 from '../../public/images/campaigndivided02.jpg';
import campaigndivided03 from '../../public/images/campaigndivided03.jpg';
import { selectPageCategory, selectPageMeta } from '../../src/bll/selectors';
import { useAppSelector } from '../../src/common/hooks';
import { TCategory, TPageMeta } from '../../src/common/types/instance';
import { UnderConstruction } from '../../src/ui/components/elements';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';
import { ProductLayout } from '../../src/ui/components/layouts/ProductLayout';
import { Banner } from '../../src/ui/components/modules/ads/Banner';
import { Campaign } from '../../src/ui/components/modules/ads/Campaign';

import Head from 'next/head';
import Router from 'next/router';

export default function Divided({ history }: any) {
  const categories = useAppSelector(state => state.categories);
  const category = useAppSelector<TCategory>(state =>
    selectPageCategory(state, 'divided'),
  );
  const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, 'divided'));
  return (
    <MainLayout title={pageMeta.title} categories={categories} history={history}>
      <ProductLayout category={category} rootCategoryName={pageMeta.path}>
        <div className="page-content">
          <Banner title="Up to 60% off new-to-sale styles" red />
          <Campaign
            title="True to You denim"
            text="The skinny fit that adapts to your body"
            buttonTitle="SHOP SKINNY JEANS"
            img={campaigndivided01}
            imgAltText="campaigndivided01"
          />
          <Banner title="Become an H&M Member & get 10% off your first purchase + rewards just for shopping!">
            <p>
              Don&apos;t forget to opt into Fashion News to have your offers and rewards
              delivered right to your inbox!
            </p>
          </Banner>
          <Campaign
            title="Winter dresses"
            text="Add some drama to every day & holidays"
            img={campaigndivided02}
            imgAltText="campaigndivided02"
          />
          <Campaign
            title="A wintry mix"
            text="An après ski-inspired collection with Y2K influences & monochrome graphics"
            img={campaigndivided03}
            imgAltText="campaigndivided03"
          />
        </div>
      </ProductLayout>
    </MainLayout>
  );
}
