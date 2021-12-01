export type Nullable<T> = T | null

export type TPageMeta = {
    title: string
    path: TRootCategoryValue
}

export type TCategory = {
    CatName: string
    CategoryValue: string
    CategoriesArray?: Array<TCategory>
    tagCodes: string[]
}

export type TRootCategory<V extends TRootCategoryValue, C extends TRootCategoryTagCodes> = {
    CatName: string
    CategoryValue: V
    CategoriesArray?: Array<TCategory>
    tagCodes: C
}

export type TRootCategoryValue = "ladies" | "divided" | "men" | "baby" | "kids" | "home" | "sale"
type TRootCategoryTagCodes = [] | [
    "ladies_all" | "ladies_divided" | "men_all" | "kids_newbornbaby_viewall" | "kids_all" | "home_all"]



    
export enum IconColor {
    OK = "#00bb00",
    ERROR = "#ff0000",
    INITIAL = "#292825",
    OPTIONAL = "#5555ff",
    INFO = "#1111ff",
    FAVORITE = "#e50010"
}
