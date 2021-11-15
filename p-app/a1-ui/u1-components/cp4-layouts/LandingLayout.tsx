import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { useCallback, useState } from "react"
import { Footer } from "../cp2-modules/Footer/Footer"
import { Header } from "../cp2-modules/Header/Header"
import { AuthSpritesMap } from "../cp2-modules/IconSpritesMaps/AuthSpritesMap"
import { CommerceSpritesMap } from "../cp2-modules/IconSpritesMaps/CommerceSpritesMap"
import { CommonUISpritesMap } from "../cp2-modules/IconSpritesMaps/CommonUISpritesMap"
import { FeatureSpritesMap } from "../cp2-modules/IconSpritesMaps/FeatureSpritesMap"
import { Modals, TModal } from "../cp2-modules/Modal/Modals"

export const LandingLayout = ({ children, title = 'Noname Shop' }: any) => {
    const router = useRouter()

    const [modal, setModal] = useState<TModal>(null);
    const revealModal = useCallback((modalType: TModal) => {
        setModal(modalType)
    }, [modal])
    const closeModal = useCallback(() => setModal(null), [])

    return (
        <>
            <Head>
                <title>{title} | Noname Shop</title>
                <meta name="keywords" content="some_keyword,another_keyword"></meta>
                <meta name="description" content="some description"></meta>
                <meta charSet="utf-8" />
            </Head>
            <CommonUISpritesMap />
            <AuthSpritesMap />
            <FeatureSpritesMap />
            <CommerceSpritesMap />
            <Header revealModal={revealModal} />
            <main className="wrapper _container">
                {children}
            </main>
            <Footer />
            <Modals onClose={closeModal} modal={modal} revealModal={revealModal} />
            
            
        </>
    )
}