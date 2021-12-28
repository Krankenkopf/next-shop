import React, { FC, useEffect, MouseEvent } from "react"
import { TProduct } from "../../../../../a0-common/c1-types/t1-instance/TProduct"
import { TDevice, TProductsLayout } from "../../../../../a2-bll/layout-reducer"
import { ProductItem } from "../ProductItem/ProductItem"

type TProductsListProps = {
    products: Array<TProduct>
    favorites: Array<string> // product codes
    cart: Array<string> // product codes
    device: TDevice
    layout: TProductsLayout
    firstImg: "Model" | "Product"
}

export const ProductsList: FC<TProductsListProps> = ({
    products, favorites, cart, device, layout, firstImg
}) => {
    const mappedProducts = products.map((product: TProduct, i) => {
        const isInCart = cart.some((code) => code === product.articles[0].code)
        const isInFavorites = favorites.some((code) => code === product.code)
        const images = firstImg === "Model"
            ? [product.articles[0].normalPicture[0].url, product.images[0].url] // images[0] - model, images[1] - product
            : [product.images[0].url, product.articles[0].normalPicture[0].url] // images[0] - product, images[1] - model
        return <ProductItem key={product.code}
            product={product}
            code={product.articles[0].code}
            name={product.name}
            price={product.price.formattedValue}
            imgSrc={images[0]}
            imgSrcAlt={images[1]}
            articleCodes={product.articleCodes}
            rgbColors={product.rgbColors}
            articleColorNames={product.articleColorNames}
            markers={product.markers}
            sellingAttributes={product.sellingAttributes}
            isInCart={isInCart}
            isInFavorites={isInFavorites}
            device={device}
            layout={layout} />
    })
    return (
        <ul className="products-list">
            {mappedProducts}
        </ul>
    )
}