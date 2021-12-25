import React, { useCallback, useMemo } from "react"
import { Nullable } from "../../../../a0-common/c1-types/t1-instance"
import { useAppSelector } from "../../../../a0-common/c3-hooks"
import { TAppState } from "../../../../a2-bll/app-reducer"
import { TUserData } from "../../../../a2-bll/auth-reducer"
import { DebugPanel } from "./DebugPanel"
import {parseCookies} from 'nookies'
import { getKeys } from "../../../../a0-common/c4-utils/state"


export const DebugContainer = () => {
    if (typeof window !== 'object') {
        return null
    }
    const userData = useAppSelector<Nullable<TUserData>>(state => state.auth.userData)
    const appData = useAppSelector<Nullable<TAppState>>(state => state.app)
    const cartItemsCount = useAppSelector(state => state.cart.products.length)
    const userKeys = useMemo(() => [
        "user id", "email", "access level", "LS access token", "LS refresh token"
    ], [])
    
    const getTokens = () => {
        let accessToken = localStorage.getItem("NonameShopAccessToken")?.split(".")[2]
        let refreshToken = localStorage.getItem("NonameShopRefreshToken")?.split(".")[2]
        return {accessToken, refreshToken}
    }
    
    const userValues = useMemo(() => [
        userData?.id, userData?.email,
        userData?.accessLevel, getTokens().accessToken, getTokens().refreshToken
    ], [userData])
    const cookies = parseCookies()
    const cookiesKeys = getKeys(cookies)
    const cookiesValues = Object.values(cookies)
    const appKeys = useMemo(() => ["status", "error", "initialization complete", "need update"], [])
    const appValues = useMemo(() => [appData?.status, appData?.error, appData?.isInitialized, appData?.isNeedUpdate], [appData])
    const cartKey = "cart items count"
    const cartValue = cartItemsCount

    return <DebugPanel keys={[...userKeys, ...cookiesKeys, ...appKeys, cartKey]}
        values={[...userValues, ...cookiesValues, ...appValues, cartValue]} />
}