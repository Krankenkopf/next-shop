import { Nullable } from "../a0-common/c1-types/t1-instance"
import { TProduct } from "../a0-common/c1-types/t1-instance/TProduct"

const initialState = {
    products: null as Nullable<TProduct>
}

export const cartReducer =
(state: TCartState = initialState, action: TCartActions): TCartState => {
switch (action.type) {
    case cartActionVariables.SET_:
        return {
            ...state,
            ...action.payload
        }
    default: return state
    }
}
// actions
export const setCart = () => (
{
    type: cartActionVariables.SET_,
    payload: {}
} as const)

// types
export type TCartState = typeof initialState
export type TCartActions =
    ReturnType<typeof setCart>

// variables
const cartActionVariables = {
    SET_: "" as const,
}