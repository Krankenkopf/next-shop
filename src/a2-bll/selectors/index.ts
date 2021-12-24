import { TCategory, TPageMeta, TRootCategoryValue } from './../../a0-common/c1-types/t1-instance/index'
import { createSelector } from "reselect";
import { TState } from "../store";
import { capitalizeFirst } from '../../a0-common/c4-utils/ui';

const selectCategories = (state: TState) => state.categories

export const selectFilters = (state: TState) => state.filters
export const selectSort = (state: TState) => state.sort
export const selectModal = (state: TState) => state.app.modal
export const selectItemsTotalCount = (state: TState) => state.navigation.totalNumberOfResults
export const selectItemsTotalCountUnfiltered = (state: TState) => state.navigation.totalNumberOfResultsUnfiltered
export const selectCartItems = (state: TState) => state.cart.products

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
                CatName: capitalizeFirst(category),
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
            : { title: capitalizeFirst(category), path: category }
    }
)