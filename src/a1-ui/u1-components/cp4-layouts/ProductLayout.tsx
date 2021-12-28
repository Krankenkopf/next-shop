import { useRouter } from "next/dist/client/router"
import Head from "next/head"
import { Sidebar } from "../cp2-modules/Sidebar/Sidebar"
import { Header } from "../cp2-modules/Header/Header"
import { Footer } from "../cp2-modules/Footer/Footer"
import { Modals, TModal } from "../cp2-modules/Modal/Modals"
import { FC, useCallback, useEffect, useState } from "react"
import { TCategory } from "../../../a0-common/c1-types/t1-instance"
import { useWindowSize } from "../../../a0-common/c3-hooks/useWindowSize"
import { useAppDispatch, useAppSelector } from "../../../a0-common/c3-hooks"
import { setDeviceType } from "../../../a2-bll/layout-reducer"

type TProductLayoutProps = {
    title: string
    category?: TCategory
    rootCategoryName?: string
}

export const ProductLayout: FC<TProductLayoutProps> =
    ({ children, title = 'Noname Shop', category, rootCategoryName }) => {
        const dispatch = useAppDispatch()
        const { device } = useAppSelector(state => state.layout)
        const router = useRouter()
        const { width } = useWindowSize()
        useEffect(() => {
            //$md1: 1182;
            //$md2: 991.98;
            //$md3: 767.98;
            //$md4: 479.98;
            switch (true) {
                case (width < 479.98): {
                    device !== "mobile" && dispatch(setDeviceType("mobile")); break
                }
                case (width > 479.98 && width <= 767.98): {
                    device !== "tablet" && dispatch(setDeviceType("tablet")); break
                }
                case (width > 767.98 && width <= 991.98): {
                    device !== "laptop" && dispatch(setDeviceType("laptop")); break
                }
                case (width > 991.98): {
                    device !== "desktop" && dispatch(setDeviceType("desktop")); break
                }    
            }
        }, [width])

    return (
        <>
            <Head>
                <title>{title} | Noname Shop</title>
                <meta name="keywords" content="some_keyword,another_keyword"></meta>
                <meta name="description" content="some description"></meta>
                <meta charSet="utf-8" />
            </Head>
            <Header />
            <main className="wrapper__products _container">
                <Sidebar rootCategoryName={rootCategoryName} category={category}/>
                {children}
            </main>
            <Modals />
            <Footer />
        </>
    )
}