export type Nullable<T> = T | null;
export type Modify<T, R> = Omit<T, keyof R> & R; // {a: number, b: string} => {a: string, b: string}

export type TPageMeta = {
  title: string;
  path: TRootCategoryValue;
};

export type TCategory = {
  CatName: string;
  CategoryValue: string;
  CategoriesArray?: Array<TCategory>;
  tagCodes: string[];
};

export type TRootCategory<
  V extends TRootCategoryValue,
  C extends TRootCategoryTagCodes,
> = {
  CatName: string;
  CategoryValue: V;
  CategoriesArray?: Array<TCategory>;
  tagCodes: C;
};

export type TRootCategoryValue =
  | 'ladies'
  | 'divided'
  | 'men'
  | 'baby'
  | 'kids'
  | 'home'
  | 'sale';
type TRootCategoryTagCodes =
  | []
  | [
      | 'ladies_all'
      | 'ladies_divided'
      | 'men_all'
      | 'kids_newbornbaby_viewall'
      | 'kids_all'
      | 'home_all',
    ];
