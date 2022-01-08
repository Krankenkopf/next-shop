import { FC, ReactElement, useEffect, useState } from "react"
import { Ail, CurrencySymbol, TProductDetailArticle } from "../../../../../a0-common/c1-types/t1-instance/TProductDetail"
import { useAppDispatch } from "../../../../../a0-common/c3-hooks"
import { addCartItem, deleteCartItem } from "../../../../../a2-bll/cart-reducer"
import Button from "../../../cp1-elements/el02-Button/Button"
import { Toggle } from "../../../cp1-elements/el06-Toggle/Toggle"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"

type TProductDetail = {
    currentArticle: TProductDetailArticle
    articleCodes: Array<string>
    articleTitles: Array<ReactElement>
    isInCart: boolean

    onArticleVariantsToggle: (code: string) => void

}

export const ProductDetail: FC<TProductDetail> = ({
    currentArticle, articleCodes, articleTitles, isInCart, onArticleVariantsToggle,
}) => {
    const dispatch = useAppDispatch()

    const [imgs, setImgs] = useState<Array<Ail>>([])
    
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
            isInCart
                ? dispatch(deleteCartItem((currentArticle.code)))
                : dispatch(addCartItem(currentArticle, "detail"))
        }
    return ( 
        <article className="product-detail__wrapper">
            {imgs.length && <figure className="product-detail__mainImg">
                <img src={imgs[0].url} alt={`${currentArticle.name} ${imgs[0].assetType}`}></img>
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
                            options={articleCodes}
                            titles={articleTitles}
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
                            <img src={img.url} alt={`${currentArticle.name} ${img.assetType}`}></img>
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
            <div className="shadow-fade bottom"></div>
        </article>
    )
}
