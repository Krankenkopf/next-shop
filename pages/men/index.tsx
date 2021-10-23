import Router from "next/router"
import { useEffect, useState } from "react"
import { TProduct, TProductsResponse } from "../../p-app/a0-common/c1-types/TProductsResponse"
import { ProductItem } from "../../p-app/a1-ui/u1-components/cp2-modules/ProductItem/ProductItem"
import { MainLayout } from "../../p-app/a1-ui/u1-components/cp4-layouts/MainLayout"


export default function Men({ products }: TProductsResponse) {
    // const [products, setProducts] = useState<TProductsResponse>([] as unknown as TProductsResponse)
    // useEffect(() => {
    //     async function onLoad() {
    //         const res = await fetch("http://localhost:4200/results")
    //         const json = await res.json()
    //         console.log(json);
            
    //         setProducts(json)
    //     }
    //     onLoad()
    // }, [])
    // console.log(products);
    
    const mappedProducts = products && products.map((item: TProduct, i) => {
        return <ProductItem key={item.code}
            code={item.articles[0].code}
            name={item.name}
            price={item.price.formattedValue}
            imgSrc={item.images[0].url}
            rgbColors={item.rgbColors}
            articleColorNames={item.articleColorNames}
            sellingAttributes={item.sellingAttributes} />
    })
    
    return (
        <MainLayout title={"Men"}>
            <div className="page-content">
                <div>
                    <h1>All</h1>
                </div>
                <div className="section">
                    <ul>
                        {mappedProducts}
                    </ul>
                </div>
            </div>   
        </MainLayout>
    )
}

Men.getInitialProps = async () => {
    const response = await fetch("http://localhost:4200/results")
    const products = await response.json()
    return {products}
}