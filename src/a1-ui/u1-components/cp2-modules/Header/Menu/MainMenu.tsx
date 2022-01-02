import React, { useCallback, useState } from "react"
import { useAppSelector } from "../../../../../a0-common/c3-hooks"
import { getKeys } from "../../../../../a0-common/c4-utils/state"
import { _toLiLinkA } from "../../../../../a0-common/c4-utils/ui"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import { SliderMenu } from "../../SliderMenu/SliderMenu"
import { SliderMenuContainer } from "../../SliderMenu/SliderMenuContainer"

type TMainMenuProps = {

}

export const MainMenu = () => {
    const { isLoggedIn } = useAppSelector((state) => state.auth)
    const categories = useAppSelector(state => state.categories)
    const mainMenuCategoriesTitles = ["Women", "Divided", "Men", "Baby", "Kids", "H&M Home", "Sale"]
    
    const [currentMenu, setCurrentMenu] = useState("");
    const setParentMenu = useCallback((parent: string) => {
        setCurrentMenu(parent)
    }, [currentMenu])
    
    const mappedSliderMenus = getKeys(categories).map((categoryKey, i) => {
        let mappedSubmenus: Array<JSX.Element | null> | undefined
        if (categories[categoryKey] && categories[categoryKey]?.CategoriesArray) {
            mappedSubmenus = categories[categoryKey]?.CategoriesArray?.map((category, i, arr) => {
                let root = `/${categoryKey}/${category.CategoryValue}`
                return category.CategoriesArray
                    ? <li key={category.CategoryValue}>
                        <SliderMenu title={
                            <div className="iconized right">
                                <Icon name="chevron-right" side="right" />
                                <span>
                                    <strong>{category.CatName}</strong>
                                </span>
                            </div>
                        } submenuTitle={
                            <div className="iconized left">
                                <Icon name="chevron-right" side="left" rotate={4} />
                                <span>
                                    <strong>{category.CatName}</strong>
                                </span>
                            </div>
                        } submenu={_toLiLinkA(category.CategoriesArray, root, "mainmenu__sliders__link")}
                            parent={categoryKey} currentParent={currentMenu}/>
                    </li>
                    : null /* if cat has no array, its title will not displayed*/
            })
        }

        return (
            <li key={categoryKey}>
                <SliderMenu title={
                    <div className="iconized right">
                        <Icon name="chevron-right" side="right" />
                        <span>
                            <strong>{mainMenuCategoriesTitles[i]}</strong>
                        </span>
                    </div>
                } submenuTitle={
                    <div className="iconized left">
                        <Icon name="chevron-right" side="left" rotate={3} />
                        <span>
                            <strong>{mainMenuCategoriesTitles[i]}</strong>
                        </span>
                    </div>
                } submenu={mappedSubmenus}
                    parent={categoryKey}
                    currentParent={currentMenu} setCurrentMenu={setParentMenu}/>
            </li>
        )
    })
    return <div className="mainmenu">
        <div className="link-account">
<div className="iconized">
                {isLoggedIn
                    ? <Icon name="user-check" size="full" />
                    : <Icon name="user" size="full" />}
                <span>Account</span>
            </div>
        </div>
        <SliderMenuContainer>
            <ul className="mainmenu__sliders">
                {mappedSliderMenus}
            </ul>
        </SliderMenuContainer>
    </div>
}