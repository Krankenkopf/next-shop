import React, { FC, ReactNode, useCallback, useState } from "react"
import { useOnMouseDownOutside } from "../../../../a0-common/c3-hooks"
import css from "./DropMenu.module.scss"
type TDropMenuOnClickProps = {
    toggle: ReactNode
    menu: ReactNode
    onToggle?: (state: boolean) => void
}

export const DropMenuOnClick: FC<TDropMenuOnClickProps> = ({ toggle, menu, onToggle }) => { 
    const [isMenuVisible, setIsMenuVisible] = useState(false)

    const onToggleClick = useCallback(() => {
        setIsMenuVisible(!isMenuVisible)
        onToggle && onToggle(!isMenuVisible)
    }, [isMenuVisible])
    const dropmenu = useOnMouseDownOutside(() => {
        isMenuVisible && setIsMenuVisible(false)
        onToggle && onToggle(false)
    })

    return <div className={css.dropdown__container}
        onClick={onToggleClick}
        onMouseDown={e => e.stopPropagation()}>
        {/* this ^ blocks onMouseDownOutside event*/}
        {toggle}
        <div ref={dropmenu}
            className={isMenuVisible
                ? css.dropdown__menu
                : `${css.dropdown__menu} ${css._closed}`}>
            {menu}
        </div>
    </div>
}