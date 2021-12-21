
import React, { FC, ReactNode, useCallback, useState, MouseEvent, useEffect, PropsWithChildren } from "react"
import { useOnMouseDownOutside } from "../../../../a0-common/c3-hooks"
import css from "./DropMenu.module.scss"
type TDropMenuOnClickProps<TMenu> = {
    toggle: ReactNode
    menu: ReactNode
    isNeedToClosePrevious?: boolean
    className?: string
    menuClassName?: string
    type?: TMenu
    onToggle?: (state: boolean, type?: TMenu) => void
}

export const DropMenuOnClick = <TMenu extends string>(
    {
        toggle, menu, isNeedToClosePrevious = false,
        className, menuClassName, type, onToggle
    }: PropsWithChildren<TDropMenuOnClickProps<TMenu>>) => {
    const [isMenuVisible, setIsMenuVisible] = useState(false)
    const [isToggling, setIsToggling] = useState(false);
    // TODO: comment this barbarity!!
    const onToggleClick = useCallback(() => {
        setIsToggling(false)
        if (!isToggling) {
            setIsMenuVisible(!isMenuVisible)
            onToggle && onToggle(!isMenuVisible, type ? type : undefined)
        }
        
    }, [isMenuVisible, isToggling])
    useEffect(() => {
        if (isToggling) {
            setTimeout(() => {
                setIsMenuVisible(!isMenuVisible)
                onToggle && onToggle(!isMenuVisible, type ? type : undefined) 
            },0)
            
        }
    }, [isToggling])
    const dropmenu = useOnMouseDownOutside(() => {
        isMenuVisible && setIsMenuVisible(false)
        isMenuVisible && onToggle && onToggle(false, type ? type : undefined)
    })
    
    const onToggleMouseDown = (e: MouseEvent) => { // blocks onMouseDownOutside event
        if (!isNeedToClosePrevious) {
            e.stopPropagation()
        }
        if (isNeedToClosePrevious) {
            setIsToggling(true)
        }      
    }
    const box = `${css.dropdown__container} ${className ? className : ""}`
    const list = `${css.dropdown__menu} ${menuClassName ? menuClassName : ""}`
    // 
    return <div className={box}>
        <div onClick={onToggleClick}
            onMouseDown={onToggleMouseDown}
            style={{padding: "5px"}}>
            {toggle}
        </div>
        <div ref={dropmenu}
            className={isMenuVisible
                ? list
                : `${list} ${css._closed}`}>
            {menu}
        </div>
    </div>
}