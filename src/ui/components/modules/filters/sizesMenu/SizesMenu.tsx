/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { FC, useCallback, useState } from 'react';

import { SIZETITLES } from '../../../../../common/constants';
import { TFacet } from '../../../../../common/types/response/TProductsResponse';
import { getKeys } from '../../../../../common/utils/state';
import { sortNonZeroFirst } from '../../../../../common/utils/ui';
import { Icon, Checkbox } from '../../../elements';
import { DropMenuOnClick } from '../../dropMenu/DropMenuOnClick';
import gcss from '../Filters.module.scss';

import css from './SizesMenu.module.scss';

type TFacetValue = {
  code: string;
  count: number;
  selected: boolean;

  title: string;
};

type TSizesMenuProps = {
  sizes: TFacet;
  selected: Array<string>;
  onOptionChange: (state: boolean, value: string) => void;
};

export const SizesMenu: FC<TSizesMenuProps> = ({ selected, sizes, onOptionChange }) => {
  const [isAnyOpen, setIsAnyOpen] = useState(false);
  const initialVisibility = {
    womenswear: false,
    menswear: false,
    waist: false,
    footwear: false,
  };
  const [isCategoryVisible, setIsCategoryVisible] = useState(initialVisibility);
  const onCategoryToggle = (state: boolean, type: string | undefined) => {
    setIsAnyOpen(state);
    type && setIsCategoryVisible(prev => ({ ...initialVisibility, [type]: state }));
  };

  const sortedSizes = sortNonZeroFirst(sizes.values, 'count');

  const getCategorizedSizes = useCallback(() => {
    const initial = {
      womenswear: [] as Array<TFacetValue>,
      menswear: [] as Array<TFacetValue>,
      waist: [] as Array<TFacetValue>,
      footwear: [] as Array<TFacetValue>,
    };
    sortedSizes.forEach(value => {
      const parsedCode = value.code.split('_'); // "366_s_1_womenswear" => [366, s, 1, womenswear]
      const key = parsedCode[3];
      if (['womenswear', 'menswear', 'waist', 'footwear'].some(type => type === key)) {
        // FIXME: remove fixed categories
        initial[key as keyof typeof initial].push({
          ...value,
          title: parsedCode[1] + parsedCode[2],
        });
      }
    });
    return initial;
  }, [sizes]);

  const getMappedCategories = useCallback(() => {
    const categorizedSizes = getCategorizedSizes();
    return getKeys(categorizedSizes).map((category, i) => {
      const menu = {
        toggle: (
          <div className="iconized right">
            <Icon
              name="chevron-right"
              size="max"
              side="right"
              rotate={isCategoryVisible[category] ? 4 : 2}
              className={gcss.filter__btn__icon}
              containerClassName={
                isCategoryVisible[category]
                  ? `${gcss.filter__btn} ${gcss._close}`
                  : gcss.filter__btn
              }
            />
            <span>{SIZETITLES[i].title}</span>
          </div>
        ),
        menu: () => {
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const sizes = categorizedSizes[category];
          const mappedSizes = sizes.map(size => {
            const isActive = size.count !== 0;
            //
            return (
              <li
                key={size.code}
                className={
                  isActive ? `${gcss.menuoption} ${gcss.active}` : `${gcss.menuoption}`
                }
              >
                <Checkbox
                  name={size.title}
                  disabled={!isActive}
                  checked={selected.some(item => item === size.code)}
                  value={size.code}
                  onChangeChecked={onOptionChange}
                  className={gcss.checkbox}
                  titleClassName={gcss.checkbox__inner}
                >
                  <div className={gcss.checkbox__text}>{size.title.toUpperCase()}</div>

                  <div className={gcss.checkbox__item}>
                    <div className={gcss.checkbox__count}>
                      <strong>{size.count}</strong>
                    </div>
                  </div>
                </Checkbox>
              </li>
            );
          });
          return <ul>{mappedSizes}</ul>;
        },
      };
      return (
        <li key={category}>
          <DropMenuOnClick
            toggle={menu.toggle}
            menu={menu.menu()}
            type={category}
            className={css.dropdown__container}
            menuClassName={css.dropdown__menu}
            isNeedToClosePrevious={isAnyOpen}
            onToggle={onCategoryToggle}
          />
        </li>
      );
    });
  }, [sizes, selected, isCategoryVisible]);

  return <ul className={css.sizesMenu}>{getMappedCategories()}</ul>;
};
