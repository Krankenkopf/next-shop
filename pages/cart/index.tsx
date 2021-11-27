import Head from "next/head"
import Router from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { LandingLayout } from "../../src/a1-ui/u1-components/cp4-layouts/LandingLayout"
import { TAuthState } from "../../src/a2-bll/auth-reducer"
import { TState } from "../../src/a2-bll/store"

export default function Cart() {
    const { userData } = useSelector<TState, TAuthState>((state) => state.auth)
    const cartId = userData ? userData.id : ""
    return (
        <LandingLayout title={"Cart"}>
            <Head>
                <title>Cart | Noname Shop</title>
            </Head>
            <main>
                <h4>Cart</h4>
                <p>{cartId}</p>
            </main>
        </LandingLayout>
    )
}