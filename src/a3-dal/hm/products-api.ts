import { TGetProductsListRequestOptionalData, TGetProductsListRequestRequiredData } from "../../a0-common/c1-types/t2-request"
import { TProductsResponse } from "../../a0-common/c1-types/t3-response/TProductsResponse"
import { HMAPI } from "../api"


export const ProductsAPI = {
    getList(required: TGetProductsListRequestRequiredData, optional: TGetProductsListRequestOptionalData) {
        //console.log({ params: { ...required } });
        
        return (
            HMAPI.get<TProductsResponse>(`products/list`, {params: {...required, ...optional}})
        )
    },
}



