import Head from "next/head"
import Router from "next/router"
import React from "react"
import { LandingLayout } from "../../src/a1-ui/u1-components/cp4-layouts/LandingLayout"

export default function Account() {
    return (
        <LandingLayout title={"Account"}>
            <Head>
                <title>My Account | Noname Shop</title>
            </Head>
            <main>
                <h3>Account</h3>
            </main>
        </LandingLayout>
    )
}