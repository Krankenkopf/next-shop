import React, { FC } from "react"
import { TCategory } from "../../../../a0-common/c1-types/t1-instance"
import { toLiLinkA, _toLiLinkA } from "../../../../a0-common/c4-utils/ui"
import css from "./Sidebar.module.scss"

type TSidebarProps = {
    category?: TCategory
    rootCategoryName?: string
}

export const Sidebar: FC<TSidebarProps> = ({ category, rootCategoryName }) => {
    const srcs = React.useMemo(() => {
        return {
            newArrivals: [
                { title: "View All", href: "/" },
                { title: "Clothes", href: "/" },
                { title: "Shoes & Accessories", href: "/" },
                { title: "Underwear & Nightwear", href: "/" },
            ],
            trendingNow: [
                { title: "The Holiday Shop", href: "/" },
                { title: "Winter must-haves", href: "/" },
                { title: "Varsity wear", href: "/" },
                { title: "Y2K fashion", href: "/" },
                { title: "Trend edit", href: "/" },
            ],
            offers: [
                { title: "Sale", href: "/" },
                { title: "Student Discount: Get 15% off", href: "/" },
            ],
            shopByProduct: [
                { title: "View All", href: "/" },
                { title: "Tops", href: "/" },
                { title: "Basics", href: "/" },
                { title: "Shirts & Blouses", href: "/" },
                { title: "Cardigans & Sweaters", href: "/" },
                { title: "Blazers", href: "/" },
                { title: "Jackets & Coats", href: "/" },
                { title: "Hoodies & Sweatshirts", href: "/" },
                { title: "Pants", href: "/" },
                { title: "Jeans", href: "/" },
                { title: "Shorts", href: "/" },
                { title: "Skirts", href: "/" },
                { title: "Dresses", href: "/" },
                { title: "Jumpsuits & Rompers", href: "/" },
                { title: "Shoes", href: "/" },
                { title: "Accessories", href: "/" },
                { title: "Swimwear & Beachwear", href: "/" },
                { title: "Lingerie", href: "/" },
                { title: "Loungewear", href: "/" },
                { title: "Sleepwear", href: "/" },
                { title: "Socks & Tights", href: "/" },
                { title: "Activewear", href: "/" },
                { title: "Maternity Wear", href: "/" },
                { title: "Plus Sizes", href: "/" },
                { title: "Beauty", href: "/" },
                { title: "Care products", href: "/" },
                { title: "Petite Size", href: "/" },
                { title: "Premium Selection", href: "/" },
            ],
            giftCards: [
                { title: "Gift Cards", href: "/" },
            ],
            sustainability: [
                { title: "Our products", href: "/" },
                { title: "H&M Take Care", href: "/" },
                { title: "Learn More", href: "/" },
                { title: "Higg Index", href: "/" },
            ],
            magasine: [
                { title: "Magazine", href: "/" },
            ],
            shopByOccasion: [
                { title: "Wedding", href: "/" },
                { title: "Party Wear", href: "/" },
                { title: "Casual Wear", href: "/" },
                { title: "Office Wear", href: "/" },
                { title: "Loungewear", href: "/" },
            ]
        }
    }, [])
    let mappedCategories: Array<JSX.Element | null> | undefined
    if (category && category.CategoriesArray) {
        mappedCategories = category.CategoriesArray.map((category, i, arr) => {
            let root = `/${rootCategoryName}/${category.CategoryValue}`
            return category.CategoriesArray
                ? <li key={category.CategoryValue}>
                    <h4>{category.CatName}</h4>
                    <ul>
                        {_toLiLinkA(category.CategoriesArray, root, css.link)}
                    </ul>
                </li>
                : null /* if cat has no array, its title will not displayed*/
        })
    }

    return (
        <div className={css.sidebar}>
            <ul>
                {category
                    ? <>
                        {mappedCategories}
                    </>
                    : <>
                        <li>
                            <h4>New Arrivals</h4>
                            <ul>
                                {toLiLinkA(srcs.newArrivals, css.link)}
                            </ul>
                        </li>
                        <li>
                            <h4>Trending Now</h4>
                            <ul>
                                {toLiLinkA(srcs.trendingNow, css.link)}
                            </ul>
                        </li>
                        <li>
                            <h4>Offers</h4>
                            <ul>
                                {toLiLinkA(srcs.offers, css.link)}
                            </ul>
                        </li>
                        <li>
                            <h4>Shop by Product</h4>
                            <ul>
                                {toLiLinkA(srcs.shopByProduct, css.link)}
                            </ul>
                        </li>
                        <li>
                            <h4>Gift Cards</h4>
                            <ul>
                                {toLiLinkA(srcs.giftCards, css.link)}
                            </ul>
                        </li>
                        <li>
                            <h4>Sustainability</h4>
                            <ul>
                                {toLiLinkA(srcs.sustainability, css.link)}
                            </ul>
                        </li>
                        <li>
                            <h4>Magazine</h4>
                            <ul>
                                {toLiLinkA(srcs.magasine, css.link)}
                            </ul>
                        </li>
                        <li>
                            <h4>Shop by Occasion</h4>
                            <ul>
                                {toLiLinkA(srcs.shopByOccasion, css.link)}
                            </ul>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}