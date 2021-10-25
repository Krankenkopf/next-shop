import React, {ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps} from 'react'
import css from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ExtraButtonPropsType = DefaultButtonPropsType & {
    style?: CSSProperties
    variant?: 'ok' | 'cancel' | 'active' | 'inactive' | 'disabled'
    backgroundImage?: boolean
}

const Button: React.FC<ExtraButtonPropsType> = (
    {
        variant, style, backgroundImage,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    let className
    switch (variant) {
        case "active": className = `${css.active} ${css.button}`; break
        case "inactive": className = `${css.inactive} ${css.button}`; break
        case "ok": className = `${css.ok} ${css.button}`; break
        case "cancel": className = `${css.cancel} ${css.button}`; break
        case "disabled": className = `${css.disabled} ${css.button}`; break
        default: className = css.button
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
