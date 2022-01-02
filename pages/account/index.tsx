import Head from "next/head"
import Router from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"
import { TAuthState } from "../../src/a2-bll/auth-reducer"
import { TState } from "../../src/a2-bll/store"

export default function Account({history}: any) {
    const categories = useAppSelector(state => state.categories)
    const { userData } = useSelector<TState, TAuthState>((state) => state.auth)
    const { id, accessLevel, email } = userData ? userData : { id: "Not initialized", accessLevel: "Not initialized" as const, email: "Not registered"}
    
    return (
        <MainLayout title={"Account"} categories={categories} history={history}>
                <h3>Account</h3>
                <p>id: {id}</p>
                <p>email: {email }</p>
                <p>Access Level: {accessLevel}</p>
        </MainLayout>
    )
}
