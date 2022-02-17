/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { useCallback, useState, MouseEvent } from 'react';

import { TAuthState, setModal, deleteCartItem } from '../../../../bll/reducers';
import { selectCartItems } from '../../../../bll/selectors';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks';
import { TCheckedProduct } from '../../../../common/types/instance/TCheckedProduct';
import {
  Icon,
  Button,
  HMClarnaIcon,
  BrandIcon,
  CCDiscoverIcon,
  CCMastercardIcon,
  CCVisaElectronIcon,
  CCVisaIcon,
  CCPayPalIcon,
  UnderConstructionSign,
} from '../../elements';
import { DropMenuOnClick } from '../dropMenu/DropMenuOnClick';

import css from './CartOverview.module.scss';
import { OrderTotals } from './OrderTotals';

export const CartOverview = () => {
  const dispatch = useAppDispatch();
  const { userData, isLoggedIn } = useAppSelector<TAuthState>(state => state.auth);
  const items = useAppSelector<Array<TCheckedProduct>>(selectCartItems);
  const cartId = userData ? userData.id : '';
  // mock
  const [currencySign, setCurrencySign] = useState('£');
  // /mock
  const [isQuantityMenuVisible, setIsQuantityMenuVisible] = useState(false);

  const onLoginClick = useCallback(() => {
    dispatch(setModal('login'));
  }, [dispatch]);
  const getQuantityMenu = useCallback(
    () => ({
      toggle: (
        <div className="iconized right">
          <Icon
            name="chevron-right"
            size="max"
            side="right"
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            rotate={isQuantityMenuVisible ? 4 : 2}
            className={css.icon}
            containerClassName={
              isQuantityMenuVisible ? `icon__chevron-btn _close` : 'icon__chevron-btn'
            }
          />
          <span>{1}</span>
        </div>
      ),
      menu: (
        <ul>
          {/* eslint-disable-next-line @typescript-eslint/no-magic-numbers */}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => (
            <li key={option} className={`${css.menuoption}`}>
              {option}
            </li>
          ))}
        </ul>
      ),
    }),
    [],
  );
  const orderValue =
    items.length &&
    Math.round(
      items
        .map(product => product.price) // [12.99, 3.99]
        .reduce((acc, next) => acc + next) * // [16.9799999] *facepalm*
        100,
    ) / 100; // 1697.99999 => 16.98
  const deliveryCost = 'FREE';

  const onDeleteClick = useCallback(
    (e: MouseEvent<HTMLElement | SVGSVGElement>) => {
      dispatch(deleteCartItem(e.currentTarget.id));
    },
    [dispatch],
  );
  const mappedItems = items.map(product => {
    const totalPrice = product.price;
    return (
      <li key={product.code} className={css.item}>
        <figure className={css.item__imgContainer}>
          <img src={product.imgSrc} alt="item" />
        </figure>
        <div className={css.item__desc}>
          <h4>{product.name}</h4>
          <p>{product.price}</p>
          <div className={css.table}>
            <div>Art.no.:</div>
            <p>{product.code}</p>
            <div>Color:</div>
            <p>{product.color}</p>
            <div>Size:</div>
            <p>XL</p>
            <div style={{ padding: '5px 0', marginBottom: '5px' }}>Quantity:</div>
            <DropMenuOnClick
              toggle={getQuantityMenu().toggle}
              menu={getQuantityMenu().menu}
              className={css.quantityToggle}
              menuClassName={css.quantityMenu}
            />
            <div>Total:</div>
            <p>{`${currencySign}${totalPrice}`}</p>
          </div>
          <div className={css.delete}>
            <Icon
              name="trash-can"
              id={product.code}
              className="icon-trash-can"
              onClick={onDeleteClick}
            />
          </div>
        </div>
      </li>
    );
  });
  return (
    <>
      <header className={css.header}>
        <h3>Shopping Cart</h3>
        <p>{cartId}</p>
      </header>
      <div className={css.cart}>
        <section className={css.cartlist}>
          {items.length > 0 ? (
            <ul>{mappedItems}</ul>
          ) : (
            <div className={css.emptyCartPlaceholder}>
              <h4>YOUR SHOPPING CART IS EMPTY!</h4>
              {!isLoggedIn && (
                <>
                  <p>Sign in to save or access already saved items in your shopping cart.</p>
                  <button type="button" onClick={onLoginClick}>
                    Sign in
                  </button>
                </>
              )}
            </div>
          )}
        </section>
        <section className={css.sidebar__container}>
          <aside className={css.sidebar}>
            <div className={css.discount}>
              <p>Discounts</p>
              <button type="button">Apply discount</button>
            </div>
            {!isLoggedIn && (
              <div className={css.login}>
                <p>Log in to use your member offers!</p>
                <div className={css.button}>
                  <Button variant="ok" onClick={onLoginClick}>
                    LOG IN
                  </Button>
                </div>
              </div>
            )}
            <hr style={{ width: '100%', margin: '0 0 10px' }} />
            <OrderTotals
              orderValue={orderValue}
              deliveryCost={deliveryCost}
              currencySign={currencySign}
            />
            <div className={css.button}>
              <Button variant="ok__alt" disabled={!orderValue}>
                CONTINUE TO CHECKOUT
              </Button>
            </div>
            <p className={css.marketingMessage}>
              {orderValue ? (
                <>
                  or&nbsp;
                  <strong>
                    4 easy payments of {currencySign}
                    {(orderValue * 0.25).toFixed(2)}
                  </strong>
                  &nbsp;for members with&nbsp;
                </>
              ) : (
                <>
                  Shop now,&nbsp;
                  <strong>pay in 30 days.&nbsp;</strong>
                  For members with&nbsp;
                </>
              )}
              <HMClarnaIcon />
            </p>
            <div className={css.paymentModes}>
              <p>We accept</p>
              <ul>
                <li>
                  <HMClarnaIcon />
                </li>
                <li>
                  <div className={css.paymentModes__icon}>
                    <BrandIcon name="cc-amex" title="Amex" color="#016cca" />
                  </div>
                </li>
                <li>
                  <CCDiscoverIcon />
                </li>
                <li>
                  <CCMastercardIcon />
                </li>
                <li>
                  <CCVisaElectronIcon />
                </li>
                <li>
                  <CCVisaIcon />
                </li>
                <li>
                  <CCPayPalIcon />
                </li>
              </ul>
            </div>
            <p className={css.generalText}>
              The estimated tax will be confirmed once you added your shipping address in checkout.
            </p>
            <p className={css.generalText}>
              30-day returns. Read more about our&nbsp;
              <button type="button">return and refund policy</button>
            </p>
            <div className={css.deliveryInfo__container}>
              <div className={css.deliveryInfo}>
                <div className="iconized wide">
                  <Icon name="truck" side="left" />
                  <span>Shipping & return options</span>
                </div>
                <div className="iconized narrow">
                  <Icon name="chevron-right" side="right" className="icon__chevron-btn" />
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
      <div>
        <header>You may also like</header>
        <UnderConstructionSign />
      </div>
      <div>
        <header>Recently viewed</header>
        <UnderConstructionSign />
      </div>
    </>
  );
};
