import { TProduct } from "../t1-instance/TProduct"

export type TProductsResponse = {
    results: TProduct[] | null
    pagination?: TPagination
    facets?: any
    freeTextSearch?: string
    categoryCode?: string
    baseUrl?: string
}

type TPagination = {
    pageSize: number 
    currentPage: number
    sort: "ascPrice" | "descPrice" | "stock" | "newProduct"
    numberOfPages: number
    totalNumberOfResults: number
    totalNumberOfResultsUnfiltered: number
}