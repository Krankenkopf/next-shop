import React, { FC, useCallback, useState } from 'react';

import { TCategoriesState } from '../../../../bll/reducers';
import { setModal } from '../../../../bll/reducers/app';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { capitalizeFirst } from '../../../../common/utils/ui';
import { BrandIcon, BurgerMenu, Icon } from '../../elements';

import { SessionMenu } from './menu/SessionMenu';
import { Search } from './Search';

import Link from 'next/link';

type THeaderProps = {
  categories: TCategoriesState;
};

export const Header: FC<THeaderProps> = () => {
  const dispatch = useAppDispatch();
  const deviceType = useAppSelector(state => state.layout.device);
  const modal = useAppSelector(state => state.app.modal);
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const [menuServices, setMenuServices] = useState(() => {
    const menuServicesTitles = ['Customer Service', 'Ahrlist Discount', 'Find a store'];
    return menuServicesTitles.map(item => (
      <li key={item}>
        <Link href="/">
          <a>
            <span>{item}</span>
          </a>
        </Link>
      </li>
    ));
  });
  const [categoriesLinks, setCategoriesLinks] = useState(() => {
    const headerLinkNames = ['ladies', 'divided', 'men', 'baby', 'kids', 'home', 'sale'];
    return headerLinkNames.map((name, i, arr) => {
      if (name === 'ladies') {
        return (
          <h4
            key={name}
            style={{
              width: `calc(100%/${arr.length})`,
              height: '30px',
              textAlign: 'center',
            }}>
            <Link href="/ladies">
              <a>Women</a>
            </Link>
          </h4>
        );
      }
      if (name === 'home') {
        return (
          <h4
            key={name}
            style={{
              width: `calc(100%/${arr.length})`,
              height: '30px',
              textAlign: 'center',
            }}>
            <Link href="/home">
              <a>H&M Home</a>
            </Link>
          </h4>
        );
      }
      return (
        <h4
          key={name}
          style={{
            width: `calc(100%/${arr.length})`,
            height: '30px',
            textAlign: 'center',
          }}>
          <Link href={`/${name}`}>
            <a>{capitalizeFirst(name)}</a>
          </Link>
        </h4>
      );
    });
  });
  const onMenuClick = useCallback(() => {
    dispatch(setModal('mainMenu'));
  }, [dispatch]);

  return (
    <>
      {(deviceType === 'mobile' || deviceType === 'tablet') && <div className="header-overlay" />}
      <header id="header">
        {(deviceType === 'laptop' || deviceType === 'desktop') && (
          <nav>
            <ul className="header-menu-services">{menuServices}</ul>
            <div className="header-logo">
              <Link href="/">
                <a>
                  <BrandIcon name="handm" size="max" color="#E50010" />
                </a>
              </Link>
            </div>
            <SessionMenu />
            <div className="header-menu-primary">{categoriesLinks}</div>
            <Search />
          </nav>
        )}
        {(deviceType === 'mobile' || deviceType === 'tablet') && (
          <nav className="nav-mobile">
            <div className="header-menu-mobile">
              <BurgerMenu menuStatus={modal === 'mainMenu'} toggleMenu={onMenuClick} />
            </div>
            <div className="header-logo-mobile">
              <Link href="/">
                <a>
                  <BrandIcon name="handm" size="max" color="#E50010" />
                </a>
              </Link>
            </div>
            <div className="header-menu-session-mobile">
              <Link href="/account">
                <a>
                  <div className="iconized right">
                    {isLoggedIn ? (
                      <Icon name="user-check" className="icon__session" />
                    ) : (
                      <Icon name="user" className="icon__session" />
                    )}
                    <span />
                  </div>
                </a>
              </Link>
              <a>
                <div className="iconized right">
                  <Icon name="magnifying-glass" className="icon__session" />
                  <span />
                </div>
              </a>

              <Link href="/favorites">
                <a>
                  <div className="iconized">
                    <Icon name="heart-solid" className="icon__session" />
                    <span />
                  </div>
                </a>
              </Link>
              <Link href="/cart">
                <a>
                  <div className="iconized">
                    {isLoggedIn ? (
                      <Icon name="cart-shopping" className="icon__session" />
                    ) : (
                      <Icon name="cart-shopping-fast" className="icon__session" />
                    )}
                    <span />
                  </div>
                </a>
              </Link>
            </div>
          </nav>
        )}
      </header>
      {(deviceType === 'mobile' || deviceType === 'tablet') && (
        <>
          <div className="shadow-fade-test top">
            <svg width="100vw" height="100%" style={{ display: 'none' }}>
              <linearGradient id="fade-gradient" x1="0" y1="0%" x2="0" y2="100%">
                <stop offset="0%" stopColor="#ffffeb" className="stop-1" />
                <stop offset="90%" stopColor="#ffffeb" className="stop-1" />
                <stop offset="100%" stopColor="#ffffeb11" className="stop-3" />
              </linearGradient>
              <rect width="100vw" height="100%" fill="url(#fade-gradient)" />
            </svg>
          </div>
          {/* <div className="shadow-fade top" /> */}
        </>
      )}
    </>
  );
};
