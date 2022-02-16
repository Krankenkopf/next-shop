/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import db from '../../../db.json';
import { TGetProductsListRequestOptionalCategories } from '../../common/types/request';
import {
  extendWithNonNullables,
  extractRelevantFacets,
} from '../../common/utils/state/index';
import { TFacets, TFilters } from '../reducers/filters';

const initialFiltersState = {
  current: {
    sizes: [],
    contexts: ['Casual', 'Formal'],
    concepts: [],
    collection: [],
    qualities: ['gut', 'sehr gut', 'very sehr gut'],
    fits: [],
    functions: [],
    colorWithNames: [],
  } as TFilters,
  facets: {
    sizes: null,
    contexts: null,
    concepts: null,
    collection: null,
    qualities: null,
    fits: null,
    functions: null,
    colorWithNames: null,
  } as TFacets,
};
beforeEach(() => {
  // const id1 = v1();
  // const id2 = v1();
  const startState = [
    //    { id: id1, title: "title", filter: "all" },
    //    { id: id2, title: "title", filter: "all" }
  ];
});

test('not nulled fields should be added', () => {
  const initialOptionalParams: TGetProductsListRequestOptionalCategories = {
    categories: ['2', '4', '4'],
  };
  const optionalParams = extendWithNonNullables(
    initialOptionalParams,
    initialFiltersState.current,
  );

  expect(optionalParams.contexts).toStrictEqual(['Casual', 'Formal']);
  expect(optionalParams.fits).toBeUndefined();
  expect(optionalParams.sizes).toBeUndefined();
  expect(Object.keys(optionalParams).length).toBe(3);
  expect(optionalParams === initialOptionalParams).toBeFalsy();
});

test('instance should be created according to template and be filled with data', () => {
  const heap = db.facets;
  const created = extractRelevantFacets(heap, initialFiltersState.facets);

  expect(Object.keys(created).length).toBe(8);
  expect(created.sizes?.code === 'sizes').toBeTruthy;
});
