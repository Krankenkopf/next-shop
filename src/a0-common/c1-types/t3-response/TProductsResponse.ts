import { Modify } from "../t1-instance"
import { TProduct } from "../t1-instance/TProduct"

export type TProductsResponse = {
    results: TProduct[]
    pagination: TPagination
    facets: Array<TAnyFacet>
    freeTextSearch?: string
    categoryCode?: string
    baseUrl?: string
}

export type TPagination = {
    pageSize: number 
    currentPage: number
    sort: "ascPrice" | "descPrice" | "stock" | "newProduct"
    numberOfPages: number
    totalNumberOfResults: number
    totalNumberOfResultsUnfiltered: number
}

export type TFacet = {
    code: "concepts" | "sizes" | "contexts" | "collection" | "qualities" | "fits" | "descriptiveLengths" | "functions" | "colorWithNames"
    priority: number
    category: boolean
    multiSelect: boolean
    visible: boolean
    values: Array<{code: string, count: number, selected: boolean}>
}

export type TAnyFacet = Modify<TFacet, {code: string}>
