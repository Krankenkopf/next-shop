import { TCategory, TPageMeta, TRootCategoryValue } from './../../a0-common/c1-types/t1-instance/index'
import { createSelector } from "reselect";
import { TState } from "../store";

const selectCategories = (state: TState) => state.categories
//const selectPageMeta = (state: TState) => 
export const selectPageCategory = createSelector(
    [
        // Usual first input - extract value from `state`
        selectCategories,
        // Take the second arg, `category`, and forward to the output selector
        (state, category: TRootCategoryValue) => category
    ],
    // Output selector gets (`categories, category)` as args
    (categories, category): TCategory => {
        const selected = categories[category]
        return selected
            ? selected
            : {
            CatName: `${category.slice(0, 1).toUpperCase()}${category.slice(1)}`,
            CategoryValue: category,
            CategoriesArray: [],
            tagCodes: [category]
        }
        
    }
)

export const selectPageMeta = createSelector(
    [
        selectCategories,
        (state, category: TRootCategoryValue) => category
    ],
    (categories, category): TPageMeta => {
        const selected = categories[category]
        return selected
            ? { title: selected.CatName, path: selected.CategoryValue }
            : { title: `${category.slice(0, 1).toUpperCase()}${category.slice(1)}`, path: category }
    }
)