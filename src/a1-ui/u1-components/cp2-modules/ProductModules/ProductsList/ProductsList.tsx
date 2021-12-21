import React, { FC, useEffect, MouseEvent } from "react"
import { TProduct } from "../../../../../a0-common/c1-types/t1-instance/TProduct"
import { addItem } from "../../../../../a2-bll/cart-reducer"
import { ProductItem } from "../ProductItem/ProductItem"

type TProductsListProps = {
    products: Array<TProduct>
    favorites: Array<string> // product codes
    cart: Array<string> // product codes
}

export const ProductsList: FC<TProductsListProps> = ({ products, favorites, cart }) => {

    const mappedProducts = products.map((product: TProduct, i) => {
        const isInCart = cart.some((code) => code === product.code)
        const isInFavorites = favorites.some((code) => code === product.code)
        return <ProductItem key={product.code}
            product={product}
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
            isInCart={isInCart}
            isInFavorites={isInFavorites} />
    })
    return (
        <ul className="products-list">
            {mappedProducts}
        </ul>
    )
}