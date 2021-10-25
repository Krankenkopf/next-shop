import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { Sidebar } from "../cp2-modules/Sidebar/Sidebar"
import { Header } from "../cp2-modules/Header/Header"

export const MainLayout = ({ children, title = 'Noname Shop' }: any) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{title} | Noname Shop</title>
                <meta name="keywords" content="some_keyword,another_keyword"></meta>
                <meta name="description" content="some description"></meta>
                <meta charSet="utf-8" />
            </Head>
            <Header />
            <main>
                <Sidebar />
                {children}
            </main>
        </>
    )
}