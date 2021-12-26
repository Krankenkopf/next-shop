import { TCheckedProduct } from './../../a0-common/c1-types/t1-instance/TCheckedProduct'
import { krankAPI, TResponse } from "../api";

export const userAPI = {
    getCartItems() {
        return (
            krankAPI.get<TResponse<Array<TCheckedProduct>>>(`cart`).then(response => {
                return { data: response.data.data, info: response.data.info }
            })
        )
    },

    addCartItem<T>(product: T) {
        return (
            krankAPI.post<TResponse<TCheckedProduct>>(`cart`, {product}).then(response => {
                return { data: response.data.data, info: response.data.info }
            })
        )
    },

    editCartItem<T>(product: T) {
        return (
            krankAPI.put<TResponse<TCheckedProduct>>(`cart`, { product }).then(response => {
                return { data: response.data.data, info: response.data.info }
            })
        )
    },

    deleteCartItem(code: string) {
        return (
            krankAPI.delete<TResponse<TCheckedProduct>>(`cart`, { params: { code } }).then(response => {
                return { data: response.data.data, info: response.data.info }
            })
        )
    },
}
