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
    category?: TCategory
    rootCategoryName?: string
}

export const ProductLayout: FC<TProductLayoutProps> =
    ({ children, category, rootCategoryName }) => {
    const router = useRouter()
    return (
            <div className="wrapper__products">
                <Sidebar rootCategoryName={rootCategoryName} category={category}/>
                {children}
            </div>
    )
}