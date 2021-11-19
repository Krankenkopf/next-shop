import { AxiosResponse } from "axios"
import { GetServerSideProps } from "next"
import Router from "next/router"
import { useEffect, useState } from "react"
import { TProduct, TProductsResponse } from "../../src/a0-common/c1-types/t3-response/TProductsResponse"
import { ProductItem } from "../../src/a1-ui/u1-components/cp2-modules/ProductItem/ProductItem"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { CountryCodes, LanguageCodes, ProductsAPI, TGetProductsListRequestRequiredData } from "../../src/a3-dal/hm/products-api"

type TMenSSProps = TProductsResponse

export default function Men(props: TMenSSProps) {
    const [products, setProducts] = useState<Array<TProduct> | null>(props.products)
    useEffect(() => {
         async function onLoad() {
             //const res = await fetch("http://localhost:4200/results")
             const requiredParams: TGetProductsListRequestRequiredData = {
                 country: CountryCodes.Poland,
                 lang: LanguageCodes.Polski,
                 currentpage: 0,
                 pagesize: 50,
             }
             const response = await fetch("http://localhost:4200/results")
             //const response = await ProductsAPI.getList(requiredParams, {})
             //const products = response.data.results
             const products = await response.json()
             setProducts(products)
        }
        if (!props.products) {
            console.log("client"); 
            onLoad()
        } 
    }, [])

    if (!props.products) {
        // TODO: preloader
    }
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

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    if (!req || (req.url && req.url.startsWith('/_next/data'))) {
        return {props: {products: null}}
    }
    try {
        const requiredParams: TGetProductsListRequestRequiredData = {
            country: CountryCodes.Poland,
            lang: LanguageCodes.Polski,
            currentpage: 0,
            pagesize: 50,
        }
        const response = await fetch("http://localhost:4200/results")
        //const response = await ProductsAPI.getList(requiredParams, {})
        //const products = response.data.results
        const products = await response.json()
        return { props: {products} }
    } catch (e) {
        console.log(e);
        return { props: { products: null }}
    }
}

/* Men.getInitialProps = async () => {
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
    
} */