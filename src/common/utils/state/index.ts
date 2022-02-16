import { TCategoriesState, TFacets } from '../../../bll/reducers';
import { TCategory, TRootCategoryValue } from '../../types/instance';
import { TAnyFacet, TFacet } from '../../types/response/TProductsResponse';

export const getRequestedCategory = (
  url: string, // exm. /ladies/[...categories] or /ladies/new/view-all
  queryCategories: Array<string>, // exm. ["new", "view-all"]
  allCategories: TCategoriesState,
) => {
  // parsing url and find according category in state to form request params
  const rootCategoryName = url.split('/')[1] as TRootCategoryValue; // exm. "ladies", must be equal to keys of state
  const pageCategory = allCategories[rootCategoryName] as TCategory; // exm. ladies: {TCategory}
  let targetedCategory: TCategory | undefined;
  if (queryCategories) {
    let currentBranch = pageCategory as TCategory;
    for (const queryCategory of queryCategories) {
      // eslint-disable-next-line array-callback-return
      targetedCategory = currentBranch?.CategoriesArray?.find(category => {
        if (category.CategoryValue === queryCategory) {
          if (category.CategoriesArray) {
            currentBranch = category; // nested category will be processed in next cycle
          }
          return category;
        }
      });
    }
  }
  return targetedCategory;
};
//= ======================================================================================================

export const getKeys = Object.keys as <T extends Object>(obj: T) => Array<keyof T>;

//= ======================================================================================================
export const extendWithNonNullables = <T, F>(initial: T, base: F) => {
  const defined = {} as F;
  getKeys(base).forEach(key => {
    if (base[key]) {
      if (Array.isArray(base[key])) {
        if (!(base[key] as unknown as Array<any>).length) return; // no assigning when value is []
      }
      defined[key] = base[key];
    }
  });
  return { ...initial, ...defined };
};

export const extractRelevantFacets = (heap: Array<TAnyFacet>, template: TFacets) => {
  const templated = {} as TFacets;
  getKeys(template).forEach(key => {
    const relevantFacet = heap.find(facet => facet.code === key) as TFacet | undefined;
    if (relevantFacet) {
      templated[key] = relevantFacet;
    }
  });
  return templated;
};

//= ======================================================================================================
export const convertObjToFlags = <T>(obj: T) =>
  getKeys(obj).reduce((flags, key) => {
    flags[key] = false;
    return flags;
  }, {} as { [Key in keyof T]: boolean });
