import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppThunkDispatch, TState } from '../../a2-bll/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector