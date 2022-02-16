import React, { FC, ReactElement, useEffect, useState } from 'react';

import { deleteCartItem, addCartItem } from '../../../../../bll/reducers';
import { IconColor } from '../../../../../common/constants';
import { useAppDispatch } from '../../../../../common/hooks';
import {
  Ail,
  CurrencySymbol,
  TProductDetailArticle,
} from '../../../../../common/types/instance/TProductDetail';
import { Button, Icon, Toggle } from '../../../elements';

type TProductDetailMobileProps = {
  currentArticle: TProductDetailArticle;
  articleCodes: Array<string>;
  articleTitles: Array<ReactElement>;
  isInCart: boolean;

  onArticleVariantsToggle: (code: string) => void;
};

export const ProductDetailMobile: FC<TProductDetailMobileProps> = ({
  currentArticle,
  articleCodes,
  articleTitles,
  onArticleVariantsToggle,
}) => {
  const isInCart = true;
  const dispatch = useAppDispatch();

  const [imgs, setImgs] = useState<Array<Ail>>([]);

  useEffect(() => {
    const arr: Array<Ail> = [];
    currentArticle &&
      currentArticle.galleryDetails.map(item => {
        if (!arr.some(el => el.url === item.url)) {
          // not to add duplicates
          arr.push({
            url: `${item.url}&call=url[file:/product/main]`,
            assetType: item.assetType,
          });
        }
      });
    arr.length && setImgs(arr);
  }, [currentArticle]);

  const onCartButtonClick = () => {
    isInCart
      ? dispatch(deleteCartItem(currentArticle.code))
      : dispatch(addCartItem(currentArticle, 'detail'));
  };
  return (
    <article className="product-detail-mobile__wrapper">
      {imgs.length && (
        <figure className="product-detail-mobile__mainImg">
          <img src={imgs[0].url} alt={`${currentArticle.name} ${imgs[0].assetType}`} />
        </figure>
      )}
      <section className="product-detail-mobile__variants">
        <h5>{currentArticle.colourDescription}</h5>
        <Toggle
          value={currentArticle.code}
          options={articleCodes}
          titles={articleTitles}
          onChangeOption={onArticleVariantsToggle}
          className="product-detail-mobile__variants-toggle"
          frameClassName="toggle__frame__variants"
        />
      </section>
      <section className="product-detail-mobile__desc">
        <p>{currentArticle.description}</p>
        {currentArticle.modelHeight && (
          <p className="text">
            <strong>Size&nbsp;&#8212;&nbsp;</strong>
            The model is {currentArticle.modelHeight}
          </p>
        )}
        <p className="text">
          <strong>Composition&nbsp;&#8212;&nbsp;</strong>
          {currentArticle.compositions[0].materials.map((material, i) =>
            i === 0 ? (
              <span key={material.name}>
                {material.name} {Math.round(+material.percentage)}%
              </span>
            ) : (
              <span key={material.name}>
                , {material.name} {Math.round(+material.percentage)}%
              </span>
            ),
          )}
        </p>
        <p className="text">
          <strong>Art. no.&nbsp;&#8212;&nbsp;</strong>
          {currentArticle.code}
        </p>
      </section>
      {imgs.length > 1 && (
        <section className="product-detail-mobile__otherImgs">
          {imgs.map((img, i) => {
            if (i !== 0)
              return (
                <figure key={img.url}>
                  <img src={img.url} alt={`${currentArticle.name} ${img.assetType}`} />
                </figure>
              );
          })}
        </section>
      )}
      <section className="product-detail-mobile__details">
        <ul>
          <li>
            <Button>Details</Button>
          </li>
          <li>
            <Button>Delivery and Payment</Button>
          </li>
          <li>
            <Button>Product background</Button>
          </li>
        </ul>
        <p className="text center">Members get free online returns.</p>
      </section>
      <div className="product-detail-mobile__footer-overlay" />
      <footer className="product-detail-mobile__footer">
        <div className="product-detail-mobile__footer-inner">
          <div className="product-detail-mobile__footer__title iconized right wide">
            <h4>{currentArticle.name}</h4>
            <Icon name="heart" size="full" side="right" />
          </div>
          <div className="product-detail-mobile__footer__price-plus-cart">
            <div className="product-detail-mobile__footer__price">
              {currentArticle.redPrice ? (
                <>
                  <strong style={{ color: '#e03' }}>
                    {currentArticle.redPrice.price +
                      CurrencySymbol[currentArticle.redPrice.currency]}
                  </strong>{' '}
                  <s>
                    {currentArticle.whitePrice.price +
                      CurrencySymbol[currentArticle.whitePrice.currency]}
                  </s>
                </>
              ) : (
                <strong>
                  {currentArticle.whitePrice.price +
                    CurrencySymbol[currentArticle.whitePrice.currency]}
                </strong>
              )}
            </div>
            {isInCart && (
              <p className="product-detail-mobile__footer__cart-info text center">
                In your cart
              </p>
            )}
            <div className="cart-button">
              <Button
                variant={isInCart ? 'cancel' : 'ok'}
                orientation="right"
                onClick={onCartButtonClick}
              >
                <div className="iconized right wide multiline">
                  <Icon name="cart-shopping" size="full" side="right" />
                  <div className="button-text">
                    {isInCart ? 'Remove from cart' : 'Add to cart'}
                  </div>
                </div>
              </Button>
            </div>
            <div className="cart-icon-button">
              <div className="iconized right wide">
                {isInCart ? (
                  <>
                    <Icon name="cart-shopping" />
                    <Icon
                      name="xmark"
                      primaryColor={IconColor.ERROR}
                      secondaryColor={IconColor.ERROR}
                    />
                    <Icon
                      name="circle"
                      size="max"
                      primaryColor={IconColor.ERROR}
                      secondaryColor={IconColor.ERROR}
                    />
                  </>
                ) : (
                  <Icon
                    name="cart-plus"
                    size="full"
                    primaryColor={IconColor.OK}
                    secondaryColor={IconColor.INITIAL}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="shadow-fade bottom" />
    </article>
  );
};
