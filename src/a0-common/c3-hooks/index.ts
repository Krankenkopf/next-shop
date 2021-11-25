import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, TState } from '../../a2-bll/store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<TState> = useSelector