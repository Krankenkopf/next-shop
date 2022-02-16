/* eslint-disable @typescript-eslint/no-magic-numbers */
import React, { FC, useState } from 'react';

import { TCheckedProduct } from '../../../../../common/types/instance/TCheckedProduct';
import { Icon, Button } from '../../../elements';
import { OrderTotals } from '../../cart/OrderTotals';

import css from './MiniCart.module.scss';

import Link from 'next/link';

type TMiniCartProps = {
  items: Array<TCheckedProduct>;
};

export const MiniCart: FC<TMiniCartProps> = ({ items }) => {
  const mappedItems =
    items.length &&
    items.map(product => (
      <li key={product.code} className={css.minicart__item}>
        <figure className={css.minicart__item__imgContainer}>
          <img src={product.imgSrc} alt="item" />
        </figure>
        <div className={css.minicart__item__desc}>
          <h4>{product.name}</h4>
          <p>{product.price}</p>
          <table>
            <tbody>
              <tr>
                <td>Quantity:</td>
                <td>1</td>
              </tr>
              <tr>
                <td>Color:</td>
                <td>{product.color}</td>
              </tr>
              <tr>
                <td>Size:</td>
                <td>XL</td>
              </tr>
            </tbody>
          </table>
        </div>
      </li>
    ));
  const [currencySign, setCurrencySign] = useState('£');

  const [stage, setStage] = useState(0);
  const setStageHandler = (
    e: React.MouseEvent<HTMLElement | SVGSVGElement>,
    direction: number,
  ) => {
    setStage(prev => prev + direction);
  };
  const orderValue =
    items.length &&
    Math.round(
      items.map(product => product.price).reduce((acc, next) => acc + next) * 100,
    ) / 100;
  const deliveryCost = 0;
  return (
    <div className={css.minicart}>
      {items.length ? (
        <>
          <div className={css.minicart__carousel}>
            {items.length > 3 && (
              <div className={css.carousel__controls}>
                <Icon
                  name="chevron-right"
                  className={`${stage === 0 ? 'inactive' : ''}`}
                  active={stage !== 0}
                  rotate={4}
                  onClick={e => setStageHandler(e, -1)}
                />
              </div>
            )}
            <div className={css.carousel__view}>
              <div
                style={{ transform: `translateY(${-7.2 * +stage}em)` }}
                className={css.minicart__items}
              >
                <ul>{mappedItems}</ul>
              </div>
            </div>
            {items.length > 3 && (
              <div className={css.carousel__controls}>
                <Icon
                  name="chevron-right"
                  className={`${stage === items.length - 3 ? 'inactive' : ''}`}
                  active={stage !== items.length - 3}
                  rotate={2}
                  onClick={e => setStageHandler(e, 1)}
                />
              </div>
            )}
          </div>
          <hr style={{ width: '100%', margin: '0 0 10px' }} />
          <OrderTotals
            orderValue={orderValue}
            deliveryCost={deliveryCost}
            currencySign={currencySign}
          />
          <div className={css.minicart__actions}>
            <div className="button-container">
              <Link href="/checkout">
                <a>
                  <Button variant="ok">Checkout</Button>
                </a>
              </Link>
            </div>
            <div className="button-container">
              <Link href="/cart">
                <a>
                  <Button variant="ok__alt">Your Cart</Button>
                </a>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className={css.minicart__info__empty}>
          <strong>Your cart is empty</strong>
        </div>
      )}
    </div>
  );
};
