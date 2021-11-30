import React, { FC, useEffect, MouseEvent } from "react"
import { TProduct } from "../../../../../a0-common/c1-types/t1-instance/TProduct"
import { ProductItem } from "../ProductItem/ProductItem"

type TProductsListProps = {
    products: Array<TProduct>
}

export const ProductsList: FC<TProductsListProps> = ({ products }) => {
    const addToFavorites = (e: MouseEvent<SVGSVGElement>) => {
        console.log(e.currentTarget);
    }
    const mappedProducts = products.map((product: TProduct, i) => {
        return <ProductItem key={product.code}
            code={product.articles[0].code}
            name={product.name}
            price={product.price.formattedValue}
            imgSrc={product.articles[0].normalPicture[0].url}
            imgSrcAlt={product.images[0].url}
            articleCodes={product.articleCodes}
            rgbColors={product.rgbColors}
            articleColorNames={product.articleColorNames}
            markers={product.markers}
            sellingAttributes={product.sellingAttributes}
            addToFavorites={addToFavorites} />
    })
    return (
        <ul className="products-list">
            {mappedProducts}
        </ul>
    )
}