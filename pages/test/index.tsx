import Head from "next/head"
import React, { useEffect, useRef, useState } from "react"
import { ArrowNavSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/ArrowNavSpritesMap"
import { AuthSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/AuthSpritesMap"
import { CommerceSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/CommerceSpritesMap"
import { CommonUISpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/CommonUISpritesMap"
import { CRUDSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/CRUDSpritesMap"
import { CurrencySpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/CurrencySpritesMap"
import { FeatureSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/FeatureSpritesMap"
import { FilterSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/FilterSpritesMap"
import { IconSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/IconSpritesMap"
import { LayoutSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/LayoutSpritesMap"
import { LocalizationSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/LocalizationSpritesMap"
import { MiscSpritesMap } from "../../p-app/a1-ui/u1-components/cp2-modules/IconSpritesMaps/MiscSpritesMap"
import { LandingLayout } from "../../p-app/a1-ui/u1-components/cp4-layouts/LandingLayout"

export default function Test() {
    const [icons, setIcons] = useState<Array<JSX.Element>>([])
    const [navIcons, setNavIcons] = useState<Array<JSX.Element>>([])
    const [authIcons, setAuthIcons] = useState<Array<JSX.Element>>([])
    const [filterIcons, setFilterIcons] = useState<Array<JSX.Element>>([])
    const [commerceIcons, setCommerceIcons] = useState<Array<JSX.Element>>([])
    const [uiIcons, setUIIcons] = useState<Array<JSX.Element>>([])
    const [featureIcons, setFeatureIcons] = useState<Array<JSX.Element>>([])
    const [localizationIcons, setLocalizationIcons] = useState<Array<JSX.Element>>([])
    const [crudIcons, setCRUDIcons] = useState<Array<JSX.Element>>([])
    const [layoutIcons, setLayoutIcons] = useState<Array<JSX.Element>>([])
    const [currencyIcons, setCurrencyIcons] = useState<Array<JSX.Element>>([])
    const [brandIcons, setBrandIcons] = useState<Array<JSX.Element>>([])
    const [miscIcons, setMiscIcons] = useState<Array<JSX.Element>>([])


    useEffect(() => {
        const toJSX = (iconSprite: HTMLElement) => {
            let icons: Array<JSX.Element> = []
            let svgElements = iconSprite.querySelectorAll("symbol")
            console.log(`${iconSprite.id} icons: ${svgElements.length}`);
            svgElements.forEach(i => {
                icons.push(
                    <div key={`${i.id}`} className="icon test" style={{ display: "inline-block", verticalAlign: "top", width: "70px", margin: "10px" }}>
                        <div className="icon__container test">
                            <svg className="icon__svg test" style={{ width: "50px", height: "50px", margin: "0 10px" }}
                                name={`${i.id}`}>
                                <use id={`${i.id}`} xlinkHref={`#${i.id}`}></use>
                            </svg>
                        </div>
                        <div style={{ fontSize: "70%" }}>
                            {`${i.id}`}
                        </div>
                    </div>
                )
            })
            return icons
        }

        let navArrowsMap = document.getElementById("nav-arrows")
        let authIconsMap = document.getElementById("auth-icons")
        let filterIconsMap = document.getElementById("filter-icons")
        let commerceIconsMap = document.getElementById("commerce-icons")
        let uiIconsMap = document.getElementById("ui-icons")
        let featureIconsMap = document.getElementById("feature-icons")
        let localizationIconsMap = document.getElementById("localization-icons")
        let crudIconsMap = document.getElementById("crud-icons")
        let layoutIconsMap = document.getElementById("layout-icons")
        let currencyIconsMap = document.getElementById("currency-icons")
        let brandIconsMap = document.getElementById("brand-icons")
        let miscIconsMap = document.getElementById("misc-icons")

        navArrowsMap && setNavIcons(toJSX(navArrowsMap))
        authIconsMap && setAuthIcons(toJSX(authIconsMap))
        filterIconsMap && setFilterIcons(toJSX(filterIconsMap))
        commerceIconsMap && setCommerceIcons(toJSX(commerceIconsMap))
        uiIconsMap && setUIIcons(toJSX(uiIconsMap))
        featureIconsMap && setFeatureIcons(toJSX(featureIconsMap))
        localizationIconsMap && setLocalizationIcons(toJSX(localizationIconsMap))
        crudIconsMap && setCRUDIcons(toJSX(crudIconsMap))
        layoutIconsMap && setLayoutIcons(toJSX(layoutIconsMap))
        currencyIconsMap && setCurrencyIcons(toJSX(currencyIconsMap))
        brandIconsMap && setBrandIcons(toJSX(brandIconsMap))
        miscIconsMap && setMiscIcons(toJSX(miscIconsMap))
    }, []
    )
    
    useEffect(() => {
        let nested = document.querySelector("use")
        if (nested && icons.length === 0) {
            const toJSX = (iconSprite: HTMLElement) => {
                let icons: Array<JSX.Element> = []
                let svgElements = iconSprite.querySelectorAll("symbol")
                console.log(`${iconSprite.id} icons: ${svgElements.length}`);
                let alreadyNested = document.getElementsByTagName("use")
                console.log(alreadyNested);
                
                svgElements.forEach(i => {
                    let nestedFlag = false
                    for (let j = 0; j < alreadyNested.length; j++) {
                        if (i.id === alreadyNested[j].id) {
                            console.log(`${i.id} ${alreadyNested[j].id}`);
                            nestedFlag = true
                        }
                    }
                    let className = "icon test"
                    if (nestedFlag) {
                        className = `${className} dimmed`
                    }
                    icons.push(
                        <div key={`${i.id}`} className={className} style={{ display: "inline-block", verticalAlign: "top", width: "70px", margin: "10px" }}>
                            <div className="icon__container test">
                                <svg className={`icon-${i.id} test`} style={{ width: "50px", height: "50px", margin: "10px" }}
                                    name={`${i.id}`}>
                                    <use id={`${i.id}`} xlinkHref={`#${i.id}`}></use>
                                </svg>
                            </div>
                            <div style={{ fontSize: "70%" }}>
                                {`${i.id}`}
                            </div>
                        </div>
                    )
                })
                return icons
            }
            let mainMap = document.getElementById("main-sprite")
            mainMap && setIcons(toJSX(mainMap))
        }
    }, [navIcons])
    return (
        <LandingLayout>
            <Head>
                <title>Test Page| Noname Shop</title>
            </Head>
            <IconSpritesMap />
            <ArrowNavSpritesMap />
            <AuthSpritesMap />
            <CommerceSpritesMap />
            <CommonUISpritesMap />
            <CRUDSpritesMap />
            <CurrencySpritesMap />
            <FeatureSpritesMap />
            <FilterSpritesMap />
            <LayoutSpritesMap />
            <LocalizationSpritesMap />
            <MiscSpritesMap />
            <main>
                <h2 style={{ textAlign: "center" }}>All</h2>
                {icons}
                <hr />
                <h2 style={{ textAlign: "center" }}>Navigation Arrows</h2>
                {navIcons}
                <h2 style={{ textAlign: "center" }}>Authentication Icons</h2>
                {authIcons}
                <h2 style={{ textAlign: "center" }}>Commerce Icons</h2>
                {commerceIcons}
                <h2 style={{ textAlign: "center" }}>Common UI Icons</h2>
                {uiIcons}
                <h2 style={{ textAlign: "center" }}>Data Manipulations Icons</h2>
                {crudIcons}
                <h2 style={{ textAlign: "center" }}>Currency Icons</h2>
                {currencyIcons}
                <h2 style={{ textAlign: "center" }}>Feature Icons</h2>
                {featureIcons}
                <h2 style={{ textAlign: "center" }}>Filter Icons</h2>
                {filterIcons}
                <h2 style={{ textAlign: "center" }}>Layout Toggle Icons</h2>
                {layoutIcons}
                <h2 style={{ textAlign: "center" }}>Languages and Regions Icons</h2>
                {localizationIcons}
                <h2 style={{ textAlign: "center" }}>Miscellaneous Icons</h2>
                {miscIcons} 
            </main>
        </LandingLayout>
    )
}