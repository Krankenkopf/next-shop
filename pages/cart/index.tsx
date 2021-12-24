import Head from "next/head"
import Router from "next/router"
import React from "react"
import { useSelector } from "react-redux"
import { Usp } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Usp"
import { CartOverview } from "../../src/a1-ui/u1-components/cp2-modules/Cart/CartOverview"
import { LandingLayout } from "../../src/a1-ui/u1-components/cp4-layouts/LandingLayout"
import { TAuthState } from "../../src/a2-bll/auth-reducer"
import { TState } from "../../src/a2-bll/store"

export default function Cart() {
    return (
        <LandingLayout title={"Cart"}>
            <Head>
                <title>Cart | Noname Shop</title>
            </Head>
            <main>
                <Usp />
                <CartOverview />
            </main>
        </LandingLayout>
    )
}