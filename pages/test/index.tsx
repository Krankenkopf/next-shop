import Head from "next/head"
import React, { useEffect, useRef, useState } from "react"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { LoginForm } from "../../src/a1-ui/u1-components/cp2-modules/AuthModules/Forms/LoginForm"
import { ArrowNavSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/ArrowNavSpritesMap"
import { AuthSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/AuthSpritesMap"
import { BrandSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/BrandSpritesMap"
import { CommerceSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/CommerceSpritesMap"
import { CommonUISpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/CommonUISpritesMap"
import { CRUDSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/CRUDSpritesMap"
import { CurrencySpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/CurrencySpritesMap"
import { FeatureSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/FeatureSpritesMap"
import { FilterSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/FilterSpritesMap"
import { IconSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/IconSpritesMap"
import { LayoutSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/LayoutSpritesMap"
import { LocalizationSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/LocalizationSpritesMap"
import { MiscSpritesMap } from "../../src/a1-ui/u1-components/cp2-modules/IconSpritesMaps/MiscSpritesMap"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"

export default function Test({ history }: any) {
    const categories = useAppSelector(state => state.categories)

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
            let ids: Array<string> = []
            let svgElements = iconSprite.querySelectorAll("symbol")
            svgElements.forEach(i => {
                icons.push(
                    <div key={`${i.id}`} className="icon test" style={{ display: "inline-block", verticalAlign: "top", width: "70px", margin: "10px" }}>
                        <div className="icon__container test">
                            <svg className="icon__svg test" onClick={() => console.log("click")} style={{ width: "50px", height: "50px", margin: "0 10px" }}
                                name={`${i.id}`}>
                                <use id={`${i.id}`} xlinkHref={`#${i.id}`}></use>
                            </svg>
                        </div>
                        <div style={{ fontSize: "70%" }}>
                            {`${i.id}`}
                        </div>
                    </div>
                )
                ids.push(`"${i.id}"`)
            })
            console.log(`${iconSprite.id} icons: ${svgElements.length}`);
            console.log(`${iconSprite.id} ids: ${ids}`)
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
        miscIconsMap && setMiscIcons(toJSX(miscIconsMap))
        brandIconsMap && setBrandIcons(toJSX(brandIconsMap))

    }, []
    )

    useEffect(() => {
        let nested = document.querySelector("use")
        if (nested && icons.length === 0) {
            const toJSX = (iconSprite: HTMLElement) => {
                let icons: Array<JSX.Element> = []
                let names: Array<string> = []
                let svgElements = iconSprite.querySelectorAll("symbol")
                console.log(`${iconSprite.id} icons: ${svgElements.length}`);
                console.log(`excluding brand icons!`);
                let alreadyNested = document.getElementsByTagName("use")
                //let alreadyNested = document.getElementsByTagName("symbol")
                console.log("--------------------------------")
                console.log("already nested:")

                svgElements.forEach(i => {
                    let nestedFlag = false

                    for (let j = 0; j < alreadyNested.length; j++) {
                        if (i.id === alreadyNested[j].id) {
                            console.log(`${i.id}`);
                            nestedFlag = true
                        }
                    }
                    let className = "icon test"
                    if (nestedFlag) {
                        className = `${className} dimmed`
                    }
                    names.push(i.id)
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
                console.log(names.slice(50, names.length));

                return icons
            }
            let mainMap = document.getElementById("main-sprite")
            mainMap && setIcons(toJSX(mainMap))
        }
    }, [navIcons])
    return (
        <MainLayout title="Test Page" categories={categories} history={history}>
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
            <BrandSpritesMap />
            <main>
                <h2 style={{ textAlign: "center" }}>All</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {icons}
                </div>
                <hr />
                <h2 style={{ textAlign: "center" }}>Navigation Arrows</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {navIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Authentication Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {authIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Commerce Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {commerceIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Common UI Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {uiIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Data Manipulations Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {crudIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Currency Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {currencyIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Feature Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {featureIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Filter Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {filterIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Layout Toggle Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {layoutIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Languages and Regions Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {localizationIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Miscellaneous Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {miscIcons}
                </div>
                <h2 style={{ textAlign: "center" }}>Brand Icons</h2>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {brandIcons}
                </div>
            </main>
        </MainLayout>
    )
}
