import Router, { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Nullable, TCategory, TPageMeta, TRootCategoryValue } from "../../src/a0-common/c1-types/t1-instance"
import { CountryCodes, LanguageCodes } from "../../src/a0-common/c1-types/t1-instance/regions"
import { TProduct } from "../../src/a0-common/c1-types/t1-instance/TProduct"
import { TGetProductsListRequestRequiredData, TGetProductsListRequestOptionalData } from "../../src/a0-common/c1-types/t2-request"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { ProductItem } from "../../src/a1-ui/u1-components/cp2-modules/ProductItem/ProductItem"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"
import { wrapper } from "../../src/a2-bll/store"
import { ProductsAPI } from "../../src/a3-dal/hm/products-api"

type TLadiesCategorySSProps = {
    products: Nullable<Array<TProduct>>
}
type TLadiesCategoryProps = {
    history: Array<string>
}

export default function LadiesCategory(props: TLadiesCategorySSProps & TLadiesCategoryProps) {
    const category = useAppSelector<TCategory>(state => selectPageCategory(state, "ladies"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "ladies"))

    const [products, setProducts] = useState<Array<TProduct> | null>(props.products)

    const router = useRouter()
    useEffect(() => {
        async function onLoad() {
            const queryCategories = router.query.categories as Array<string>
            let targetedCategory: TCategory | undefined
            if (queryCategories) {
                let currentBranch = category as TCategory
                for (const queryCategory of queryCategories) {
                    targetedCategory = currentBranch?.CategoriesArray?.find(category => {
                        if (category.CategoryValue === queryCategory) {
                            if (category.CategoriesArray) {
                                currentBranch = category // nested category will be processed in next cycle
                            }
                            return category
                        }
                    })
                }
            }
            //const res = await fetch("http://localhost:4200/results")
            const requiredParams: TGetProductsListRequestRequiredData = {
                country: CountryCodes.United_States,
                lang: LanguageCodes.English,
                currentpage: 0,
                pagesize: 50,
            }
            const optionalParams: TGetProductsListRequestOptionalData = {
                categories: targetedCategory?.tagCodes
            }
            //const response = await fetch("http://localhost:4200/results")
            const response = await ProductsAPI.getList(requiredParams, optionalParams)
            const products = response.data.results
            //const products = await response.json()
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
                    <h3>{pageMeta.title}</h3>
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

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ req, query, resolvedUrl }) => {
    if (!req || (req.url && req.url.startsWith('/_next/data'))) {
        return { props: { products: null } }
    }
    try {
        // parsing url and find according category in state to form request params
        const rootCategory = resolvedUrl.split("/")[1] as TRootCategoryValue //exm. "ladies"
        const queryCategories = query.categories as Array<string> //exm. ["new", "view-all"]
        const categoriesBranch = store.getState().categories[rootCategory] //exm. ladies: {TCategory}
        let targetedCategory: TCategory | undefined
        if (queryCategories) {
            let currentBranch = categoriesBranch as TCategory
            for (const queryCategory of queryCategories) {
                targetedCategory = currentBranch?.CategoriesArray?.find(category => {
                    if (category.CategoryValue === queryCategory) {
                        if (category.CategoriesArray) {                   
                            currentBranch = category // nested category will be processed in next cycle
                        }
                        return category
                    }
                })
            }
        }
  
        const requiredParams: TGetProductsListRequestRequiredData = {
            country: CountryCodes.United_States,
            lang: LanguageCodes.English,
            currentpage: 0,
            pagesize: 50,
        }
        const optionalParams: TGetProductsListRequestOptionalData = {
            categories: targetedCategory?.tagCodes
        }

        //const response = await fetch("http://localhost:4200/results")
        const response = await ProductsAPI.getList(requiredParams, optionalParams)
        console.log("ss request");

        const products = response.data.results
        //console.log(products)
        //const products = await response.json() as Nullable<Array<TProduct>>
        return { props: { products } }
    } catch (e) {
        console.log(e);
        return { props: { products: null } }
    }
})