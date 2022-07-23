import { TCategory } from '../instance';

export type TCategoriesResponse = [
  {
    CatName: string;
    CategoryValue: 'ladies';
    CategoriesArray: Array<TCategory>;
    tagCodes: ['ladies_all'];
  },
  {
    CatName: string;
    CategoryValue: 'divided';
    CategoriesArray: Array<TCategory>;
    tagCodes: ['ladies_divided'];
  },
  {
    CatName: string;
    CategoryValue: 'men';
    CategoriesArray: Array<TCategory>;
    tagCodes: ['men_all'];
  },
  {
    CatName: string;
    CategoryValue: 'baby';
    CategoriesArray: Array<TCategory>;
    tagCodes: ['kids_newbornbaby_viewall'];
  },
  {
    CatName: string;
    CategoryValue: 'kids';
    CategoriesArray: Array<TCategory>;
    tagCodes: ['kids_all'];
  },
  {
    CatName: string;
    CategoryValue: 'home';
    CategoriesArray: Array<TCategory>;
    tagCodes: ['home_all'];
  },
  {
    CatName: string;
    CategoryValue: 'sale';
    tagCodes: [];
  },
];
