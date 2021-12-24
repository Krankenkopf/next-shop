import React, { FC } from "react"
import css from "./CartOverview.module.scss"

type TOrderTotalsProps = {
    orderValue: number
    deliveryCost: number | "FREE"
    currencySign: string
}

export const OrderTotals: FC<TOrderTotalsProps> = ({orderValue, deliveryCost, currencySign}) => {
    return <table className={css.total}>
        <div>
            <span>Order value</span>
            <span>{`${currencySign}${orderValue}`}</span>
        </div>
        <div>
            <span>Delivery</span>
            <span>{deliveryCost}</span>
        </div>
        <footer>
            <span><strong>Total</strong></span>
            <span>
                <strong>
                    {`${currencySign}${typeof deliveryCost === "number" ? orderValue + deliveryCost : orderValue}`}
                </strong>
            </span>
        </footer>
    </table>
}