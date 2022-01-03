import React, { ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps } from 'react'
import css from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ExtraButtonPropsType = DefaultButtonPropsType & {
    mode?: "text" | "icon"
    style?: CSSProperties
    variant?: "ok" | "ok__alt" | "cancel" | "active" | "inactive" | "disabled"
    backgroundImage?: boolean
    orientation?: "left" | "center" | "right"
}

const Button: React.FC<ExtraButtonPropsType> = (
    {
        mode = "text", variant, style, backgroundImage, orientation = "center",
        ...restProps
    }
) => {
    let className = mode === "text" ? css.button : css.iconButton
    switch (variant) {
        case "active": className = `${css.active} ${className}`; break
        case "inactive": className = `${css.inactive} ${className}`; break
        case "ok": className = `${css.ok} ${className}`; break
        case "ok__alt": className = `${css.ok__alt} ${className}`; break
        case "cancel": className = `${css.cancel} ${className}`; break
        case "disabled": className = `${css.disabled} ${className}`; break
        default: className = className
    }

    if (backgroundImage) {
        className = `${"backgroundImage"} ${className}`
    }
    switch (mode) {
        case "text": return (<div style={style && style} className={`${css.container} ${css[orientation]}`}>
            <button className={className} {...restProps} />
        </div>
        )
        case "icon": return (
            <button style={style && style} className={className} {...restProps} />
        )
    }
}

export default Button
