import { ArticlesList, Collection, MaterialDetail, TProductDetailCategory, TProductDetailPrice } from './../a0-common/c1-types/t1-instance/TProductDetail'
import { TColor } from '../a0-common/c1-types/t1-instance/TProductDetail'
import { Nullable} from './../a0-common/c1-types/t1-instance/index'

const initialState = {
    code: null as Nullable<string>,
    name: null as Nullable<string>,
    description: null as Nullable<string>,
    sapProductName: null as Nullable<string>,
    sellingAttributes: [] as any[],
    color: null as Nullable<TColor>,
    whitePrice: null as Nullable<TProductDetailPrice>,
    redPrice: null as Nullable<TProductDetailPrice>,
    priceType: null as Nullable<string>,
    importedBy: null as Nullable<string>,
    importedDate: null as Nullable<string>,
    netQuantity: null as Nullable<string>,
    countryOfProduction: null as Nullable<string>,
    productTypeName: null as Nullable<string>,
    measurements: [] as Array<string>,
    descriptiveLenght: [] as Array<string>,
    assortmentTypeKey: null as Nullable<string>,
    lengthCollection: null as Nullable<Array<Collection>>,
    fits: [] as Array<string>,
    showPriceMarker: null as Nullable<boolean>,
    baseProductCode: null as Nullable<string>,
    ancestorProductCode: null as Nullable<string>,
    mainCategory: null as Nullable<TProductDetailCategory>,
    supercategories: null as Nullable<Array<TProductDetailCategory>>,
    constructionDescr: null as Nullable<string>,
    customerGroup: null as Nullable<string>,
    functions: [] as any[],
    newArrival: null as Nullable<boolean>,
    articlesList: null as Nullable<Array<ArticlesList>>,
    inStock: null as Nullable<boolean>,
    productUrl: null as Nullable<string>,
    swatchesType: null as Nullable<string>,
    rootCategoryPath: null as Nullable<string>,
    styles: [] as Array<string>,
    styleCollection: null as Nullable<Array<Collection>>,
    materialDetails: null as Nullable<Array<MaterialDetail>>,
    presentationTypes: null as Nullable<string>,
    newProduct: null as Nullable<boolean>,
}

export const productReducer =
(state: TProductState = initialState, action: TProductActions): TProductState => {
switch (action.type) {
    case productActionVariables.SET_:
        return {
            ...state,
            ...action.payload
        }
    default: return state
    }
}
// actions
export const setProduct = () => (
{
    type: productActionVariables.SET_,
    payload: {}
} as const)

// types
export type TProductState = typeof initialState
export type TProductActions =
    ReturnType<typeof setProduct>

// variables
const productActionVariables = {
    SET_: "" as const,
}