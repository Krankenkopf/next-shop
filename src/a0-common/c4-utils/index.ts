import { TCategoriesState } from "../../a2-bll/categories-reducer";
import { TCategory, TRootCategoryValue } from "../c1-types/t1-instance";

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