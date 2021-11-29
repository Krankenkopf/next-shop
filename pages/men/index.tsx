import { GetServerSideProps } from "next"
import Router from "next/router"
import { useEffect, useState } from "react"
import { Nullable, TCategory, TPageMeta } from "../../src/a0-common/c1-types/t1-instance"
import { CountryCodes, LanguageCodes } from "../../src/a0-common/c1-types/t1-instance/regions"
import { TProduct } from "../../src/a0-common/c1-types/t1-instance/TProduct"
import { TGetProductsListRequestRequiredData } from "../../src/a0-common/c1-types/t2-request"

import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { ProductItem } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductItem/ProductItem"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"

type TMenSSProps = {
    products: Nullable<Array<TProduct>>
}
type TMenProps = {
    history: Array<string>
}

export default function Men(props: TMenSSProps & TMenProps) {
    const category = useAppSelector<TCategory>(state => selectPageCategory(state, "men"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "men"))
    
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
        <ProductLayout title={pageMeta.title}
                category={category}
                rootCategoryName={pageMeta.path}>
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
        const products = await response.json() as Nullable<Array<TProduct>>
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