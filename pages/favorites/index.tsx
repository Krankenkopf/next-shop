import Head from "next/head"
import Router from "next/router"
import React from "react"
import { UnderConstruction } from "../../src/a1-ui/u1-components/cp1-elements/el19-UnderConstruction/UnderConstruction"
import { LandingLayout } from "../../src/a1-ui/u1-components/cp4-layouts/LandingLayout"

export default function Favorites() {
    return (
        <LandingLayout title={"Favorites"}>
            <UnderConstruction />
        </LandingLayout>
    )
}