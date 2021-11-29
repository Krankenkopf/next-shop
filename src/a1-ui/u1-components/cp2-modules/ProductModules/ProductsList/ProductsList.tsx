import React, { FC } from "react"
import { TProduct } from "../../../../../a0-common/c1-types/t1-instance/TProduct"
import { ProductItem } from "../ProductItem/ProductItem"

type TProductsListProps = {
    products: Array<TProduct>
}

export const ProductsList: FC<TProductsListProps> = ({ products }) => {
    const mappedProducts = products.map((item: TProduct, i) => {
        return <ProductItem key={item.code}
            code={item.articles[0].code}
            name={item.name}
            price={item.price.formattedValue}
            imgSrc={item.images[0].url}
            rgbColors={item.rgbColors}
            articleColorNames={item.articleColorNames}
            sellingAttributes={item.sellingAttributes} />
    })
    return <>{ mappedProducts}</>
}