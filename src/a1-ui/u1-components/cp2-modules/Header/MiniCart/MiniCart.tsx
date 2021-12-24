import React, { FC, useState } from "react"
import Button from "../../../cp1-elements/el02-Button/Button"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import css from "./MiniCart.module.scss"
import item from "../../../../../../public/images/carousel/1008.png"
import Link from "next/link"
import { TProduct } from "../../../../../a0-common/c1-types/t1-instance/TProduct"
import { OrderTotals } from "../../Cart/OrderTotals"

type TMiniCartProps = {
    items: Array<TProduct>
}

export const MiniCart: FC<TMiniCartProps> = ({ items }) => {
    const mappedItems = items.length && items.map((product) => {
        return (
            <li key={product.code} className={css.minicart__item}>
                <figure className={css.minicart__item__imgContainer}>
                    <img src={product.images[0].url} alt="item" />
                </figure>
                <div className={css.minicart__item__desc}>
                    <h4>{product.name}</h4>
                    <p>{product.price.formattedValue}</p>
                    <table>
                        <div>Quantity:</div>
                        <div>1</div>
                        <div>Color:</div>
                        <div>{product.articles[0].color.text}</div>
                        <div>Size:</div>
                        <div>XL</div>
                    </table>
                </div>
            </li>
        )
    })
    const [currencySign, setCurrencySign] = useState("£");
    
    const [stage, setStage] = useState(0);
    const setStageHandler = (e: React.MouseEvent<HTMLElement | SVGSVGElement>, direction: number) => {
        setStage((prev) => prev + direction)
    }
    const orderValue = items.length
        && items.map(product => product.price.value).reduce((acc, next) => acc + next)
    const deliveryCost = 0
    return (
        <div className={css.minicart}>
            {items.length
                ? <>
                    <div className={css.minicart__carousel}>
                        {items.length > 3 && <div className={css.carousel__controls}>
                            <Icon name="chevron-right"
                                className={`${stage === 0 ? "inactive" : ""}`}
                                active={stage === 0 ? false : true}
                                rotate={4}
                                onClick={(e) => setStageHandler(e, -1)}
                            />
                        </div>}
                        <div className={css.carousel__view}>
                            <div style={{ transform: `translateY(${-100 * (+stage)}px)` }}
                                className={css.minicart__items} >
                                <ul>
                                    {mappedItems}
                                </ul>
                            </div>
                        </div>
                        {items.length > 3 && <div className={css.carousel__controls}>
                            <Icon name="chevron-right"
                                className={`${stage === items.length - 3 ? "inactive" : ""}`}
                                active={stage === items.length - 3 ? false : true}
                                rotate={2}
                                onClick={(e) => setStageHandler(e, 1)}
                            />
                        </div>}
                    </div>
                    <hr style={{ width: "100%", margin: "0 0 10px" }} />
                    <OrderTotals orderValue={orderValue}
                        deliveryCost={deliveryCost}
                        currencySign={currencySign} />
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
                : <div className={css.minicart__info__empty}>
                    <strong>Your cart is empty</strong>
                </div>}
        </div>
    )
}
