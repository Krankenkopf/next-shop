import Head from "next/head"
import Router from "next/router"
import React from "react"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { Usp } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Usp"
import { CartOverview } from "../../src/a1-ui/u1-components/cp2-modules/Cart/CartOverview"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"


export default function Cart({history}: any) {
    const categories = useAppSelector(state => state.categories)
    return (
        <MainLayout title={"Cart"} categories={categories} history={history}>
            <Usp />
            <CartOverview />
        </MainLayout>
    )
}