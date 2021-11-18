import React, { FC, ReactNode, useState } from "react"

type TDropMenuProps = {
    toggle: ReactNode
    menu: ReactNode
}

export const DropMenu: FC<TDropMenuProps> = ({toggle, menu}) => {
    const [menuVisibility, setMenuVisibility] = useState(false);
    
    return (
        <div style={{ position: "relative" }}
             onMouseEnter={() => setMenuVisibility(true)}
             onMouseLeave={() => setMenuVisibility(true)}>
            {toggle}
            {menuVisibility
                ? <div className="drop-menu">{ menu }</div>
                : null}
        </div>
    )
}