import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer, TAppActions} from "./app-reducer";
import {authReducer, TAuthActions} from "./auth-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// types
export type TStore = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, TStore, unknown, TActions>
export type TActions =
    TAuthActions
    | TAppActions
