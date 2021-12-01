import { configureOptionalParams } from './../../a0-common/c4-utils/state/index'
import { Nullable } from '../../a0-common/c1-types/t1-instance';
import { TGetProductsListRequestOptionalData, TSortValue } from '../../a0-common/c1-types/t2-request';
import { TFilterKey, TSortByKey } from '../filters-reducer';

const initialFiltersState = {
    current: {
        sizes: null as Nullable<Array<string>>,
        sortBy: "ascPrice" as TSortValue,
        contexts: ["Casual", "Formal"] as Nullable<Array<string>>,
        concepts: null as Nullable<Array<string>>,
        collection: null as Nullable<Array<string>>,
        qualities: null as Nullable<Array<string>>,
        fits: null as Nullable<Array<string>>,
        descriptiveLengths: null as Nullable<Array<string>>,
        functions: null as Nullable<Array<string>>,
        colorWithNames: null as Nullable<Array<string>>,
    },
    facets: {
        sizes: null as Nullable<Array<string>>,
        sortBy: "stock" as TSortValue,
        contexts: null as Nullable<Array<string>>,
        concepts: null as Nullable<Array<string>>,
        collection: null as Nullable<Array<string>>,
        qualities: null as Nullable<Array<string>>,
        fits: null as Nullable<Array<string>>,
        descriptiveLengths: null as Nullable<Array<string>>,
        functions: null as Nullable<Array<string>>,
        colorWithNames: null as Nullable<Array<string>>,
    }

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
    const initialOptionalParams: TGetProductsListRequestOptionalData = {
        categories: ["2", "4", "4"],
    }
    const optionalParams = configureOptionalParams(initialOptionalParams, initialFiltersState)
    console.log(optionalParams);
    expect(Object.keys(optionalParams).length)
        .toBe(Object.keys(initialOptionalParams).length
        + Object.keys(initialFiltersState.current).filter(key => initialFiltersState.current[key as TSortByKey | TFilterKey]).length);
    expect(optionalParams.contexts).toStrictEqual(["Casual", "Formal"]);
    expect(optionalParams.sortBy).toBe("ascPrice");
    expect(optionalParams === initialOptionalParams).toBeFalsy();
});
