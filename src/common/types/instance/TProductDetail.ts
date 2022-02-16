import { CurrencyISO } from './TProduct';

export type TProductDetail = {
  code: string;
  name: string;
  description: string;
  sapProductName: string;
  sellingAttributes: any[];
  color: TColor;
  whitePrice: TProductDetailPrice;
  redPrice: TProductDetailPrice;
  priceType: string;
  importedBy: string;
  importedDate: string;
  netQuantity: string;
  countryOfProduction: string;
  productTypeName: string;
  measurements: string[];
  descriptiveLenght: string[];
  assortmentTypeKey: string;
  lengthCollection: Collection[];
  fits: string[];
  showPriceMarker: boolean;
  baseProductCode: string;
  ancestorProductCode: string;
  mainCategory: TProductDetailCategory;
  supercategories: TProductDetailCategory[];
  constructionDescr: string;
  customerGroup: string;
  functions: any[];
  newArrival: boolean;
  articlesList: TProductDetailArticle[];
  inStock: boolean;
  productUrl: string;
  swatchesType: string;
  rootCategoryPath: string;
  styles: string[];
  styleCollection: Collection[];
  materialDetails: MaterialDetail[];
  presentationTypes: string;
  newProduct: boolean;
};

export type TProductDetailArticle = {
  code: string;
  name: string;
  description: string;
  sellingAttributes: any[];
  color: TColor;
  whitePrice: TProductDetailPrice;
  redPrice?: TProductDetailPrice;
  colourDescription: string;
  pattern: string;
  lengthCollection: any[];
  showPriceMarker: boolean;
  galleryDetails: Ail[];
  fabricSwatchThumbnails: Ail[];
  styleWith: StyleWith[];
  functions: any[];
  careInstructions: string[];
  compositions: Composition[];
  graphicalAppearanceDesc: string;
  genericDescription: string;
  variantsList: VariantsList[];
  concepts: Concept[];
  legalRestrictions: any[];
  parentProductCode: string;
  styleWithScenario: string;
  inStore: boolean;
  productTransparencyEnabled: boolean;
  suppliersDetailEnabled: boolean;
  suppliersSectionDisabledReason: string;
  comingSoon: boolean;
  external: boolean;
  articleType?: string;
  brandName: BrandName;
  palette: boolean;
  travelSize: boolean;
  corporateBrandId: number;
  visualDescription?: string;
  modelHeight?: string;
  garmentSize?: string;
};
export enum BrandName {
  HM = 'H&M',
}

export type TColor = {
  code: string;
  text: string;
  filterName?: string;
  rgbColor?: string;
  hybrisCode?: string;
};

export interface Composition {
  materials: Material[];
}

export interface Material {
  name: MaterialName;
  percentage: string;
}

export enum MaterialName {
  Cotton = 'Cotton',
  Polyamide = 'Polyamide',
  Polyester = 'Polyester',
}

export enum Concept {
  HMMan = 'H&M MAN',
}

export interface Ail {
  url: string;
  assetType: AssetType;
}

export enum AssetType {
  Descriptivedetail = 'DESCRIPTIVEDETAIL',
  Descriptivestilllife = 'DESCRIPTIVESTILLLIFE',
  Lookbook = 'LOOKBOOK',
}
export type TProductDetailPrice = {
  price: number;
  currency: CurrencyISO;
  referenceFlag: boolean;
  startDate: number;
  endDate: number;
};

export enum CurrencySymbol {
  BYN = 'Br',
  CAD = '$',
  EUR = '€',
  GBP = '£',
  PLN = 'zł',
  RUB = '₽',
  UAH = '₴',
  USD = '$',
}

export interface StyleWith {
  code: string;
  lengthCollection: any[];
  showPriceMarker: boolean;
  styleWithOrigin: string;
  parentProductCode: string;
  inStore: boolean;
  productTransparencyEnabled: boolean;
  suppliersDetailEnabled: boolean;
  comingSoon: boolean;
  external: boolean;
  palette: boolean;
  travelSize: boolean;
}

export interface VariantsList {
  code?: string;
  width?: string;
  length?: string;
  size?: Size;
}

export interface Size {
  sizeCode: string;
  name: SizeFilterEnum;
  sizeScaleCode: string;
  sizeScaleDescription: string;
  sizeOrder: number;
  sizeFilter: SizeFilterEnum;
  market: string;
}
export enum SizeFilterEnum {
  L = 'L',
  LL = 'L/L',
  LS = 'L/S',
  M = 'M',
  ML = 'M/L',
  MS = 'M/S',
  NameML = 'M_L',
  NameXSS = 'XS_S',
  S = 'S',
  SS = 'S/S',
  The3Xl = '3XL',
  Xl = 'XL',
  XlL = 'XL/L',
  XlS = 'XL/S',
  Xs = 'XS',
  XsS = 'XS/S',
  Xxl = 'XXL',
  XxlS = 'XXL/S',
}

export interface Collection {
  code: string;
  value: string[];
}

export type TProductDetailCategory = {
  name: string;
  code: string;
};

export interface MaterialDetail {
  name: MaterialName;
  description: string;
}
