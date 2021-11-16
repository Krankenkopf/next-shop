import { FC } from "react"

type TProductDetail = {
    code:       string
    name:       string
    price:      string
    imgSrc:     string
}

export const ProductDetail: FC<TProductDetail> = (props) => {
    const {code, name, price, imgSrc} = props
    return (
        <>
            <div>{name}</div>
            <div>
                <img src={imgSrc} alt={name} />
            </div>
            <div>{ price}</div>
        </>
    )
}