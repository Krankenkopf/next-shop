import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { me } from "../../../a2-bll/auth-reducer"
import { TState } from "../../../a2-bll/store"
import { Footer } from "../cp2-modules/Footer/Footer"
import { Header } from "../cp2-modules/Header/Header"
import { Modals, TModal } from "../cp2-modules/Modal/Modals"

export const LandingLayout = ({ children, title = 'Noname Shop' }: any) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const isInitialized = useSelector<TState, boolean>(state => state.app.isInitialized)
    const [modal, setModal] = useState<TModal>(null);

    useEffect(() => {
        dispatch(me())
    }, [dispatch])

    


    const revealModal = useCallback((modalType: TModal) => {
        setModal(modalType)
    }, [modal])
    const closeModal = useCallback(() => setModal(null), [])

    if (!isInitialized) {
        return <div
            style={{ position: 'fixed', top: '50%', textAlign: 'center', width: '100%' }}>
            !!!!!!!!!
        </div>
    }

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
            <Footer />
            <Modals onClose={closeModal} modal={modal} revealModal={revealModal} />
            
            
        </>
    )
}