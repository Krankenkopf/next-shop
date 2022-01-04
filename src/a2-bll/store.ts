import { layoutReducer, TLayoutActions, TLayoutState } from './layout-reducer'
import { sortReducer, TSortActions, TSortState } from './sort-reducer'
import { TProductsActions, TProductsState, productsReducer } from './products-reducer'
import { cartReducer, TCartActions, TCartState } from './cart-reducer'
import { regionsReducer, TRegionsActions, TRegionsState } from './regions-reducer'
import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Dispatch, Store } from "redux";
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, TAppActions, TAppState} from "./app-reducer";
import {authReducer, TAuthActions, TAuthState} from "./auth-reducer";
import { categoriesReducer, TCategoriesActions, TCategoriesState } from "./categories-reducer";
import { navigationReducer, TNavigationActions, TNavigationState } from "./navigation-reducer";
import { filtersReducer, TFiltersActions, TFiltersState } from "./filters-reducer";
import { productReducer, TProductActions, TProductState } from './product-reducer';

const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware),
    // other store enhancers if any
)

const rootReducer = (state: TState | undefined, action: AnyAction): TState => {
    switch (action.type) {
        case HYDRATE:
            const nextState = {
                ...state, // use previous state
                ...action.payload, // apply delta from hydration
            }
            //if (state?.products.products) nextState.products.products = state.products.products // preserve value on client side navigation
            //if (state?.navigation.category) nextState.navigation.category = state.navigation.category // preserve value on client side navigation
            if (state?.categories) nextState.categories = state.categories
            if (state?.app) {
                nextState.app.isInitialized = state.app.isInitialized
                nextState.app.isCSR = state.app.isCSR
            }
            if (state?.layout) nextState.layout = state.layout
            return nextState

        default: {
            const combinedReducer = combineReducers({
                app: appReducer,
                auth: authReducer,
                cart: cartReducer,
                categories: categoriesReducer,
                filters: filtersReducer,
                layout: layoutReducer,
                navigation: navigationReducer,
                products: productsReducer,
                product: productReducer,
                regions: regionsReducer,
                sort: sortReducer,              
            })
            return combinedReducer(state, action);
        }
    }
}

const initStore = () => createStore(rootReducer, enhancer)

export const wrapper = createWrapper<Store<TState>>(initStore, { debug: false });

// types
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TState, unknown, TActions>
export type AppThunkDispatch = ThunkDispatch<TState, void, TActions>
export type RootState = ReturnType<typeof rootReducer>
export type TState = {
    app: TAppState,
    auth: TAuthState,
    cart: TCartState
    categories: TCategoriesState
    filters: TFiltersState
    layout: TLayoutState
    navigation: TNavigationState
    products: TProductsState
    product: TProductState
    regions: TRegionsState
    sort: TSortState
}
export type TActions = TAppActions
    | TAuthActions | TCartActions | TCategoriesActions
    | TFiltersActions | TLayoutActions | TNavigationActions
    | TProductsActions | TProductActions
    | TRegionsActions  | TSortActions
