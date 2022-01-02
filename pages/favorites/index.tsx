import Head from "next/head"
import Router from "next/router"
import React from "react"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { UnderConstruction } from "../../src/a1-ui/u1-components/cp1-elements/el19-UnderConstruction/UnderConstruction"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"

export default function Favorites({ history }: any) {
    const categories = useAppSelector(state => state.categories)
    return (
        <MainLayout title={"Favorites"} categories={categories} history={history}>
            <UnderConstruction />
        </MainLayout>
    )
}