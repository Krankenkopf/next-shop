import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { Sidebar } from "../cp2-modules/Sidebar/Sidebar"
import { Header } from "../cp2-modules/Header/Header"
import { Footer } from "../cp2-modules/Footer/Footer"
import { Modals, TModal } from "../cp2-modules/Modal/Modals"
import { FC, useCallback, useState } from "react"
import { TCategory } from "../../../a0-common/c1-types/t1-instance"

type TProductLayoutProps = {
    title: string
    category?: TCategory
    rootCategoryName?: string
}

export const ProductLayout: FC<TProductLayoutProps> =
    ({ children, title = 'Noname Shop', category, rootCategoryName }) => {
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
            <main className="wrapper__products">
                <Sidebar rootCategoryName={rootCategoryName} category={category}/>
                {children}
            </main>
            <Modals onClose={() => setModal(null)} modal={modal} revealModal={revealModal} />
            <Footer />
        </>
    )
}