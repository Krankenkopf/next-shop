import Head from "next/head"
import Router from "next/router"
import React from "react"
import { LandingLayout } from "../../src/a1-ui/u1-components/cp4-layouts/LandingLayout"

export default function Favorites() {
    return (
        <LandingLayout title={"Favorites"}>
            <Head>
                <title>Favorites | Noname Shop</title>
            </Head>
            <main>
                <h3>Favorites</h3>
            </main>
        </LandingLayout>
    )
}