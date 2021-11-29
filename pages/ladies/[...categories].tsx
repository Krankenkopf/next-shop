import Router, { NextRouter, useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Nullable, TCategory, TPageMeta, TRootCategoryValue } from "../../src/a0-common/c1-types/t1-instance"
import { CountryCodes, LanguageCodes } from "../../src/a0-common/c1-types/t1-instance/regions"
import { TProduct } from "../../src/a0-common/c1-types/t1-instance/TProduct"
import { TGetProductsListRequestRequiredData, TGetProductsListRequestOptionalData } from "../../src/a0-common/c1-types/t2-request"
import { useAppDispatch, useAppSelector } from "../../src/a0-common/c3-hooks"
import { getRequestedCategory } from "../../src/a0-common/c4-utils"
import { Preloader } from "../../src/a1-ui/u1-components/cp1-elements/el11-Preloader/Preloader"
import { ProductItem } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductItem/ProductItem"
import { ProductsList } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductsList/ProductsList"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { TRequestStatus } from "../../src/a2-bll/app-reducer"
import { setCategory, TNavigationState } from "../../src/a2-bll/navigation-reducer"
import { clearProducts, getProducts, setProducts } from "../../src/a2-bll/products-reducer"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"
import { AppThunkDispatch, wrapper } from "../../src/a2-bll/store"
import { ProductsAPI } from "../../src/a3-dal/hm/products-api"

type TLadiesCategorySSProps = {
    categorySS?: TCategory
    productsSS: Nullable<Array<TProduct>>
}
type TLadiesCategoryProps = {
    history: Array<string>
}

export default function LadiesCategory({categorySS, productsSS, history}: TLadiesCategorySSProps & TLadiesCategoryProps) {
    const dispatch = useAppDispatch()
    const { pathname, query, asPath } = useRouter()
    const status = useAppSelector<TRequestStatus>(state => state.app.status)
    const rootCategory = useAppSelector<TCategory>(state => selectPageCategory(state, "ladies"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "ladies"))
    const {currentPage, category, pageSize, numberOfPages, totalNumberOfResults} = useAppSelector<TNavigationState>(state => state.navigation)
    const products = useAppSelector<Nullable<Array<TProduct>>>(state => state.products.products)
    //const [products, setProducts] = useState<Array<TProduct> | null>(productsSS)
    
    useEffect(() => {
        const onLoad = async () => {
            const queryCategories = query.categories as Array<string>
            dispatch(getProducts(pathname, queryCategories))
        }
        if (!productsSS) {
            console.log("client");
            onLoad()
        }
        return () => {dispatch(clearProducts)}
    }, [asPath])

    // console.log(products);
    
    return (
        <ProductLayout title={pageMeta.title}
            category={rootCategory}
            rootCategoryName={pageMeta.path}>
            <div className="page-content">
                <div>
                    <h3>{pageMeta.title}</h3>
                </div>
                <div className="products-list__container">
                    <ul className="products-list">
                        {products && <ProductsList products={ products }/>}
                    </ul>
                    <Preloader isVisible={status === "loading"}/>
                </div>
            </div>
        </ProductLayout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps<TLadiesCategorySSProps>(store => async ({ req, query, resolvedUrl }) => {
    if (!req || (req.url && req.url.startsWith('/_next/data'))) {
        console.log("ss request dumped");
        
        return { props: { productsSS: null } }
    }
    try {
        const state = store.getState()
        const queryCategories = query.categories as Array<string>
        const targetedCategory = getRequestedCategory(resolvedUrl, queryCategories, state.categories)
        const region = state.regions
        const navigation = state.navigation

        const requiredParams: TGetProductsListRequestRequiredData = {
            country: region.country,
            lang: region.lang,
            currentpage: navigation.currentPage,
            pagesize: navigation.pageSize,
        }
        const optionalParams: TGetProductsListRequestOptionalData = {
            categories: targetedCategory?.tagCodes
        }
        const response = await fetch("http://localhost:4200/results")
        const productsSS = await response.json() as Nullable<Array<TProduct>>
        //const response = await ProductsAPI.getList(requiredParams, optionalParams)
        console.log("ss request")
        //const productsSS = response.data.results
        productsSS && store.dispatch(setProducts(productsSS))
        targetedCategory && store.dispatch(setCategory(targetedCategory))
        
        return { props: { productsSS, categorySS: targetedCategory } }
    } catch (e) {
        console.log(e);
        return { props: { productsSS: null } }
    }
})
