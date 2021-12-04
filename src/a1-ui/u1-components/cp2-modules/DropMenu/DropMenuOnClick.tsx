
import React, { FC, ReactNode, useCallback, useState, MouseEvent, useEffect } from "react"
import { useOnMouseDownOutside } from "../../../../a0-common/c3-hooks"
import css from "./DropMenu.module.scss"
type TDropMenuOnClickProps = {
    toggle: ReactNode
    menu: ReactNode
    isNeedToClosePrevious?: boolean
    id?: string
    className?: string
    type?: string
    onToggle?: (state: boolean, type?: string) => void
}

export const DropMenuOnClick: FC<TDropMenuOnClickProps> = ({ toggle, menu, isNeedToClosePrevious = false, id, className, type, onToggle }) => {
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
        onToggle && onToggle(false, type ? type : undefined)
    })
    console.log(isNeedToClosePrevious);
    
    const onToggleMouseDown = (e: MouseEvent) => { // blocks onMouseDownOutside event
        if (!isNeedToClosePrevious) {
            e.stopPropagation()
        }
        if (isNeedToClosePrevious) {
            setIsToggling(true)
        }      
    }
    const box = `${css.dropdown__container} ${className ? className : ""}`
    // 
    return <div className={box}>
        <div id={id} onClick={onToggleClick}
            onMouseDown={onToggleMouseDown}
            style={{padding: "5px"}}>
            {toggle}
        </div>
        <div  ref={dropmenu}
            className={isMenuVisible
                ? css.dropdown__menu
                : `${css.dropdown__menu} ${css._closed}`}>
            {menu}
        </div>
    </div>
}