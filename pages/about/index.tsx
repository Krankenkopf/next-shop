import Head from "next/head"
import Router from "next/router"
import React from "react"
import { LandingLayout } from "../../src/a1-ui/u1-components/cp4-layouts/LandingLayout"

export default function About() {
    const rest = {
        "freeTextSearch": "null",
        "categoryCode": "men_all",
        "baseUrl": "https://www2.hm.com"
    }
    return <LandingLayout>
        <Head>
            <title>About | Noname Shop</title>
        </Head>
        <h1>About</h1>
        <button onClick={() => Router.push("/")}>Go to main</button>
    </LandingLayout>
}