import React from "react"
import img from "../../../../../public/images/underconstruction/underconstruction-sign.png"
import css from "./UnderConstruction.module.scss"

export const UnderConstructionSign = () => {
    return <figure className={css.sign}>
        <img src={img.src} alt="page under construction" />
    </figure>
}