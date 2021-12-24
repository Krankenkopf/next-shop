import React, { useCallback, useState } from "react"
import { TProduct } from "../../../../a0-common/c1-types/t1-instance/TProduct"
import { useAppDispatch, useAppSelector } from "../../../../a0-common/c3-hooks"
import { TAuthState } from "../../../../a2-bll/auth-reducer"
import { selectCartItems } from "../../../../a2-bll/selectors"
import css from "./CartOverview.module.scss"
import db from "../../../../../db.json"
import { DropMenuOnClick } from "../DropMenu/DropMenuOnClick"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"
import Button from "../../cp1-elements/el02-Button/Button"
import { OrderTotals } from "./OrderTotals"
import { HMClarnaIcon } from "../../cp1-elements/el10-Icons/HMClarnaIcon"
import { CCDiscoverIcon } from "../../cp1-elements/el10-Icons/Additional/CCDiscoverIcon"
import { BrandIcon } from "../../cp1-elements/el10-Icons/BrandIcon"
import { CCMastercardIcon } from "../../cp1-elements/el10-Icons/Additional/CCMastercardIcon"
import { CCVisaElectronIcon } from "../../cp1-elements/el10-Icons/Additional/CCVisaElectronIcon"
import { CCVisaIcon } from "../../cp1-elements/el10-Icons/Additional/CCVisaIcon"
import { CCPayPalIcon } from "../../cp1-elements/el10-Icons/Additional/CCPayPalIcon"

type TCartOverviewProps = {
    
}

export const CartOverview = () => {
    const dispatch = useAppDispatch()
    const { userData } = useAppSelector<TAuthState>(state => state.auth)
    //const items = useAppSelector<Array<TProduct>>(selectCartItems)
    const cartId = userData ? userData.id : ""
    // mock
    const [currencySign, setCurrencySign] = useState("£");
    const items = [db.results[0], db.results[4], db.results[7], db.results[12], db.results[15]]
    // /mock
    const [isQuantityMenuVisible, setIsQuantityMenuVisible] = useState(false);
    
    const getQuantityMenu = useCallback(() => ({
        toggle: <div className="span__decorated right" >
            <Icon name="chevron-right"
                size="full"
                side="right"
                rotate={isQuantityMenuVisible ? 4 : 2}
                className={css.icon}
                containerClassName={isQuantityMenuVisible
                    ? `icon__chevron-btn _close`
                    : "icon__chevron-btn"} />
            <span>{1}</span>
        </div>,
        menu: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(option => {
            return (
                <li key={option} className={`${css.menuoption}`}>
                    {option}     
                </li>
            )
        }),
    }), [])
    const orderValue = items.length
        && items.map(product => product.price.value).reduce((acc, next) => acc + next)
    const deliveryCost = "FREE"
    const mappedItems = items.map(product => {
        const totalPrice = product.price.value
        return <li key={product.code} className={css.item}>
            <figure className={css.item__imgContainer}>
                <img src={product.images[0].url} alt="item" />
            </figure>
            <div className={css.item__desc}>
                <h4>{product.name}</h4>
                <p>{product.price.formattedValue}</p>
                <table>
                    <div>Art.no.:</div>
                    <p>{product.articles[0].code}</p>  
                    <div>Color:</div>
                    <p>{product.articles[0].color.text}</p>
                    <div>Size:</div>
                    <p>XL</p>
                    <div style={{ padding: "5px 0", marginBottom: "5px"}}>Quantity:</div>
                    <DropMenuOnClick toggle={getQuantityMenu().toggle}
                        menu={getQuantityMenu().menu}
                        className={css.quantityToggle}
                        menuClassName={css.quantityMenu} />
                    <div>Total:</div>
                    <p>{`${currencySign}${totalPrice}`}</p>
                </table>
                <div className={css.delete}>
                    <Icon name="trash-can" className="icon-trash-can"/>
                </div>
            </div>
        </li>
    })
    return (
        <>
            <header className={css.header}>
                <h3>Shopping Cart</h3>
                <p>{ cartId }</p>
            </header>
            <div className={css.cart}>
                <section className={css.cartlist}>
                    <ul>
                        {mappedItems}
                    </ul>
                </section>
                <section className={css.sidebar__container}>
                    <aside className={css.sidebar}>
                        <div className={css.discount}>
                            <p>Discounts</p>
                            <button>Apply discount</button>
                        </div>
                        <div className={css.login}>
                            <p>Log in to use your member offers!</p>
                            <div className={css.button}>
                                <Button variant="ok">LOG IN</Button>
                            </div>   
                        </div>
                        <hr style={{ width: "100%", margin: "0 0 10px" }} />
                        <OrderTotals
                            orderValue={orderValue}
                            deliveryCost={deliveryCost}
                            currencySign={currencySign} />
                        <div className={css.button}>
                            <Button variant="ok__alt">CONTINUE TO CHECKOUT</Button>
                        </div>
                        <p className={css.marketingMessage}>
                            or&nbsp;
                            <strong>
                                4 easy payments of {currencySign}{(orderValue * 0.25).toFixed(2)}
                            </strong>
                            &nbsp;for members with&nbsp;
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
                                        <BrandIcon name="cc-amex" title="Amex" color="#016cca"/>
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
                            30-day returns. Read more about our
                            <button>
                               return and refund policy 
                            </button>   
                        </p>
                        <div className={css.deliveryInfo__container}>
                            <div className={css.deliveryInfo}>
                                <Icon name="truck" side="left"/>
                                <span>Shipping & return options</span>
                                <Icon name="chevron-right" side="right" className="icon__chevron-btn"/>
                            </div>
                        </div>
                    </aside>

                </section>
            </div>
            
        </>
    )}