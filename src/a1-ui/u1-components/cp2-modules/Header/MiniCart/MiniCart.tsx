import React, { useState } from "react"
import Button from "../../../cp1-elements/el02-Button/Button"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import css from "./MiniCart.module.scss"
import item from "../../../../../../public/images/carousel/1008.png"
import Link from "next/link"

type TMiniCartProps = {

}

export const MiniCart = () => {
    const items = [10, 20, 30, 90]
    const mappedItems = items.map((el) => {
        return (
            <li key={el} className={css.minicart__item}>
                <figure className={css.minicart__item__imgContainer}>
                    <img src={item.src} alt="item" />
                </figure>
                <div className={css.minicart__item__desc}>
                    <h4>Item</h4>
                    <p>Price</p>
                    <table>
                        <div>Quantity:</div>
                        <div>1</div>
                        <div>Color:</div>
                        <div>Black</div>
                        <div>Size:</div>
                        <div>XL</div>
                    </table>
                </div>
            </li>
        )
    })
    const [stage, setStage] = useState(0);
    const setStageHandler = (e: React.MouseEvent<SVGSVGElement>, direction: number) => {
        setStage((prev) => prev + direction)
    }
    const orderValue = items.reduce((acc, i) => acc + i)
    const deliveryCost = 0
    return (
        <div className={css.minicart}>
            <div className={css.minicart__carousel}>
                {items.length > 3 && <div className={css.carousel__controls}>
                    <Icon name="chevron-right"
                        className={`${stage === 0 ? "inactive" : ""}`}
                        active={stage === 0 ? false : true}
                        containerClassName="_up"
                        onClick={(e) => setStageHandler(e, -1)} />
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
                        containerClassName="_down"
                        onClick={(e) => setStageHandler(e, 1)} />
                </div>}
            </div>
            <hr style={{ width: "100%", margin: "0 0 10px" }} />
            <table className={css.minicart__total}>
                <div>
                    <span>Order value</span>
                    <span>{orderValue}</span>
                </div>
                <div>
                    <span>Delivery</span>
                    <span>{deliveryCost}</span>
                </div>
                <footer>
                    <span><strong>Total</strong></span>
                    <span><strong>{orderValue + deliveryCost}</strong></span>
                </footer>
            </table>
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
        </div>
    )
}