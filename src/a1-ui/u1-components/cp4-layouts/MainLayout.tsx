import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { TCategoriesState } from "../../../a2-bll/categories-reducer"
import { TState } from "../../../a2-bll/store"
import { Preloader } from "../cp1-elements/el11-Preloader/Preloader"
import { Footer } from "../cp2-modules/Footer/Footer"
import { Header } from "../cp2-modules/Header/Header"
import { Modals, TModal } from "../cp2-modules/Modal/Modals"

type TMainLayoutProps = {
    title: string
    categories: TCategoriesState
    history: Array<string>
}

export const MainLayout: FC<TMainLayoutProps> = ({ children, title = 'Noname Shop', categories, history }: any) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isInitialized = useSelector<TState, boolean>(state => state.app.isInitialized)
    useEffect(() => {
        console.log(history);
    }, [history])
    
    
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
            <div style={{
                position: 'fixed',
                visibility: isInitialized ? "hidden" : "visible",
                top: '0',
                textAlign: 'center',
                width: '100%',
                height: "100vh",
                backgroundColor: "#dddfffef", zIndex: 20
            }}>
                <Preloader isVisible={!isInitialized}/>
            </div>
            <Modals />
            
            
        </>
    )
}