import React, {ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps} from 'react'
import css from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ExtraButtonPropsType = DefaultButtonPropsType & {
    mode?: "text" | "icon"
    style?: CSSProperties
    variant?: 'ok' | 'cancel' | 'active' | 'inactive' | 'disabled'
    backgroundImage?: boolean
}

const Button: React.FC<ExtraButtonPropsType> = (
    {
        mode = "text", variant, style, backgroundImage,
        ...restProps
    }
) => {
    let className = mode ==="text" ? css.button : css.iconButton
    switch (variant) {
        case "active": className = `${css.active} ${className}`; break
        case "inactive": className = `${css.inactive} ${className}`; break
        case "ok": className = `${css.ok} ${className}`; break
        case "cancel": className = `${css.cancel} ${className}`; break
        case "disabled": className = `${css.disabled} ${className}`; break
        default: className = className
    }

    if (backgroundImage) {
        className = `${"backgroundImage"} ${className}`
    }
    return (
            <button style={style && style}
                className={className}
                {...restProps}
            />
    )
}

export default Button
