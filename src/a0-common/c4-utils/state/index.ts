import { TSortValue } from './../../c1-types/t2-request/index'
import { TSortByKey } from './../../../a2-bll/filters-reducer'
import { TCategoriesState } from "../../../a2-bll/categories-reducer";
import { TFilterKey, TFiltersState } from "../../../a2-bll/filters-reducer";
import { TCategory, TRootCategoryValue } from "../../c1-types/t1-instance";
import { TGetProductsListRequestOptionalData } from "../../c1-types/t2-request";

export const getRequestedCategory = (
    path: string,
    queryCategories: Array<string>, //exm. ["new", "view-all"]
    allCategories: TCategoriesState) => {
    // parsing url and find according category in state to form request params
    const rootCategoryName = path.split("/")[1] as TRootCategoryValue
    const pageCategory = allCategories[rootCategoryName] as TCategory //exm. ladies: {TCategory}
    let targetedCategory: TCategory | undefined
    if (queryCategories) {
        let currentBranch = pageCategory as TCategory
        for (const queryCategory of queryCategories) {
            targetedCategory = currentBranch?.CategoriesArray?.find(category => {
                if (category.CategoryValue === queryCategory) {
                    if (category.CategoriesArray) {
                        currentBranch = category // nested category will be processed in next cycle
                    }
                    return category
                }
            })
        }
    }
    return targetedCategory
}
//=======================================================================================================

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>

export const configureOptionalParams = (params: TGetProductsListRequestOptionalData, filters: TFiltersState) => {
    const optionalParams = {...params}
    getKeys(filters.current).map((filterKey) => {
        if (filterKey === "sortBy") {
            optionalParams[filterKey] = filters.current[filterKey]
        }  
        if (filterKey !== "sortBy") {
            const filter = filters.current[filterKey]
            if (filter) {
                optionalParams[filterKey] = filter
            }
        }
        
    })
    return optionalParams

}

//=======================================================================================================
