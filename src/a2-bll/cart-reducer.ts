import { TProduct } from "../a0-common/c1-types/t1-instance/TProduct"

const initialState = {
    products: [] as Array<TProduct>,
}

export const cartReducer =
    (state: TCartState = initialState, action: TCartActions): TCartState => {
switch (action.type) {
    case cartActionVariables.ADD_ITEM:
        return {
            ...state,
            products: [...state.products, action.payload.product]
        }
    case cartActionVariables.REMOVE_ITEM:
        return {
            ...state,
            products: state.products.filter(product => product.code !== action.payload.code)
        }
    case cartActionVariables.CLEAR_CART:
        return {
            ...initialState
        }
    default: return state
    }
}
// actions
export const addItem = (product: TProduct) => (
{
    type: cartActionVariables.ADD_ITEM,
    payload: {product}
    } as const)
export const removeItem = (code: string) => (
    {
        type: cartActionVariables.REMOVE_ITEM,
        payload: { code }
    } as const)
export const clearCart = () => (
    {
        type: cartActionVariables.CLEAR_CART,
    } as const)

// types
export type TCartState = typeof initialState
export type TCartActions =
    ReturnType<typeof addItem> |
    ReturnType<typeof removeItem> |
    ReturnType<typeof clearCart>

// variables
const cartActionVariables = {
    ADD_ITEM: "CART/ADD-ITEM" as const,
    REMOVE_ITEM: "CART/REMOVE-ITEM" as const,
    CLEAR_CART: "CART/CLEAR-CART" as const,
}
