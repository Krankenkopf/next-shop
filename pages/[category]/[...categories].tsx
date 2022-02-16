import React, { useEffect, useState } from 'react';

import { setFacets } from '../../src/bll/reducers/filters';
import {
  setCategory,
  setCurrentPage,
  setPageSize,
  setTotalNumbers,
} from '../../src/bll/reducers/navigation';
import { setProducts } from '../../src/bll/reducers/products';
import { setSortBy } from '../../src/bll/reducers/sort';
import { selectPageCategory, selectPageMeta } from '../../src/bll/selectors';
import { wrapper } from '../../src/bll/store';
import { useAppSelector } from '../../src/common/hooks';
import {
  Nullable,
  TCategory,
  TPageMeta,
  TRootCategoryValue,
} from '../../src/common/types/instance';
import { TProduct } from '../../src/common/types/instance/TProduct';
import {
  TGetProductsListRequestRequiredData,
  TGetProductsListRequestOptionalData,
} from '../../src/common/types/request';
import {
  TAnyFacet,
  TPagination,
} from '../../src/common/types/response/TProductsResponse';
import {
  extractRelevantFacets,
  getKeys,
  getRequestedCategory,
} from '../../src/common/utils/state';
import { ProductsAPI } from '../../src/dal/hm/products-api';
import { Timer } from '../../src/ui/components/elements';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';
import { ProductLayout } from '../../src/ui/components/layouts/ProductLayout';
import { Banner } from '../../src/ui/components/modules/ads/Banner';
import { ProductsContent } from '../../src/ui/components/modules/productModules/productsContent/ProductsContent';

import { useRouter } from 'next/router';

type TCategorySSProps = {
  categorySS?: TCategory;
  productsSS: Nullable<Array<TProduct>>;
};
type TCategoryProps = {
  history: Array<string>;
};

export default function Category({
  categorySS,
  productsSS,
  history,
}: TCategorySSProps & TCategoryProps) {
  const router = useRouter();
  const appError = useAppSelector(state => state.app.error);
  const currentCategory = router.asPath.split('/')[1] as TRootCategoryValue;
  const categories = useAppSelector(state => state.categories);

  const rootCategory = useAppSelector<TCategory>(state =>
    selectPageCategory(state, currentCategory),
  );
  const pageMeta = useAppSelector<TPageMeta>(state =>
    selectPageMeta(state, currentCategory),
  );

  useEffect(() => {
    if (appError === 'not found') {
      router.push('/404', router.asPath);
    }
  }, [appError]);

  useEffect(() => {
    if (!getKeys(categories).some(category => category === currentCategory)) {
      router.push('/404', router.asPath);
    }
  }, [currentCategory]);

  return (
    <MainLayout title={pageMeta.title} categories={categories} history={history}>
      <ProductLayout category={rootCategory} rootCategoryName={pageMeta.path}>
        <div className="page-content">
          <Banner title="30% off sitewide for Cyber Monday!" link="/ladies/f">
            <div>DON&apos;T WAIT!</div>
            <div>
              <Timer endDate="Jan 18, 2022 00:00:00" />
            </div>
          </Banner>
          <ProductsContent productsSS={productsSS} />
        </div>
      </ProductLayout>
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps<TCategorySSProps>(
  store =>
    async ({ req, query, resolvedUrl }) => {
      if (!req || (req.url && req.url.startsWith('/_next/data'))) {
        return { props: { productsSS: null } };
      }
      try {
        const state = store.getState();
        const queryCategories = query.categories as Array<string>;
        const targetedCategory = getRequestedCategory(
          resolvedUrl,
          queryCategories,
          state.categories,
        );
        if (!targetedCategory) {
          return { notFound: true };
        }
        const region = state.regions;
        const { navigation } = state;

        const requiredParams: TGetProductsListRequestRequiredData = {
          country: region.country,
          lang: region.lang,
          currentpage: navigation.currentPage,
          pagesize: navigation.pageSize,
        };
        const optionalParams: TGetProductsListRequestOptionalData = {
          categories: targetedCategory?.tagCodes,
        };
        // const response = await fetch("http://localhost:4200/results")
        // const productsSS = await response.json() as Array<TProduct>
        const paginationSS = await fetch('http://localhost:4200/pagination');
        const {
          currentPage,
          pageSize,
          numberOfPages,
          totalNumberOfResults,
          totalNumberOfResultsUnfiltered,
          sort,
        } = (await paginationSS.json()) as TPagination;
        const facetsSS = await fetch('http://localhost:4200/facets');
        const anyFacetsSS = (await facetsSS.json()) as Array<TAnyFacet>;
        const relevantFacetsSS = extractRelevantFacets(anyFacetsSS, state.filters.facets);
        const response = await ProductsAPI.getList(requiredParams, optionalParams);
        const productsSS = response.data.results;
        // products
        store.dispatch(setProducts(productsSS));
        // navigation
        targetedCategory && store.dispatch(setCategory(targetedCategory));
        store.dispatch(setCurrentPage(currentPage));
        store.dispatch(setPageSize(pageSize));
        store.dispatch(
          setTotalNumbers(
            numberOfPages,
            totalNumberOfResults,
            totalNumberOfResultsUnfiltered,
          ),
        );
        // sort&filters
        store.dispatch(setSortBy(sort));
        store.dispatch(setFacets(relevantFacetsSS));

        return { props: { productsSS, categorySS: targetedCategory } };
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        return { props: { productsSS: null } };
      }
    },
);
