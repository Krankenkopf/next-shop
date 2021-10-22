import { FC } from "react"
import { SellingAttribute } from "../../../../a0-common/c1-types/TProductsResponse"
import css from "./ProductItem.module.scss"

type TProductItems = {
    name: string
    price: string
    imgSrc: string
    rgbColors: string[]
    articleColorNames: string[]
    sellingAttributes?: SellingAttribute[]
}

export const ProductItem: FC<TProductItems> = (props) => {
    const {name, price, imgSrc, rgbColors, articleColorNames, sellingAttributes} = props
    const revealItem = () => {

    }
    const colorVariants = rgbColors.map((color: string, i: number) => {
        return (
             <li className="item">
            <a href="/ru_ru/productpage.1017075001.html" className="swatch" style={{backgroundColor: color}} title={articleColorNames[i]}>
                {articleColorNames[i]}
            </a>
        </li>
        )
    })
    return (
        <>
            <li className="product-item">
                <article className="hm-product-item"
                    data-style-with-articlecodes=""
                    data-pre-access-groups=""
                    data-pre-access-end-date=""
                    data-pre-access-start-date=""
                    data-energy-interval=""
                    data-articlecode="1017075001"
                    data-category="men_jacketscoats_jackets"
                    onClick={revealItem}
                    data-index="0">
                    <div className="image-container">
                        <a href="/productpage"
                            title={name}
                            className="item-link remove-loading-spinner">
                            <img src={imgSrc}
                                data-altimage="//lp2.hm.com/hmgoepprod?set=source[/4c/12/4c1223d7359e0f6e19bedd93f4b1816d667d2fe1.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&amp;call=url[file:/product/main]"
                                className="item-image" alt={name} data-alttext="Куртка THERMOLITE®" data-src="//lp2.hm.com/hmgoepprod?set=source[/4c/12/4c1223d7359e0f6e19bedd93f4b1816d667d2fe1.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[y],hmver[2]&amp;call=url[file:/product/main]"
                                title={name} />
                            <div className="item-buttons">
                                <div className="promotion-marker">{price}</div>
                                <button className="favorite icon-favorites js-favorite" data-tracking-type="event" data-tracking-json-template="utagFavorite" data-tracking-params="Favourites|1017075001|Куртка THERMOLITE®|MEN_NEWARRIVALS : VIEWALL_VIEWALL : VIEWALL_VIEW_ALL" data-saved-text="СОХРАНЕНО КАК ИЗБРАННОЕ" data-not-saved-text="СОХРАНИТЬ КАК ИЗБРАННОЕ">
                                    To Favourites
                                </button>
                            </div>
                        </a>
                    </div>
                    <div className="item-details">
                        <div className="marketing-marker marker-environment" >Conscious</div>
                        <h3 className="item-heading">
                            <a className="link" href="/ru_ru/productpage.1017075001.html">{name}</a>
                        </h3>
                        <strong className="item-price">
                            <span className="price regular">{price}</span>
                        </strong>
                        <ul className="list-swatches" data-swatches-total="1">
                            {colorVariants}
                        </ul>
                        <div className="new-product">{}</div>
                    </div>
                </article>
            </li>
        </>
    )
}