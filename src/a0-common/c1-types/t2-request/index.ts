import { CountryCodes, LanguageCodes } from "../t1-instance/regions"

export type TGetProductsListRequestRequiredData = {
    country: CountryCodes,
    lang: LanguageCodes,
    currentpage: number,
    pagesize: number,
}

export type TGetProductsListRequestOptionalData = {
    //It is tagCodes field gotten from /categories/list endpoint, pass this param multiple times to filter by multiple categories
    categories?: Array<string>
    //Look for the value in "facets" object with "code": "sizes", pass this param multiple times to filter by multiple sizes
    sizes?: Array<string>
    sortBy?: TSortValue //default is stock
    //Look for the value in "facets" object with "code": "contexts", pass this param multiple times to filter by multiple contexts
    contexts?: Array<string>
    //Look for the value in "facets" object with "code": "concepts", pass this param multiple times to filter by multiple concepts
    concepts?: Array<string>
    //Look for the value in "facets" object with "code": "collection", pass this param multiple times to filter by multiple collection
    collection?: Array<string>
    //Look for the value in "facets" object with "code": "qualities", pass this param multiple times to filter by multiple qualities
    qualities?: Array<string>
    //Look for the value in "facets" object with "code": "fits", pass this param multiple times to filter by multiple fits
    fits?: Array<string>
    //Look for the value in "facets" object with "code": "descriptiveLengths", pass this param multiple times to filter by multiple lengths
    descriptiveLengths?: Array<string>
    //Look for the value in "facets" object with "code": "functions", pass this param multiple times to filter by multiple functions
    functions?: Array<string>
    //Look for the value in "facets" object with "code": "colorWithNames", pass this param multiple times to filter by multiple colors
    colorWithNames?: Array<string>
    sale?: "true" | "false" //????
}

export type TSortValue = "ascPrice" | "descPrice" | "stock" | "newProduct"