import React, { FC, ReactElement, useCallback, useEffect, useState } from "react"
import css from "./SliderMenu.module.scss"
import { SliderMenuContainer } from "./SliderMenuContainer";

type TSliderMenuProps = {
    title: ReactElement
    submenuTitle: ReactElement | undefined
    submenu: Array<ReactElement | null> | undefined
    parent?: string
    currentParent?: string
    setCurrentMenu?: (parent: string) => void
}

export const SliderMenu: FC<TSliderMenuProps> = ({
    title, submenuTitle, submenu, parent, currentParent, setCurrentMenu
}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    useEffect(() => {
        if (currentParent !== parent && !isCollapsed) {
            setIsCollapsed(true)
        }
    }, [currentParent])

    const onToggleClick = useCallback(() => {
        if (setCurrentMenu && parent) {
            isCollapsed && setCurrentMenu(parent)
            !isCollapsed && setCurrentMenu("")
        }
        setIsCollapsed(!isCollapsed) 
    }, [isCollapsed])
    return <div className={css.sliderMenu}>
        <button className={css.toggle} onClick={onToggleClick}>{title}</button>
        <div className={isCollapsed ? `${css.subMenuContainer} ${css.collapsed}` : css.subMenuContainer}>
            <button className={css.toggle} onClick={onToggleClick}>{submenuTitle}</button>
            <div className={css.subMenu}>
                <ul>
                    {submenu}
                </ul>
            </div>
        </div>
    </div>
}