import {Dispatch} from "redux"
import { setAppStatus, setError, TAppActions } from "../../../a2-bll/app-reducer";


export const handleServerNetworkError = (e: any, dispatch: ErrorUtilsDispatchType) => {
    const error = e.response ? e.response.data.error : (e.message);
    dispatch(setError(error))
    dispatch(setAppStatus("failed"))
    console.log('Error: ', e.message)
}

type ErrorUtilsDispatchType = Dispatch<TAppActions>