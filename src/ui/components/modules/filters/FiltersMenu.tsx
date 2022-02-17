import React, { useCallback, useState } from 'react';

import {
  TSortState,
  TFiltersState,
  TFilterKey,
  setSortBy,
  setFilter,
} from '../../../../bll/reducers';
import {
  selectFilters,
  selectItemsTotalCount,
  selectItemsTotalCountUnfiltered,
  selectSort,
} from '../../../../bll/selectors';
import { FILTERSSORTTITLES, SIZETITLES, SORTTITLES } from '../../../../common/constants';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { TSortValue } from '../../../../common/types/request';
import { convertObjToFlags, getKeys } from '../../../../common/utils/state';
import { Icon, Radio, Button } from '../../elements';

import { CollectionsMenu } from './collectionsMenu/CollectionsMenu';
import { ColorsMenu } from './colorsMenu/ColorsMenu';
import { DefaultFilterMenu } from './defaultFilterMenu/DefaultFilterMenu';
import css from './Filters.module.scss';
import { SizesSideMenu } from './sizesMenu/SizesSideMenu';

type TFiltersMenuProps = {};

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const FiltersMenu = () => {
  const dispatch = useAppDispatch();
  const { sortBy, sortValues } = useAppSelector<TSortState>(selectSort);
  const { current, facets } = useAppSelector<TFiltersState>(selectFilters);
  const totalCount = useAppSelector<number>(selectItemsTotalCount);
  const totalCountUnfiltered = useAppSelector<number>(selectItemsTotalCountUnfiltered);

  const rootTitle = 'Filter&Sort';
  const [currentMenuTitle, setCurrentMenuTitle] = useState(rootTitle);
  const menuTypes: Array<'sort' | TFilterKey> = ['sort', ...getKeys(facets)];

  const [currentMenu, setCurrentMenu] = useState<'' | ArrayElement<typeof menuTypes>>('');
  const onMenuToggle = (type: '' | ArrayElement<typeof menuTypes>) => {
    setCurrentMenu(type);
    setCurrentMenuTitle(FILTERSSORTTITLES.find(filter => filter.code === type)?.title || rootTitle);
  };

  const mappedFilters = FILTERSSORTTITLES.map(title => (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li key={title.code} onClick={() => onMenuToggle(title.code)} className={css.menuTitle}>
      <div className="iconized right">
        <Icon
          name="chevron-right"
          size="max"
          side="right"
          className={css.filter__btn__icon}
          containerClassName={css.filter__btn}
        />
        <span>{title.title}</span>
      </div>
    </li>
  ));
  const onSortOptionChange = (value: TSortValue) => {
    dispatch(setSortBy(value));
  };

  const onCategoryOptionChange = (state: boolean, value: string) => {
    const category = currentMenu as TFilterKey | undefined;
    if (category) {
      state
        ? dispatch(setFilter({ [category]: [...current[category], value] }))
        : dispatch(
            setFilter({
              [category]: [...current[category].filter(option => option !== value)],
            }),
          );
    }
  };
  const getMenu = () => {
    switch (currentMenu) {
      case 'sort':
        return (
          <Radio
            titles={SORTTITLES}
            options={sortValues}
            value={sortBy}
            className={css.radio}
            onChangeOption={onSortOptionChange}>
            <Icon
              name="circle"
              size="max"
              containerClassName={css.radioSplash__container}
              className={css.radioSplash}
            />
          </Radio>
        );
      case 'sizes':
        return (
          facets.sizes && (
            <SizesSideMenu
              sizes={facets.sizes}
              selected={current.sizes}
              onOptionChange={onCategoryOptionChange}
            />
          )
        );
      case 'contexts':
        return (
          facets.contexts && (
            <DefaultFilterMenu
              categoryOptions={facets.contexts}
              selected={current.contexts}
              onOptionChange={onCategoryOptionChange}
            />
          )
        );
      case 'concepts':
        return (
          facets.concepts && (
            <DefaultFilterMenu
              categoryOptions={facets.concepts}
              selected={current.concepts}
              onOptionChange={onCategoryOptionChange}
            />
          )
        );
      case 'collection':
        return (
          facets.collection && (
            <CollectionsMenu
              collections={facets.collection}
              selected={current.collection}
              onOptionChange={onCategoryOptionChange}
            />
          )
        );
      case 'qualities':
        return (
          facets.qualities && (
            <DefaultFilterMenu
              categoryOptions={facets.qualities}
              selected={current.qualities}
              onOptionChange={onCategoryOptionChange}
            />
          )
        );
      case 'fits':
        return (
          facets.fits && (
            <DefaultFilterMenu
              categoryOptions={facets.fits}
              selected={current.fits}
              onOptionChange={onCategoryOptionChange}
            />
          )
        );
      case 'functions':
        return (
          facets.functions && (
            <DefaultFilterMenu
              categoryOptions={facets.functions}
              selected={current.functions}
              onOptionChange={onCategoryOptionChange}
            />
          )
        );
      case 'colorWithNames':
        return (
          facets.colorWithNames && (
            <ul>
              <ColorsMenu
                colors={facets.colorWithNames}
                selected={current.colorWithNames}
                onOptionChange={onCategoryOptionChange}
              />
            </ul>
          )
        );
      default:
        return <ul>{mappedFilters}</ul>;
    }
  };

  const getTotalsDescription = useCallback(() => {
    if (totalCountUnfiltered === totalCount || totalCountUnfiltered === 0) {
      // not provided from back
      return <>{`${totalCount} ${totalCount === 1 ? 'item' : 'items'}`}</>;
    }
    return (
      <>
        <strong>{`${totalCount}`}</strong>
        {` out of ${totalCountUnfiltered === 1 ? 'item' : 'items'}`}
      </>
    );
  }, [totalCount, totalCountUnfiltered]);

  return (
    <aside className={css.sidemenu}>
      <header>
        {currentMenuTitle !== rootTitle ? (
          <div className="iconized left">
            <Icon
              name="chevron-right"
              side="left"
              size="full"
              rotate={3}
              className={css.filter__btn__icon}
              containerClassName={css.icon}
              onClick={() => onMenuToggle('')}
            />
            <span>
              <h4 style={{ paddingLeft: '0.5em' }}>{currentMenuTitle}</h4>
            </span>
          </div>
        ) : (
          <h4>{currentMenuTitle}</h4>
        )}
      </header>
      {getMenu()}
      <p>{getTotalsDescription()}</p>
      <div className="info__signup">
        <div className="info__signup__container">
          <Button variant="ok__alt">Clear</Button>
        </div>
        <div className="info__signup__container">
          <Button variant="ok">Apply</Button>
        </div>
      </div>
    </aside>
  );
};
