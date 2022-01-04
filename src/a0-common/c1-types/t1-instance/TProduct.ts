import { Concept, TColor } from "./TProductDetail"

export type TProduct = {
    code: string;
    name: string;
    stock: {
        stockLevel: number
    }
    price: Price;
    images: ImageSrc[];
    categories: any[];
    pk: string;
    sellingAttributes?: SellingAttribute[];
    whitePrice: Price;
    articles: Article[];
    markers?: Marker[];
    visible: boolean;
    concept: Concept[];
    numbersOfPieces: number;
    defaultArticle: Article;
    sale: boolean;
    variantSizes: VariantSize[];
    swatches: string[];
    articleCodes: string[];
    ticket: string;
    searchEngineProductId: string;
    dummy: boolean;
    linkPdp: string;
    categoryName: CategoryName;
    rgbColors: string[];
    articleColorNames: string[];
    ecoTaxValue: number;
    swatchesTotal: number;
    showPriceMarker: boolean;
    redirectToPdp: boolean;
    mainCategoryCode: string;
    comingSoon: boolean;
}

export interface Article {
    code: string;
    name: string;
    images: ImageSrc[];
    pk: string;
    sellingAttributes?: SellingAttribute[];
    whitePrice: Price;
    logoPicture: ImageSrc[];
    normalPicture: ImageSrc[];
    markers?: Marker[];
    visible: boolean;
    numbersOfPieces: number;
    ticket: string;
    dummy: boolean;
    ecoTaxValue: number;
    redirectToPdp: boolean;
    comingSoon: boolean;
    color: TColor;
    rgbColor: string;
    genArticle?: string;
    environmentalMarkers?: string[];
    damStyleWith?: string[];
    picture?: string;
    swatches?: string[];
    ugcMedia?: Media;
    campaignMedia?: Media;
}

export interface Media {
    url: string;
    id: string;
    author: string;
    type: string;
}

type ImageSrc = {
    url: string
}

export interface Marker {
    text: string;
    type: string;
}

export enum SellingAttribute {
    NewArrival = "New Arrival",
}

export interface Price {
    currencyIso: CurrencyISO;
    value: number;
    priceType: string;
    formattedValue: string;
    type: PriceType;
}

export enum CurrencyISO {
    BYN = "BYN",
    CAD = "CAD",
    EUR = "EUR",
    GBP = "GBP",
    PLN = "PLN",
    RUB = "RUB",
    UAH = "UAH",
    USD = "USD",
}

export enum PriceType {
    White = "WHITE",
}

export enum CategoryName {
    Men = "Men",
}

export interface VariantSize {
    orderFilter: number;
    filterCode: string;
}