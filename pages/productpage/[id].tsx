import { useRouter } from "next/dist/client/router"
import { useEffect, useMemo, useState } from "react";
import { Nullable } from "../../src/a0-common/c1-types/t1-instance";
import { TProductDetail } from "../../src/a0-common/c1-types/t1-instance/TProductDetail";
import { TGetProductDetailRequestRequiredData } from "../../src/a0-common/c1-types/t2-request";
import { TProductDetailResponse } from "../../src/a0-common/c1-types/t3-response/TProductDetailResponse";
import { useAppDispatch, useAppSelector } from "../../src/a0-common/c3-hooks";
import { Preloader } from "../../src/a1-ui/u1-components/cp1-elements/el11-Preloader/Preloader";
import { Banner } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Banner";
import { ProductDetail } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductDetail/ProductDetail";
import { ProductDetailMobile } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductDetail/ProductDetailMobile";
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout";
import { getProduct, setProduct } from "../../src/a2-bll/product-reducer";
import { selectAppStatus, selectCartItemCodes, selectIsMobileDevice } from "../../src/a2-bll/selectors";
import { wrapper } from "../../src/a2-bll/store";

type TProductPageSSProps = {
    productSS: Nullable<TProductDetail>
}

type TProductPageProps = {
    history: Array<string>
}

export default function ProductPage({ history, productSS }: TProductPageSSProps & TProductPageProps) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const categories = useAppSelector(state => state.categories)
    const isMobileDevice = useAppSelector(selectIsMobileDevice)
    const status = useAppSelector(selectAppStatus)
    const cartItemCodes = useAppSelector(selectCartItemCodes)
    const productCS = useAppSelector(state => state.product.product)
    const [product, setProduct] = useState(productSS);
    const [currentArticle, setCurrentArticle] = useState(() => {
        if (productSS) {
            return productSS.articlesList.find(article => article.code === productSS.code)
        }
    })

    const [isInCart, setIsInCart] = useState(false)

    useEffect(() => {
        const onLoad = () => {
            const queryId = router.query.Id as string
            dispatch(getProduct(+queryId))
        }
        if (!productSS && !productCS) {
            onLoad()
        }
        if (productCS) {
            setProduct(productCS)
            setCurrentArticle(productCS.articlesList.find(article => article.code === productCS.code))
        }
    }, [productCS])

    useEffect(() => {
        currentArticle && setIsInCart(cartItemCodes.some(code => code === currentArticle.code))
    }, [])

    const onGotoPreviousClick = () => {
        if (!history || history.length < 2) { // to main page
            router.push('/');
        } else {
            console.log(history[history.length - 2]);
            router.push(history[history.length - 2]);
        }
    }

    //toggle variants
    const articleCodes = useMemo(() => {
        if (product) {
            return product.articlesList.map(article => article.code)
        }
        return []
    }, [product])
    const articleTitles = useMemo(() => {
        if (product) {
            return product.articlesList.map(article => (
                <figure key={article.code}>
                    <img src={article.galleryDetails.find(item => item.assetType === "DESCRIPTIVESTILLLIFE")?.url + "&call=url[file:/product/main]"}
                        title={article.colourDescription} alt={article.colourDescription} />
                </figure>
            ))
        }
        return []
    }, [product])
    const onArticleToggle = (code: string) => {
        product && setCurrentArticle(product.articlesList.find(article => article.code === code))
    }

    return (
        <MainLayout title={product ? product.name : "Product Page"} categories={categories} history={history}>
            {currentArticle &&
                <>
                    {isMobileDevice
                        ? <ProductDetailMobile currentArticle={currentArticle}
                            isInCart={isInCart}
                            articleCodes={articleCodes}
                            articleTitles={articleTitles}
                            onArticleVariantsToggle={onArticleToggle} />
                        : <ProductDetail currentArticle={currentArticle}
                            isInCart={isInCart}
                            articleCodes={articleCodes}
                            articleTitles={articleTitles}
                            onArticleVariantsToggle={onArticleToggle} />}
                    <section className="product-detail__stylewith">
                        <h4>Style with</h4>
                    </section>
                    <section className="product-detail__alsobought">
                        <h4>Others also bought</h4>
                    </section>
                    <Banner title="" link="/">
                        <p className="text">
                            By 2030, we aim to only work with recycled, organic, or other sustainably sourced materials.
                        </p>
                        <h3>
                            <strong>Right now, we're at 64%.</strong>
                        </h3>
                        <p>
                            Curious about what we're doing to lessen our environmental impact? Read more here.
                        </p>
                    </Banner>
                </>
            }
            <Preloader isVisible={status === "content loading"} /> 
        </MainLayout>
    )
}

export const getServerSideProps = wrapper
    .getServerSideProps<TProductPageSSProps>(store => async ({ req, query, resolvedUrl }) => {
        console.log("ss request")
        if (!req || (req.url && req.url.startsWith('/_next/data'))) {
            console.log("ss request dumped");
            return { props: { productSS: null } }
        }
        try {
            const state = store.getState()
            const queryId = query.id as string
            //const targetedCategory = getRequestedCategory(resolvedUrl, queryCategories, state.categories)
            if (!queryId) {
                return { notFound: true }
            }
            const region = state.regions

            const requiredParams: TGetProductDetailRequestRequiredData = {
                country: region.country,
                lang: region.lang,
                productcode: +queryId
            }

            const response = await (await fetch("http://localhost:4200/detail")).json() as TProductDetailResponse
            const productSS = response.product

            //const response = await ProductsAPI.getList(requiredParams, optionalParams)
            //const productsSS = response.data.results
            //products
            store.dispatch(setProduct(productSS))

            return { props: { productSS } }
        } catch (e) {
            console.log(e);
            return { props: { productSS: null } }
        }
    })
