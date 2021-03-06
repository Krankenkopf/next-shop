/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { FC, useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks';
import { getKeys } from '../../../../../common/utils/state';
import { categoryToLiLinkA } from '../../../../../common/utils/ui';
import { Icon } from '../../../elements/icons/Icon';
import { TModal } from '../../modal/Modals';
import { SliderMenu } from '../../sliderMenu/SliderMenu';
import { SliderMenuContainer } from '../../sliderMenu/SliderMenuContainer';

import { useRouter } from 'next/router';

type TMainMenuProps = {
  closeModal: (modalType: TModal) => void;
};

export const MainMenu: FC<TMainMenuProps> = ({ closeModal }) => {
  const dispatch = useAppDispatch();
  const { asPath } = useRouter();
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const modal = useAppSelector(state => state.app.modal);
  const categories = useAppSelector(state => state.categories);
  const mainMenuCategoriesTitles = ['Women', 'Divided', 'Men', 'Baby', 'Kids', 'H&M Home', 'Sale'];

  const [currentMenu, setCurrentMenu] = useState('');
  const setParentMenu = useCallback(
    (parent: string) => {
      setCurrentMenu(parent);
    },
    [currentMenu],
  );

  useEffect(() => {
    if (modal === 'mainMenu') {
      setTimeout(() => {
        setCurrentMenu('');
      }, 100);
      closeModal('mainMenu');
    }
  }, [asPath]);
  useEffect(() => {
    if (modal !== 'mainMenu' && currentMenu) {
      setTimeout(() => {
        setCurrentMenu('');
      }, 100);
    }
  }, [modal]);

  const mappedSliderMenus = getKeys(categories).map((categoryKey, i) => {
    // eslint-disable-next-line no-undef
    let mappedSubmenus: Array<JSX.Element | null> | undefined;
    if (categories[categoryKey] && categories[categoryKey]?.CategoriesArray) {
      mappedSubmenus = categories[categoryKey]?.CategoriesArray?.map(category => {
        const root = `/${categoryKey}/${category.CategoryValue}`;
        return category.CategoriesArray ? (
          <li key={category.CategoryValue}>
            <SliderMenu
              title={
                <div className="iconized right">
                  <Icon name="chevron-right" side="right" />
                  <span>
                    <strong>{category.CatName}</strong>
                  </span>
                </div>
              }
              submenuTitle={
                <div className="iconized left">
                  <Icon name="chevron-right" side="left" rotate={4} />
                  <span>
                    <strong>{category.CatName}</strong>
                  </span>
                </div>
              }
              submenu={categoryToLiLinkA(
                category.CategoriesArray,
                root,
                'mainmenu__sliders__link',
                true,
              )}
              parent={categoryKey}
              currentParent={currentMenu}
            />
          </li>
        ) : null; /* if cat has no array, its title will not displayed */
      });
    }

    return (
      <li key={categoryKey}>
        <SliderMenu
          title={
            <div className="iconized right">
              <Icon name="chevron-right" side="right" />
              <span>
                <strong>{mainMenuCategoriesTitles[i]}</strong>
              </span>
            </div>
          }
          submenuTitle={
            <div className="iconized left">
              <Icon name="chevron-right" side="left" rotate={3} />
              <span>
                <strong>{mainMenuCategoriesTitles[i]}</strong>
              </span>
            </div>
          }
          submenu={mappedSubmenus}
          parent={categoryKey}
          currentParent={currentMenu}
          setCurrentMenu={setParentMenu}
        />
      </li>
    );
  });
  return (
    <div className="mainmenu">
      <div className="link-account">
        <div className="iconized">
          {isLoggedIn ? <Icon name="user-check" size="full" /> : <Icon name="user" size="full" />}
          <span>Account</span>
        </div>
      </div>
      <SliderMenuContainer>
        <ul className="mainmenu__sliders">{mappedSliderMenus}</ul>
      </SliderMenuContainer>
    </div>
  );
};
