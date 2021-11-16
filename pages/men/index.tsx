import { AxiosResponse } from "axios"
import Router from "next/router"
import { useEffect, useState } from "react"
import { TProduct, TProductsResponse } from "../../src/a0-common/c1-types/t3-response/TProductsResponse"
import { ProductItem } from "../../src/a1-ui/u1-components/cp2-modules/ProductItem/ProductItem"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { CountryCodes, LanguageCodes, ProductsAPI, TGetProductsListRequestRequiredData } from "../../src/a3-dal/hm/products-api"


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
        <ProductLayout title={"Men"}>
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
        </ProductLayout>
    )
}

Men.getInitialProps = async () => {
    try {
        const requiredParams: TGetProductsListRequestRequiredData = {
            country: CountryCodes.Poland,
            lang: LanguageCodes.Polski,
            currentpage: 0,
            pagesize: 50,
        }
        //const response = await fetch("http://localhost:4200/results")
        const response = await ProductsAPI.getList(requiredParams, {})
        const products = response.data.results
        return {products}
    } catch (e) {
        console.log(e);
        return {}
    }
    
}