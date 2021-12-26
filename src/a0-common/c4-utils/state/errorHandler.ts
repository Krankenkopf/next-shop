import {Dispatch} from "redux"
import { setAppStatus, setError, TAppActions } from "../../../a2-bll/app-reducer";


export const handleServerNetworkError = (e: any, type: "auth" | "content" | "user data", dispatch: ErrorUtilsDispatchType) => {
    const error = e.response ? e.response.data.error : (e.message);
    dispatch(setError(error))
    dispatch(setAppStatus(`${type} failed`))
    console.log('Error: ', e.message)
    if (type === ("auth" || "user data")) {
        setTimeout(() => {
            dispatch(setAppStatus("idle"))
        }, 3000)
    }
}

type ErrorUtilsDispatchType = Dispatch<TAppActions>