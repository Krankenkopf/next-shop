import React, { FC } from 'react';

import { TFacet } from '../../../../../common/types/response/TProductsResponse';
import { getKeys } from '../../../../../common/utils/state';
import {
  capitalizeFirst,
  getBrightness,
  sortNonZeroFirst,
} from '../../../../../common/utils/ui';
import { Checkbox } from '../../../elements/checkbox/Checkbox';
import gcss from '../Filters.module.scss';

import css from './ColorsMenu.module.scss';

type TColorsMenuProps = {
  colors: TFacet;
  selected: Array<string>;
  onOptionChange: (state: boolean, value: string) => void;
};

const BRIGHTNESS_OFFSET = 40;

export const ColorsMenu: FC<TColorsMenuProps> = ({
  selected,
  colors,
  onOptionChange,
}) => {
  const sortedColors = sortNonZeroFirst(colors.values, 'count');
  const mappedColors = sortedColors.map(color => {
    // extract data from string like "black_000000"
    const colorParsedData = { colorName: '', hexColor: '' };
    getKeys(colorParsedData).forEach((key, i) => {
      colorParsedData[key] = color.code.split('_')[i];
    });
    const colorData = {
      ...colorParsedData,
      textColor:
        getBrightness(colorParsedData.hexColor) > BRIGHTNESS_OFFSET ? '#000' : '#fff',
    };
    const isActive = color.count !== 0;

    //
    return (
      <li
        key={color.code}
        className={isActive ? `${gcss.menuoption} ${gcss.active}` : `${gcss.menuoption}`}
      >
        <Checkbox
          name={colorData.colorName}
          disabled={!isActive}
          checked={selected.some(item => item === color.code)}
          value={color.code}
          onChangeChecked={onOptionChange}
          className={gcss.checkbox}
          titleClassName={gcss.checkbox__inner}
        >
          <div className={gcss.checkbox__text}>
            {capitalizeFirst(colorData.colorName)}
          </div>

          <div className={gcss.checkbox__item}>
            {/* one of them */}
            {colorData.colorName !== 'transparent' && colorData.colorName !== 'multi' && (
              <>
                <div
                  className={gcss.checkbox__item__color}
                  style={{ backgroundColor: `#${colorData.hexColor}` }}
                />
                <div
                  className={gcss.checkbox__count}
                  style={{ color: isActive ? colorData.textColor : '#666' }}
                >
                  <strong>{color.count}</strong>
                </div>
              </>
            )}

            {colorData.colorName === 'multi' && (
              <>
                <div className={`${gcss.checkbox__item__color} ${css.multi}`}>
                  <ul className={css.umbrella}>
                    <li className={css.color} />
                    <li className={css.color} />
                    <li className={css.color} />
                    <li className={css.color} />
                    <li className={css.color} />
                    <li className={css.color} />
                    <li className={css.color} />
                    <li className={css.color} />
                  </ul>
                </div>
                <div className={gcss.checkbox__count}>
                  <strong>{color.count}</strong>
                </div>
              </>
            )}

            {colorData.colorName === 'transparent' && (
              <>
                <div className={`${gcss.checkbox__item__color} ${css.transparent}`} />
                <div className={gcss.checkbox__count}>
                  <strong>{color.count}</strong>
                </div>
              </>
            )}
          </div>
        </Checkbox>
      </li>
    );
  });
  return (
    <>
      {mappedColors}
      {mappedColors.length % 2 && mappedColors.length > 2 && (
        <li>
          <div
            className={
              sortedColors[sortedColors.length - 1].count
                ? `${gcss.checkbox} ${gcss.active}`
                : `${gcss.checkbox}`
            }
          >
            {/*  {sortedColors[sortedColors.length - 1].count && <div className={css.overlay}></div>} */}
            <div className={gcss.overlay} />
          </div>
        </li>
      )}
    </>
  );
};
