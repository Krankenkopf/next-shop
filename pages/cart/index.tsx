import Head from "next/head"
import Router from "next/router"
import React from "react"
import { LandingLayout } from "../../src/a1-ui/u1-components/cp4-layouts/LandingLayout"

export default function Cart() {
    return (
        <LandingLayout title={"Cart"}>
            <Head>
                <title>Cart | Noname Shop</title>
            </Head>
            <main>
                <h4>Cart</h4>
            </main>
        </LandingLayout>
    )
}