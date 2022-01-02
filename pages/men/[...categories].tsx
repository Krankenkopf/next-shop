import Link from "next/link"
import Router, { NextRouter, useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Nullable, TCategory, TPageMeta } from "../../src/a0-common/c1-types/t1-instance"
import { TProduct } from "../../src/a0-common/c1-types/t1-instance/TProduct"
import { TGetProductsListRequestRequiredData, TGetProductsListRequestOptionalData } from "../../src/a0-common/c1-types/t2-request"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { getRequestedCategory } from "../../src/a0-common/c4-utils/state"
import { Timer } from "../../src/a1-ui/u1-components/cp1-elements/el20-Timer/Timer"
import { Banner } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Banner"
import { ProductsContent } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductsContent/ProductsContent"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { setCategory } from "../../src/a2-bll/navigation-reducer"
import { setProducts } from "../../src/a2-bll/products-reducer"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"
import { wrapper } from "../../src/a2-bll/store"
import { ProductsAPI } from "../../src/a3-dal/hm/products-api"

type TMenCategorySSProps = {
    categorySS?: TCategory
    productsSS: Nullable<Array<TProduct>>
}
type TMenCategoryProps = {
    history: Array<string>
}

export default function MenCategory({ categorySS, productsSS, history }: TMenCategorySSProps & TMenCategoryProps) {

    const categories = useAppSelector(state => state.categories)
    const rootCategory = useAppSelector<TCategory>(state => selectPageCategory(state, "men"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "men"))

    return (
        <MainLayout title={pageMeta.title} categories={categories} history={history}>
            <ProductLayout
                category={rootCategory}
                rootCategoryName={pageMeta.path}>
                <div className="page-content">
                    <Banner title="30% off sitewide for Cyber Monday!">
                        <div>
                            DON'T WAIT!
                        </div>
                        <div>
                            <Timer endDate="Jan 18, 2022 00:00:00" />
                        </div>
                    </Banner>
                    <ProductsContent productsSS={productsSS} />
                </div>
            </ProductLayout>
        </MainLayout>

    )
}

export const getServerSideProps = wrapper.getServerSideProps<TMenCategorySSProps>(store => async ({ req, query, resolvedUrl }) => {
    console.log("ss request")
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
        const productsSS = await response.json() as Array<TProduct>
        //const response = await ProductsAPI.getList(requiredParams, optionalParams)
        //const productsSS = response.data.results
        store.dispatch(setProducts(productsSS))
        targetedCategory && store.dispatch(setCategory(targetedCategory))

        return { props: { productsSS, categorySS: targetedCategory } }
    } catch (e) {
        console.log(e);
        return { props: { productsSS: null } }
    }
})
