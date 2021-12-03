import React, { FC, ReactNode, useState } from "react"
import css from "./DropMenu.module.scss"

type TDropMenuProps = {
    toggle: ReactNode
    menu: ReactNode
}

export const DropMenuOnHover: FC<TDropMenuProps> = ({toggle, menu}) => {
    const [menuVisibility, setMenuVisibility] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout>();
    
    const toggleMenu = (e: React.MouseEvent<HTMLDivElement>, state: boolean) => {
        if (menuVisibility) {     // closing
            if (!menuClosing && !state) {
                setMenuClosing(true)
                setTimer(setTimeout(() => {
                setMenuClosing(false)
                setMenuVisibility(false)
                }, 500))
            }
            if (menuClosing && state) { // mouse returned => cancel closing
                setMenuClosing(false)
                timer && clearTimeout(timer)
            }
        }
        if (!menuVisibility) { // opening
            setMenuVisibility(true)
        }
    }
    
    return (
        <div style={{ position: "relative" }}
             onMouseEnter={(e) => toggleMenu(e, true)}
             onMouseLeave={(e) => toggleMenu(e, false)}>
            {toggle}
            {menuVisibility
                ? <div className={`${css.dropmenuHover} ${menuClosing ? css.closing : ""}`}>{ menu }</div>
                : null}
        </div>
    )
}