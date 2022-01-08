import Link from "next/link"
import Router, { NextRouter, useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { Nullable, TCategory, TPageMeta, TRootCategoryValue } from "../../src/a0-common/c1-types/t1-instance"
import { TProduct } from "../../src/a0-common/c1-types/t1-instance/TProduct"
import { TGetProductsListRequestRequiredData, TGetProductsListRequestOptionalData } from "../../src/a0-common/c1-types/t2-request"
import { TAnyFacet, TPagination } from "../../src/a0-common/c1-types/t3-response/TProductsResponse"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { extractRelevantFacets, getKeys, getRequestedCategory } from "../../src/a0-common/c4-utils/state"
import { Timer } from "../../src/a1-ui/u1-components/cp1-elements/el20-Timer/Timer"
import { Banner } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Banner"
import { ProductsContent } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductsContent/ProductsContent"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { setFacets } from "../../src/a2-bll/filters-reducer"
import { setCategory, setCurrentPage, setPageSize, setTotalNumbers } from "../../src/a2-bll/navigation-reducer"
import { setProducts } from "../../src/a2-bll/products-reducer"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"
import { setSortBy } from "../../src/a2-bll/sort-reducer"
import { wrapper } from "../../src/a2-bll/store"
import { ProductsAPI } from "../../src/a3-dal/hm/products-api"

type TCategorySSProps = {
    categorySS?: TCategory
    productsSS: Nullable<Array<TProduct>>
}
type TCategoryProps = {
    history: Array<string>
}

export default function Category({ categorySS, productsSS, history }: TCategorySSProps & TCategoryProps) {
    const router = useRouter()
    const appError = useAppSelector(state => state.app.error)
    const currentCategory = router.asPath.split("/")[1] as TRootCategoryValue
    const categories = useAppSelector(state => state.categories)

    const rootCategory = useAppSelector<TCategory>(state => selectPageCategory(state, currentCategory))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, currentCategory))

    useEffect(() => {
        if (appError === "not found") {
            router.push("/404", router.asPath)
        }
    }, [appError])

    useEffect(() => {
        if (!getKeys(categories).some(category => category === currentCategory)) {
            router.push("/404", router.asPath)
        }
    }, [currentCategory])

    return (
        <MainLayout title={pageMeta.title} categories={categories} history={history}>
            <ProductLayout
                category={rootCategory}
                rootCategoryName={pageMeta.path}>
                <div className="page-content">
                    <Banner title="30% off sitewide for Cyber Monday!" link="/ladies/f">
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

export const getServerSideProps = wrapper
    .getServerSideProps<TCategorySSProps>(store => async ({ req, query, resolvedUrl }) => {
        if (!req || (req.url && req.url.startsWith('/_next/data'))) {
            return { props: { productsSS: null } }
        }
        try {
            const state = store.getState()
            const queryCategories = query.categories as Array<string>          
            const targetedCategory = getRequestedCategory(resolvedUrl, queryCategories, state.categories)
            if (!targetedCategory) {
                return { notFound: true }
            }
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
            //const response = await fetch("http://localhost:4200/results")
            //const productsSS = await response.json() as Array<TProduct>
            const paginationSS = await fetch("http://localhost:4200/pagination")
            const { currentPage, pageSize,
                numberOfPages, totalNumberOfResults,
                totalNumberOfResultsUnfiltered, sort } = await paginationSS.json() as TPagination
            const facetsSS = await fetch("http://localhost:4200/facets")
            const anyFacetsSS = await facetsSS.json() as Array<TAnyFacet>
            const relevantFacetsSS = extractRelevantFacets(anyFacetsSS, state.filters.facets)
            const response = await ProductsAPI.getList(requiredParams, optionalParams)
            const productsSS = response.data.results
            //products
            store.dispatch(setProducts(productsSS))
            //navigation
            targetedCategory && store.dispatch(setCategory(targetedCategory))
            store.dispatch(setCurrentPage(currentPage))
            store.dispatch(setPageSize(pageSize))
            store.dispatch(setTotalNumbers(numberOfPages, totalNumberOfResults, totalNumberOfResultsUnfiltered))
            //sort&filters
            store.dispatch(setSortBy(sort))
            store.dispatch(setFacets(relevantFacetsSS))

            return { props: { productsSS, categorySS: targetedCategory } }
        } catch (e) {
            console.log(e);
            return { props: { productsSS: null } }
        }
    })
