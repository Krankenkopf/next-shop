import React, { FC, useEffect, useState } from 'react';

import {
  TNavigationState,
  TLayoutState,
  TRequestStatus,
  getProducts,
  setProductsLayout,
} from '../../../../../bll/reducers';
import { selectAppStatus, selectCartItemCodes } from '../../../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { Nullable } from '../../../../../common/types/instance';
import { TProduct } from '../../../../../common/types/instance/TProduct';
import { Paginator, Preloader } from '../../../elements';
import { Filters } from '../../filters/Filters';
import { ProductsList } from '../productsList/ProductsList';

import { useRouter } from 'next/router';

type TProductsContentProps = {
  productsSS: Nullable<Array<TProduct>>;
};

export const ProductsContent: FC<TProductsContentProps> = ({ productsSS }) => {
  const dispatch = useAppDispatch();
  const { pathname, query, asPath } = useRouter();
  const status = useAppSelector<TRequestStatus>(selectAppStatus);
  const { currentPage, category, pageSize, numberOfPages, totalNumberOfResults } =
    useAppSelector<TNavigationState>(state => state.navigation);
  const { device, productsLayout, productsFirstImage } = useAppSelector<TLayoutState>(
    state => state.layout,
  );
  const products = useAppSelector<Nullable<Array<TProduct>>>(
    state => state.products.products,
  );
  const cart = useAppSelector(selectCartItemCodes);
  const [favorites, setFavorites] = useState<Array<string>>([]);

  useEffect(() => {
    const onLoad = async () => {
      const queryCategories = query.categories as Array<string>;
      dispatch(getProducts(asPath, queryCategories));
    };
    if (!productsSS) {
      onLoad();
    }
  }, [asPath]);

  useEffect(() => {
    switch (device) {
      case 'mobile': {
        if (productsLayout !== 'list1') {
          dispatch(setProductsLayout('list1'));
        }
        break;
      }
      case 'tablet': {
        if (productsLayout !== 'grid2') {
          dispatch(setProductsLayout('grid2'));
        }
        break;
      }
      case 'laptop': {
        if (productsLayout !== 'grid3') {
          dispatch(setProductsLayout('grid3'));
        }
        break;
      }
      case 'desktop': {
        if (productsLayout !== 'grid4') {
          dispatch(setProductsLayout('grid4'));
        }
        break;
      }
      // no default
    }
  }, [device]);

  return (
    <>
      {products && (
        <>
          <header style={{ paddingLeft: '15px', marginBottom: '25px' }}>
            <h3>{category?.CatName}</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque voluptate,
              veritatis exercitationem ipsam atque quos ut molestias id possimus dolores
              dicta nemo! Nemo, asperiores cumque. Optio quibusdam molestias reprehenderit
              explicabo?
            </p>
          </header>
          <Filters />
        </>
      )}
      <div className="products-list__container">
        {products && (
          <ProductsList
            products={products}
            favorites={favorites}
            cart={cart}
            device={device}
            layout={productsLayout}
            firstImg={productsFirstImage}
          />
        )}
        {products && (
          <div className="products-list__paginator">
            <Paginator
              currentPage={currentPage + 1}
              itemsPerPage={pageSize}
              itemsTotalCount={totalNumberOfResults}
              setCurrentPage={() => {}}
            />
          </div>
        )}
        <Preloader isVisible={status === 'content loading'} />
      </div>
    </>
  );
};
