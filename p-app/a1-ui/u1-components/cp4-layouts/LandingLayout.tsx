import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { Header } from "../cp2-modules/Header/Header"

export const LandingLayout = ({ children, title = 'Noname Shop' }: any) => {
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
                {children}
            </main>
        </>
    )
}