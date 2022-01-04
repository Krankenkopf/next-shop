import { NextPageContext } from "next";
import { AppContext } from "next/app";
import { useRouter } from "next/dist/client/router"
import Link from "next/link";
import Router from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Nullable } from "../../src/a0-common/c1-types/t1-instance";
import { TCheckedProduct } from "../../src/a0-common/c1-types/t1-instance/TCheckedProduct";
import { Ail, CurrencySymbol, TProductDetail } from "../../src/a0-common/c1-types/t1-instance/TProductDetail";
import { TGetProductDetailRequestRequiredData } from "../../src/a0-common/c1-types/t2-request";
import { TProductDetailResponse } from "../../src/a0-common/c1-types/t3-response/TProductDetailResponse";
import { useAppDispatch, useAppSelector } from "../../src/a0-common/c3-hooks";
import Button from "../../src/a1-ui/u1-components/cp1-elements/el02-Button/Button";
import { Toggle } from "../../src/a1-ui/u1-components/cp1-elements/el06-Toggle/Toggle";
import { Icon } from "../../src/a1-ui/u1-components/cp1-elements/el10-Icons/Icon";
import { Banner } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Banner";
import { ProductDetail } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductDetail/ProductDetail";
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout";
import { addCartItem, deleteCartItem } from "../../src/a2-bll/cart-reducer";
import { getProduct, setProduct } from "../../src/a2-bll/product-reducer";
import { selectCartItemCodes } from "../../src/a2-bll/selectors";
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
    const cartItemCodes = useAppSelector(selectCartItemCodes)
    const productCS = useAppSelector(state => state.product.product)
    const [product, setProduct] = useState(productSS);
    const [currentArticle, setCurrentArticle] = useState(() => {
        if (productSS) {
            return productSS.articlesList.find(article => article.code === productSS.code)
        }
    })
    const [imgs, setImgs] = useState<Array<Ail>>([])
    const [isInCart, setIsInCart] = useState(true)



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
        let arr: Array<Ail> = []
        currentArticle && currentArticle.galleryDetails.map(item => {
            if (!arr.some(el => el.url === item.url)) { //not to add duplicates
                arr.push({ url: item.url + "&call=url[file:/product/main]", assetType: item.assetType })
            }
        })
        arr.length && setImgs(arr)
    }, [currentArticle])

    const onCartButtonClick = () => {
        if (currentArticle) {
            isInCart
                ? dispatch(deleteCartItem((currentArticle.code)))
                : dispatch(addCartItem(currentArticle, "detail"))
        }

    }

    const onGotoPreviousClick = () => {
        if (!history || history.length < 2) { // to main page
            router.push('/');
        } else {
            console.log(history[history.length - 2]);
            router.push(history[history.length - 2]);
        }
    }

    //toggle variants
    const toggleArticleOptions = useMemo(() => {
        if (product) {
            return product.articlesList.map(article => article.code)
        }
        return []
    }, [product])
    const toggleArticleTitles = useMemo(() => {
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
    const onArticleVariantsToggle = (code: string) => {
        product && setCurrentArticle(product.articlesList.find(article => article.code === code))
    }

    return (
        <MainLayout title={product ? product.name : "Product Page"} categories={categories} history={history}>
            {currentArticle &&
                <>
                <article className="product-detail__wrapper">
                    {imgs.length && <figure className="product-detail__mainImg">
                        <img src={imgs[0].url} alt={`${product?.name} ${imgs[0].assetType}`}></img>
                    </figure>}
                    <aside>
                        <div className="product-detail__sidebar">
                            <div className="product-detail__sidebar__title iconized right wide">
                                <h4>{currentArticle.name}</h4>
                                <Icon name="heart" size="full" side="right" />
                            </div>
                            <div className="product-detail__sidebar__price">
                                {currentArticle.redPrice
                                    ? <>
                                        <strong style={{ color: "#e03" }}>
                                            {currentArticle.redPrice.price + CurrencySymbol[currentArticle.redPrice.currency]}
                                        </strong>
                                        {" "}
                                        <s>
                                            {currentArticle.whitePrice.price + CurrencySymbol[currentArticle.whitePrice.currency]}
                                        </s>
                                    </>
                                    : <strong>
                                        {currentArticle.whitePrice.price + CurrencySymbol[currentArticle.whitePrice.currency]}
                                    </strong>
                                }
                            </div>
                            <div className="product-detail__sidebar__variants">
                                <h5>{currentArticle.colourDescription}</h5>
                                <Toggle value={currentArticle.code}
                                    options={toggleArticleOptions}
                                    titles={toggleArticleTitles}
                                    onChangeOption={onArticleVariantsToggle}
                                    className="product-detail__sidebar__variants-toggle"
                                    frameClassName="toggle__frame__variants" />
                            </div>
                            {isInCart && <p className="product-detail__sidebar__cart-info text center">In your cart</p>}
                            <Button variant={isInCart ? "cancel" : "ok"} onClick={onCartButtonClick}>
                                <div className="iconized right wide">
                                    <Icon name="cart-shopping" size="full" side="right" />
                                    <div className="button-text">
                                        {isInCart ? "Remove from cart" : "Add to cart"}
                                    </div>
                                </div>
                            </Button>
                        </div>
                    </aside>
                    <section className="product-detail__desc">
                        <p>{currentArticle.description}</p>
                        {currentArticle.modelHeight && <p className="text">
                            <strong>Size&nbsp;&#8212;&nbsp;</strong>
                            The model is {currentArticle.modelHeight}
                        </p>}
                        <p className="text">
                            <strong>Composition&nbsp;&#8212;&nbsp;</strong>
                            {currentArticle.compositions[0].materials.map((material, i) => (i === 0
                                ? <span>{material.name} {Math.round(+material.percentage)}%</span>
                                : <span>, {material.name} {Math.round(+material.percentage)}%</span>
                            ))}
                        </p>
                        <p className="text">
                            <strong>Art. no.&nbsp;&#8212;&nbsp;</strong>
                            {currentArticle.code}
                        </p>
                    </section>
                    {imgs.length > 1 && <section className="product-detail__otherImgs">
                        {imgs.map((img, i) => {
                            if (i !== 0) return (
                                <figure key={img.url}>
                                    <img src={img.url} alt={`${product?.name} ${img.assetType}`}></img>
                                </figure>)
                        })}
                    </section>}
                    <div className="product-detail__footer-overlay" />
                    <footer className="product-detail__footer">
                        <div className="product-detail__footer-inner">
                            <ul>
                                <li>
                                    <Button orientation="right">Details</Button>
                                </li>
                                <li>
                                    <Button>Delivery and Payment</Button>
                                </li>
                                <li>
                                    <Button orientation="left">Product background</Button>
                                </li>
                            </ul>
                            <p className="text center">Members get free online returns.</p>
                        </div>
                    </footer>
                    
                    <div className="shadow-fade"></div>
                </article>
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
