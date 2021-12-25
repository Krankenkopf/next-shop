import React, { FC } from "react"
import css from "./CartOverview.module.scss"

type TOrderTotalsProps = {
    orderValue: number
    deliveryCost: number | "FREE"
    currencySign: string
}

export const OrderTotals: FC<TOrderTotalsProps> = ({ orderValue, deliveryCost, currencySign }) => {
    return <div className={css.total}>
        {orderValue ? <>
            <div>
                <span>Order value</span>
                <span>{`${currencySign}${orderValue}`}</span>
            </div>
            <div>
                <span>Delivery</span>
                <span>{deliveryCost}</span>
            </div>
        </>
            : <div style={{ height: "10px" }}></div>}
        <footer className={css.total__footer}>
            <span><strong>Total</strong></span>
            <span>
                <strong>
                    {orderValue
                        ? `${currencySign}${typeof deliveryCost === "number" ? orderValue + deliveryCost : orderValue}`
                        : `${currencySign}0.00`}
                </strong>
            </span>
        </footer>
    </div>
}
