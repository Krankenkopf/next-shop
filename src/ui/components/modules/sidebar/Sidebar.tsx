import React, { FC } from 'react';

import { TCategory } from '../../../../common/types/instance';
import { categoryToLiLinkA } from '../../../../common/utils/ui';

import css from './Sidebar.module.scss';

type TSidebarProps = {
  category?: TCategory;
  rootCategoryName?: string;
};

export const Sidebar: FC<TSidebarProps> = ({ category, rootCategoryName }) => {
  // eslint-disable-next-line no-undef
  let mappedCategories: Array<JSX.Element | null> | undefined;
  if (category && category.CategoriesArray) {
    mappedCategories = category.CategoriesArray.map((nestedCategory, i, arr) => {
      const root = `/${rootCategoryName}/${nestedCategory.CategoryValue}`;
      return nestedCategory.CategoriesArray ? (
        <li key={nestedCategory.CategoryValue}>
          <h4>{nestedCategory.CatName}</h4>
          <ul>
            {categoryToLiLinkA(nestedCategory.CategoriesArray, root, css.link, false)}
          </ul>
        </li>
      ) : null; /* if cat has no array, its title will not displayed */
    });
  }

  return (
    <div className={css.sidebar}>
      <ul>
        {category ? (
          <>{mappedCategories}</>
        ) : (
          <>
            <li>
              <h4>New Arrivals</h4>
            </li>
            <li>
              <h4>Trending Now</h4>
            </li>
            <li>
              <h4>Offers</h4>
            </li>
            <li>
              <h4>Shop by Product</h4>
            </li>
            <li>
              <h4>Gift Cards</h4>
            </li>
            <li>
              <h4>Sustainability</h4>
            </li>
            <li>
              <h4>Magazine</h4>
            </li>
            <li>
              <h4>Shop by Occasion</h4>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
