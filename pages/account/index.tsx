import Head from "next/head"
import Router from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { LandingLayout } from "../../src/a1-ui/u1-components/cp4-layouts/LandingLayout"
import { TAuthState } from "../../src/a2-bll/auth-reducer"
import { TState } from "../../src/a2-bll/store"

export default function Account() {
    const { userData } = useSelector<TState, TAuthState>((state) => state.auth)
    const { id, accessLevel, email } = userData ? userData : { id: "Not initialized", accessLevel: "Not initialized" as const, email: "Not registered"}
    
    return (
        <LandingLayout title={"Account"}>
            <Head>
                <title>My Account | Noname Shop</title>
            </Head>
            <main>
                <h3>Account</h3>
                <p>id: {id}</p>
                <p>email: {email }</p>
                <p>Access Level: {accessLevel}</p>
            </main>
        </LandingLayout>
    )
}
