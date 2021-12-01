import React from "react"
import { ArrowNavSpritesMap } from "./ArrowNavSpritesMap"
import { AuthSpritesMap } from "./AuthSpritesMap"
import { CommerceSpritesMap } from "./CommerceSpritesMap"
import { CommonUISpritesMap } from "./CommonUISpritesMap"
import { FeatureSpritesMap } from "./FeatureSpritesMap"
import { FilterSpritesMap } from "./FilterSpritesMap"
import { LayoutSpritesMap } from "./LayoutSpritesMap"

export const SpritesMap = () => {
    return <>
        <ArrowNavSpritesMap />
        <FilterSpritesMap />
        <CommonUISpritesMap />
        <AuthSpritesMap />
        <FeatureSpritesMap />
        <CommerceSpritesMap />
        <LayoutSpritesMap />
    </>
}