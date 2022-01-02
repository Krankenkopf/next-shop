import Head from "next/head"
import Router from "next/router"
import React from "react"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"

export default function About({history}: any) {
    const categories = useAppSelector(state => state.categories)
    const rest = {
        "freeTextSearch": "null",
        "categoryCode": "men_all",
        "baseUrl": "https://www2.hm.com"
    }
    return <MainLayout title="About" categories={categories} history={history}>
        <Head>
            <title>About | Noname Shop</title>
        </Head>
        <h1>About</h1>
        <button onClick={() => Router.push("/")}>Go to main</button>
    </MainLayout>
}