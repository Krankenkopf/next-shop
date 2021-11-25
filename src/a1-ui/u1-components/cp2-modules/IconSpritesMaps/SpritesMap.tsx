import React from "react"
import { ArrowNavSpritesMap } from "./ArrowNavSpritesMap"
import { AuthSpritesMap } from "./AuthSpritesMap"
import { CommerceSpritesMap } from "./CommerceSpritesMap"
import { CommonUISpritesMap } from "./CommonUISpritesMap"
import { FeatureSpritesMap } from "./FeatureSpritesMap"

export const SpritesMap = () => {
    return <>
        <ArrowNavSpritesMap />
        <CommonUISpritesMap />
        <AuthSpritesMap />
        <FeatureSpritesMap />
        <CommerceSpritesMap />
    </>
}