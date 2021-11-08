import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { useCallback, useState } from "react"
import { Footer } from "../cp2-modules/Footer/Footer"
import { Header } from "../cp2-modules/Header/Header"
import { Modals, TModal } from "../cp2-modules/Modal/Modals"

export const LandingLayout = ({ children, title = 'Noname Shop' }: any) => {
    const router = useRouter()

    const [modal, setModal] = useState<TModal>(null);
    const revealModal = useCallback((modalType: TModal) => {
        setModal(modalType)
    }, [modal])
    const closeModal = useCallback(() => setModal(null), [])
    console.log("Layout");
    console.log(modal);

    return (
        <>
            <Head>
                <title>{title} | Noname Shop</title>
                <meta name="keywords" content="some_keyword,another_keyword"></meta>
                <meta name="description" content="some description"></meta>
                <meta charSet="utf-8" />
            </Head>
                <Header revealModal={revealModal} />
                <main className="wrapper _container">
                    {children}
                </main>
                <Modals onClose={closeModal} modal={modal} revealModal={revealModal} />
                <Footer />
        </>
    )
}