import Head from "next/head"
import Router from "next/router"
import { MainLayout } from "../../p-app/a1-ui/u1-components/cp4-layouts/MainLayout"

export default function About() {
    const rest = {
        "freeTextSearch": "null",
        "categoryCode": "men_all",
        "baseUrl": "https://www2.hm.com"
    }
    return <MainLayout>
        <Head>
            <title>About | Noname Shop</title>
        </Head>
        <h1>About</h1>
        <button onClick={() => Router.push("/")}>Go to main</button>
    </MainLayout>
}