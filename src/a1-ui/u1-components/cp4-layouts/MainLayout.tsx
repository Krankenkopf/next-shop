import Head from "next/head"
import { FC, useEffect } from "react"
import { TCategoriesState } from "../../../a2-bll/categories-reducer"
import { Footer } from "../cp2-modules/Footer/Footer"
import { Header } from "../cp2-modules/Header/Header"
import { Modals, TModal } from "../cp2-modules/Modal/Modals"

type TMainLayoutProps = {
    title: string
    categories: TCategoriesState
    history: Array<string>
}

export const MainLayout: FC<TMainLayoutProps> = ({ children, title = 'Noname Shop', categories, history }: any) => {   
    
    return (
        <>
            <Head>
                <title>{title} | Noname Shop</title>
                <meta name="keywords" content="some_keyword,another_keyword"></meta>
                <meta name="description" content="some description"></meta>
                <meta charSet="utf-8" />
            </Head>
            <Header categories={categories}/>
            <main className="wrapper _container">
                {children}
            </main>
            <Footer />
            <Modals /> 
        </>
    )
}
