import Link from "next/link"
import { useRouter } from "next/router"
import React, { FC, MouseEvent, useState } from "react"
import { Marker, SellingAttribute, TProduct } from "../../../../../a0-common/c1-types/t1-instance/TProduct"
import { useAppDispatch } from "../../../../../a0-common/c3-hooks"
import { addItem, removeItem } from "../../../../../a2-bll/cart-reducer"
import Button from "../../../cp1-elements/el02-Button/Button"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import css from "./ProductItem.module.scss"

type TProductItems = {
    code: string
    product: TProduct
    name: string
    price: string
    imgSrc: string
    imgSrcAlt: string
    rgbColors: string[]
    articleCodes: string[]
    articleColorNames: string[]
    markers?: Array<Marker>
    sellingAttributes?: Array<SellingAttribute>

    defaultImgType?: "model" | "product"
    isInCart: boolean
    isInFavorites: boolean
}

export const ProductItem: FC<TProductItems> = (props) => {
    const dispatch = useAppDispatch()
    const { code, product, name, price, imgSrc,
        imgSrcAlt, rgbColors, articleCodes,
        articleColorNames, markers, sellingAttributes,
        defaultImgType = "model",
        isInCart, isInFavorites
        // callbacks
        // ...
    } = props
    const router = useRouter()
    const revealItem = () => {
        //router.push('/productpage/[id]', `/productpage/${code}`)
    }
    const onCartButtonClick = () => {
        isInCart
            ? dispatch(removeItem(product.code))
            : dispatch(addItem(product))
    }
    const colorVariants = rgbColors && rgbColors.map((color: string, i: number) => {
        return (
            <li key={articleCodes[i]} className={css.colorVariant}>
                <Link href={`/productpage/${articleCodes[i]}`}>
                    <a className="swatch"
                        title={articleColorNames[i]}>
                        <div style={{ backgroundColor: color }}></div>
                    </a>
                </Link>
            </li>
        )
    })
    const attributes = sellingAttributes?.map((a, i) => (<li key={a}>{a}</li>))

    //mock
    const [isFavorite, setIsFavorite] = useState(Math.random() > 0.7 ? true : false);
    const [redprice, setRedprice] = useState(Math.random() > 0.5 ? `${(Math.random() * 100).toFixed(0)}$` : null);

    return (
        <li className={css.card__cell}>
            <div className={css.card}>
                <article className={css.card__item}
                    onClick={revealItem}>
                    <figure className={css.imgContainer}>
                        <div className={css.imgBlankcover} />
                        {imgSrc === imgSrcAlt
                            ? <img src={imgSrc}
                                alt={name}
                                title={name} />
                            : <>
                                <img src={imgSrc}
                                    data-type="model"
                                    className={defaultImgType === "model" ? css.img : css.imgAlt}
                                    alt={name}
                                    title={name} />
                                <img src={imgSrcAlt}
                                    data-type="product"
                                    className={defaultImgType === "model" ? css.imgAlt : css.img}
                                    alt={name}
                                    title={name} />
                            </>}
                        <div className={css.imgControls}></div>
                    </figure>
                    <div className={css.productDesc}>
                        {markers && markers.map(marker => (
                            <div key={marker.text}
                                className={css.marketingMarker}>
                                {marker.text}
                            </div>
                        ))}
                        <h4>
                            <Link href={`/productpage/${code}`}>
                                <a >{name}</a>
                            </Link>
                        </h4>
                        <div className={css.priceContainer}>
                            {redprice &&
                                <span className={css.redprice}>
                                    <strong>{redprice}</strong>
                                </span>}
                            <span className={css.whiteprice}>
                                {redprice
                                    ? <s><strong>{price}</strong></s>
                                    : <strong>{price}</strong>}
                            </span>
                        </div>

                        <ul className="list-swatches" data-swatches-total="1">
                            {colorVariants}
                        </ul>
                        <div className="new-product">{attributes}</div>
                    </div>
                </article>
                <div className={css.card__overlay}>
                    <div className={css.card__controls}>
                        <div className={css.card__button}>
                            {isInCart
                                ? <Link href="/cart"><a>
                                    <Button variant="ok__alt">
                                    {"Go to cart"}
                                </Button>
                                    </a></Link>
                                : <Button variant={"ok"}
                                    onClick={onCartButtonClick}>
                                    {"Add to cart"}
                                </Button>}
                        </div>
                        <div className={css.card__button__favorites}>
                            {isFavorite
                                && <Icon name="heart-solid"
                                    id={code}
                                    className={css.favoritesActive}
                                    containerClassName={css.favoritesActive__container}
                                    side="right"
                                    size="full"
                                    onClick={() => setIsFavorite(!isFavorite)} />}
                            <Icon name="heart"
                                id={code}
                                className={isFavorite
                                    ? css.favoritesClicked
                                    : css.favorites}
                                containerClassName={isFavorite
                                    ? css.favoritesClicked__container
                                    : css.favorites__container}
                                side="right"
                                onClick={() => setIsFavorite(!isFavorite)} />
                        </div>
                        {isInCart && <div className={css.card__button}>
                            <Button variant={"cancel"}
                                onClick={onCartButtonClick}>
                                {"Remove from cart"}
                            </Button>
                        </div>}
                    </div>
                </div>
            </div>
        </li>
    )
}
