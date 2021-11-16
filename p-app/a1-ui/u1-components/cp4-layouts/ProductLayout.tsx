import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { Sidebar } from "../cp2-modules/Sidebar/Sidebar"
import { Header } from "../cp2-modules/Header/Header"
import { Footer } from "../cp2-modules/Footer/Footer"
import { Modals, TModal } from "../cp2-modules/Modal/Modals"
import { useCallback, useState } from "react"
import { useEffect } from "hoist-non-react-statics/node_modules/@types/react"

export const ProductLayout = ({ children, title = 'Noname Shop' }: any) => {
    const router = useRouter()
    
    const [modal, setModal] = useState<TModal>(null);
    const revealModal = useCallback((modalType: TModal) => setModal(modalType), [])

    return (
        <>
            <Head>
                <title>{title} | Noname Shop</title>
                <meta name="keywords" content="some_keyword,another_keyword"></meta>
                <meta name="description" content="some description"></meta>
                <meta charSet="utf-8" />
            </Head>
            <Header revealModal={revealModal}/>
            <main>
                <Sidebar />
                {children}
            </main>
            <Modals onClose={() => setModal(null)} modal={modal} revealModal={revealModal} />
            <Footer />
        </>
    )
}