import { TFacets } from './../filters-reducer'
import { extendWithNonNullables, extractRelevantFacets } from './../../a0-common/c4-utils/state/index'
import { Nullable } from '../../a0-common/c1-types/t1-instance';
import { TGetProductsListRequestOptionalCategories, TGetProductsListRequestOptionalData } from '../../a0-common/c1-types/t2-request';
import { TFilterKey } from '../filters-reducer';
import db from "./test__db.json"

const initialFiltersState = {
    current: {
        sizes: null as Nullable<Array<string>>,
        contexts: ["Casual", "Formal"] as Nullable<Array<string>>,
        concepts: null as Nullable<Array<string>>,
        collection: null as Nullable<Array<string>>,
        qualities: null as Nullable<Array<string>>,
        fits: null as Nullable<Array<string>>,
        functions: null as Nullable<Array<string>>,
        colorWithNames: null as Nullable<Array<string>>,
    },
    facets: {
        sizes: null,
        contexts: null,
        concepts: null,
        collection: null,
        qualities: null,
        fits: null,
        functions: null,
        colorWithNames: null,
    } as TFacets

}
beforeEach(() => {
    //const id1 = v1();
    //const id2 = v1();
    const startState = [
    //    { id: id1, title: "title", filter: "all" },
    //    { id: id2, title: "title", filter: "all" }
    ]
})

test('not nulled fields should be added', () => {
    const initialOptionalParams: TGetProductsListRequestOptionalCategories = {
        categories: ["2", "4", "4"],
    }
    const optionalParams = extendWithNonNullables(initialOptionalParams, initialFiltersState.current)

    expect(Object.keys(optionalParams).length)
        .toBe(Object.keys(initialOptionalParams).length
        + Object.keys(initialFiltersState.current).filter(key => initialFiltersState.current[key as TFilterKey]).length);
    expect(optionalParams.contexts).toStrictEqual(["Casual", "Formal"]);
    expect(optionalParams.fits).toBeUndefined();
    expect(optionalParams === initialOptionalParams).toBeFalsy();
});

test("instance should be created according to template and be filled with data", () => {
    const heap = db.facets
    const created = extractRelevantFacets(heap, initialFiltersState.facets)
    
    expect(Object.keys(created).length).toBe(8)
    expect(created.sizes?.code === "sizes").toBeTruthy
})
