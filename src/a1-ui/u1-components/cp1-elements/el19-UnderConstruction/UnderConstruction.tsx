import React, { useCallback } from "react"
import img from "../../../../../public/images/underconstruction/underconstruction.png"
import { useWindowSize } from "../../../../a0-common/c3-hooks/useWindowSize"
import css from "./UnderConstruction.module.scss"

export const UnderConstruction = React.memo(() => {
    if (typeof window !== 'object') {
        return null
    }
    const windowSize = useWindowSize()
    const getStrokes = useCallback(() => {
        const quantity = +(windowSize.width / 50).toFixed(0)
        let arr = []
        for (let i = 0; i < quantity; i++) {
            arr.push(<li key={i}></li>)
        }
        return arr
    }, [windowSize])
    return <div className={css.underconstruction}>
        <header>
            <div className={css.line}>
                <ul>
                    {getStrokes()}
                </ul>
            </div>
            <h2><strong>UNDER CONSTRUCTION</strong></h2>
        </header>
        <figure>
            <img src={img.src} alt="page under construction" />
        </figure>
        <footer>
            <div className={css.line}>
                <ul>
                    {getStrokes()}
                </ul>
            </div> 
        </footer>
    </div>
})