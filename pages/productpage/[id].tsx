import React, { useEffect, useMemo, useState } from 'react';

import { getProduct, setProduct } from '../../src/bll/reducers';
import {
  selectAppStatus,
  selectCartItemCodes,
  selectIsMobileDevice,
} from '../../src/bll/selectors';
import { wrapper } from '../../src/bll/store';
import { useAppDispatch, useAppSelector } from '../../src/common/hooks';
import { Nullable } from '../../src/common/types/instance';
import { TProductDetail } from '../../src/common/types/instance/TProductDetail';
import { TGetProductDetailRequestRequiredData } from '../../src/common/types/request';
import { ProductsAPI } from '../../src/dal/hm/products-api';
import { Preloader } from '../../src/ui/components/elements';
import { MainLayout } from '../../src/ui/components/layouts/MainLayout';
import { Banner } from '../../src/ui/components/modules/ads/Banner';
import { ProductDetail } from '../../src/ui/components/modules/productModules/productDetail/ProductDetail';
import { ProductDetailMobile } from '../../src/ui/components/modules/productModules/productDetail/ProductDetailMobile';

import { useRouter } from 'next/dist/client/router';

type TProductPageSSProps = {
  productSS: Nullable<TProductDetail>;
};

type TProductPageProps = {
  history: Array<string>;
};

export default function ProductPage({
  history,
  productSS,
}: TProductPageSSProps & TProductPageProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const categories = useAppSelector(state => state.categories);
  const isMobileDevice = useAppSelector(selectIsMobileDevice);
  const status = useAppSelector(selectAppStatus);
  const cartItemCodes = useAppSelector(selectCartItemCodes);
  const productCS = useAppSelector(state => state.product.product);
  const [product, setProductCS] = useState(productSS);
  const [currentArticle, setCurrentArticle] = useState(() => {
    if (productSS) {
      return productSS.articlesList.find(article => article.code === productSS.code);
    }
  });

  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const onLoad = () => {
      const queryId = router.query.id as string;
      dispatch(getProduct(queryId));
    };
    if (!productSS && !productCS) {
      onLoad();
    }
    if (productCS) {
      setProductCS(productCS);
      setCurrentArticle(
        productCS.articlesList.find(article => article.code === productCS.code),
      );
    }
  }, [productCS]);

  useEffect(() => {
    currentArticle &&
      setIsInCart(cartItemCodes.some(code => code === currentArticle.code));
  }, []);

  const onGotoPreviousClick = () => {
    if (!history || history.length <= 1) {
      // to main page
      router.push('/');
    } else {
      router.push(history[history.length - 1 - 1]);
    }
  };

  // toggle variants
  const articleCodes = useMemo(() => {
    if (product) {
      return product.articlesList.map(article => article.code);
    }
    return [];
  }, [product]);
  const articleTitles = useMemo(() => {
    if (product) {
      return product.articlesList.map(article => (
        <figure key={article.code}>
          <img
            src={`${
              article.galleryDetails.find(
                item => item.assetType === 'DESCRIPTIVESTILLLIFE',
              )?.url
            }&call=url[file:/product/main]`}
            title={article.colourDescription}
            alt={article.colourDescription}
          />
        </figure>
      ));
    }
    return [];
  }, [product]);
  const onArticleToggle = (code: string) => {
    product &&
      setCurrentArticle(product.articlesList.find(article => article.code === code));
  };

  return (
    <MainLayout
      title={product ? product.name : 'Product Page'}
      categories={categories}
      history={history}
    >
      {currentArticle && (
        <>
          {isMobileDevice ? (
            <ProductDetailMobile
              currentArticle={currentArticle}
              isInCart={isInCart}
              articleCodes={articleCodes}
              articleTitles={articleTitles}
              onArticleVariantsToggle={onArticleToggle}
            />
          ) : (
            <ProductDetail
              currentArticle={currentArticle}
              isInCart={isInCart}
              articleCodes={articleCodes}
              articleTitles={articleTitles}
              onArticleVariantsToggle={onArticleToggle}
            />
          )}
          <section className="product-detail__stylewith">
            <h4>Style with</h4>
          </section>
          <section className="product-detail__alsobought">
            <h4>Others also bought</h4>
          </section>
          <Banner title="" link="/">
            <p className="text">
              By 2030, we aim to only work with recycled, organic, or other sustainably
              sourced materials.
            </p>
            <h3>
              <strong>Right now, we&apos;re at 64%.</strong>
            </h3>
            <p>
              Curious about what we&apos;re doing to lessen our environmental impact? Read
              more here.
            </p>
          </Banner>
        </>
      )}
      <Preloader isVisible={status === 'content loading'} />
    </MainLayout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps<TProductPageSSProps>(
  store =>
    async ({ req, query, resolvedUrl }) => {
      if (!req || (req.url && req.url.startsWith('/_next/data'))) {
        return { props: { productSS: null } };
      }
      try {
        const state = store.getState();
        const queryId = query.id as string;
        if (!queryId) {
          return { notFound: true };
        }
        const region = state.regions;

        const requiredParams: TGetProductDetailRequestRequiredData = {
          country: region.country,
          lang: region.lang,
          productcode: queryId,
        };

        // const response = await (await fetch("http://localhost:4200/detail")).json() as TProductDetailResponse
        // const productSS = response.product

        const response = await ProductsAPI.getProductDetail(requiredParams);
        const productSS = response.data.product;

        store.dispatch(setProduct(productSS));

        return { props: { productSS } };
      } catch (e) {
        return { props: { productSS: null } };
      }
    },
);
