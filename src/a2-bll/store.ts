import { AnyAction, applyMiddleware, combineReducers, compose, createStore, Store } from "redux";
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer, TAppActions, TAppState} from "./app-reducer";
import {authReducer, TAuthActions, TAuthState} from "./auth-reducer";
import { categoriesReducer, TCategoriesActions, TCategoriesState } from "./categories-reducer";

export type TState = {
    app: TAppState,
    auth: TAuthState,
    categories: TCategoriesState,
};

const composeEnhancers =
    typeof window === 'object' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware),
    // other store enhancers if any
);

const rootReducer = (state: TState | undefined, action: AnyAction): TState => {
    switch (action.type) {
        case HYDRATE:
            const nextState = {
                ...state, // use previous state
                ...action.payload, // apply delta from hydration
            }
            //if (state.categories) nextState.categories = state.categories // preserve count value on client side navigation
            return nextState

        default: {
            const combinedReducer = combineReducers({
                app: appReducer,
                auth: authReducer,
                categories: categoriesReducer,
            });
            return combinedReducer(state, action);
        }
    }
};
export type RootState = ReturnType<typeof rootReducer>;

/* const reducer = (state: TState, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }
        //if (state.categories) nextState.categories = state.categories // preserve count value on client side navigation
        return nextState
    } else {
        return rootReducer(state, action)
    }
} */

// types
export type AppDispatch = typeof initStore
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TState, unknown, TActions>
export type TActions =
    TAuthActions
    | TAppActions
    | TCategoriesActions

const initStore = () => {
    return createStore(rootReducer, enhancer)
}

export const wrapper = createWrapper<Store<TState>>(initStore, { debug: true });
