import React, { FC, ReactElement, useCallback, useState } from "react"
import { Icon } from "../el10-Icons/Icon";
import css from "./Accordeon.module.scss"

type TAccordeonProps = {
    toggle: ReactElement
}

export const Accordeon: FC<TAccordeonProps> = ({ toggle, children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const onToggleClick = useCallback(() => {
        setIsCollapsed(!isCollapsed)
    }, [isCollapsed])
    return <div className={css.accordeon}>
        <div className={`iconized right ${css.toggle}`}
            onClick={onToggleClick}>
            <Icon name="chevron-right" size="full" side="right" rotate={isCollapsed ? 2 : 4} />
            {toggle}
        </div>
        <ul className={isCollapsed ? css.collapsed : ""}>
            {children}
        </ul>
    </div>
}
