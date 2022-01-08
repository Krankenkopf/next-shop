import React, { FC } from "react"
import { TCategory } from "../../../../a0-common/c1-types/t1-instance"
import { categoryToLiLinkA } from "../../../../a0-common/c4-utils/ui"
import css from "./Sidebar.module.scss"

type TSidebarProps = {
    category?: TCategory
    rootCategoryName?: string
}

export const Sidebar: FC<TSidebarProps> = ({ category, rootCategoryName }) => {
    let mappedCategories: Array<JSX.Element | null> | undefined
    if (category && category.CategoriesArray) {
        mappedCategories = category.CategoriesArray.map((category, i, arr) => {
            let root = `/${rootCategoryName}/${category.CategoryValue}`
            return category.CategoriesArray
                ? <li key={category.CategoryValue}>
                    <h4>{category.CatName}</h4>
                    <ul>
                        {categoryToLiLinkA(category.CategoriesArray, root, css.link, false)}
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
                        </li>
                        <li>
                            <h4>Trending Now</h4> 
                        </li>
                        <li>
                            <h4>Offers</h4>  
                        </li>
                        <li>
                            <h4>Shop by Product</h4>
                        </li>
                        <li>
                            <h4>Gift Cards</h4>
                        </li>
                        <li>
                            <h4>Sustainability</h4>
                        </li>
                        <li>
                            <h4>Magazine</h4>
                        </li>
                        <li>
                            <h4>Shop by Occasion</h4>
                        </li>
                    </>
                }
            </ul>
        </div>
    )
}