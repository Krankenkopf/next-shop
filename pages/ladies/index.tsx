import React from 'react';

import campaignladies01 from '../../public/images/campaignladies01.jpg';
import campaignladies02 from '../../public/images/campaignladies02.jpg';
import campaignladies03 from '../../public/images/campaignladies03.jpg';
import { selectPageCategory, selectPageMeta } from '../../src/bll/selectors';
import { useAppSelector } from '../../src/common/hooks';
import { TCategory, TPageMeta } from '../../src/common/types/instance';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';
import { ProductLayout } from '../../src/ui/components/layouts/ProductLayout';
import { Banner } from '../../src/ui/components/modules/ads/Banner';
import { Campaign } from '../../src/ui/components/modules/ads/Campaign';

import Router from 'next/router';

const PAGE_DESC = `Refresh your daily rotation with our women's clothing range. With the freshest
            styles available all in one place, you can expect everyday basics, like
            women's tops and skirts, as well as must-have knitwear and cozy loungewear for
            downtime days. Plans to go out? Our women's dresses line up mini, midi and
            maxi styles that were made for summer evenings, while our stylish jeans and
            pants offer something to flatter every silhouette. Solve your wardrobe woes on
            busy days with cool co-ords, and wrap up to stay warm in our women's jackets
            and coats when extra layers are required. Finish off your favorite new looks
            with an array of trendy accessories, and don't forget to scroll for statement
            footwear in our women's shoes range. Discover more women's fashion by
            scrolling our Conscious collection, which has been crafted with the planet in
            mind – think sustainably sourced materials, including organic cotton and
            recycled polyester.`;

export default function Ladies({ history }: any) {
  const categories = useAppSelector(state => state.categories);
  const category = useAppSelector<TCategory>(state =>
    selectPageCategory(state, 'ladies'),
  );
  const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, 'ladies'));
  return (
    <MainLayout title={pageMeta.title} categories={categories} history={history}>
      <ProductLayout category={category} rootCategoryName={pageMeta.path}>
        <div className="page-content">
          <Banner title="Up to 60% off new-to-sale styles" link="/wrong" red />
          <Campaign
            title="Varsity chic"
            text="Sporty pieces with a Parisian touch"
            img={campaignladies01}
            imgAltText="campaignladies01"
          />
          <Banner title="Become an H&M Member & get 10% off your first purchase + rewards just for shopping!">
            <p>
              Don&apos;t forget to opt into Fashion News to have your offers and rewards
              delivered right to your inbox!
            </p>
          </Banner>
          <Campaign
            title="A bright outlook"
            text="Fresh & vibrant takes on classic silhouettes"
            img={campaignladies02}
            imgAltText="campaignladies02"
          />
          <Campaign
            title="Dreaming of the perfect knit?"
            text="Oh-so-soft with a fresh and modern spin on timeless design"
            img={campaignladies03}
            imgAltText="campaignladies03"
          />
          <p className="paragraph">{PAGE_DESC}</p>
        </div>
      </ProductLayout>
    </MainLayout>
  );
}
