import { cartReducer, TCartActions, TCartState } from './cart-reducer'
import { regionsReducer, TRegionsActions, TRegionsState } from './regions-reducer'
import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Store } from "redux";
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer, TAppActions, TAppState} from "./app-reducer";
import {authReducer, TAuthActions, TAuthState} from "./auth-reducer";
import { categoriesReducer, TCategoriesActions, TCategoriesState } from "./categories-reducer";
import { navigationReducer, TNavigationActions, TNavigationState } from "./navigation-reducer";
import { filtersReducer, TFiltersActions, TFiltersState } from "./filters-reducer";

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
            //if (state.categories) nextState.categories = state.categories // preserve value on client side navigation
            return nextState

        default: {
            const combinedReducer = combineReducers({
                app: appReducer,
                auth: authReducer,
                categories: categoriesReducer,
                navigation: navigationReducer,
                filters: filtersReducer,
                regions: regionsReducer,
                cart: cartReducer,
            })
            return combinedReducer(state, action);
        }
    }
}

const initStore = () => createStore(rootReducer, enhancer)

export const wrapper = createWrapper<Store<TState>>(initStore, { debug: false });

// types
export type AppDispatch = typeof initStore
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TState, unknown, TActions>
export type RootState = ReturnType<typeof rootReducer>
export type TState = {
    app: TAppState,
    auth: TAuthState,
    categories: TCategoriesState
    navigation: TNavigationState
    filters: TFiltersState
    regions: TRegionsState
    cart: TCartState
}
export type TActions = TAppActions
    | TAuthActions      | TCategoriesActions    | TNavigationActions
    | TFiltersActions   | TRegionsActions       | TCartActions
    
    


