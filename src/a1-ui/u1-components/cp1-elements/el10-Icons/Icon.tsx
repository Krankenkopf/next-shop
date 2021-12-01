import React, { FC, useCallback, useEffect, useRef, MouseEvent, SVGAttributes, DetailedHTMLProps } from "react"
import { TIconName } from "../../cp2-modules/IconSpritesMaps/IconSpritesMap"

type TDefaulSVGProps = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>

type TIconProps = TDefaulSVGProps & {
    name: TIconName
    value?: string,
    className?: string // for colors
    containerClassName?: string // for transitions, rotating etc
    side?: "right" | "left"
    size?: "normal" | "full" //normal is full divided by sqrt(2) for proper rotating anims and/or nesting
    active?: boolean // for icon button variant
    primaryColor?: string
    secondaryColor?: string
    primaryOpacity?: string
    secondaryOpacity?: string
    //onClick?: () => void
}

export const Icon: FC<TIconProps> = ({
    name,
    className,
    containerClassName,
    side = "left",
    size = "normal",
    active = true,
    primaryColor,
    secondaryColor,
    primaryOpacity,
    secondaryOpacity,
    onClick
}) => {
    const getContainerStyle = useCallback(() => {
        let style = `icon-container ${containerClassName ? containerClassName : ""}`
        switch (side) {
            case "right": return `${style} _right`
            case "left": return `${style} _left`
        }
    }, [side, containerClassName])

    const onClickHandler = (e: MouseEvent<SVGSVGElement>) => {
        active && onClick && onClick(e)
    }

    const ref = useRef(null as unknown as SVGSVGElement)
    useEffect(() => {
        if (primaryColor && secondaryColor) {
            ref && ref.current.style.setProperty('--primary', primaryColor)
            ref && ref.current.style.setProperty('--secondary', secondaryColor)
        }
        if (primaryOpacity && secondaryOpacity) {
            ref && ref.current.style.setProperty('--primary-opacity', primaryOpacity)
            ref && ref.current.style.setProperty('--secondary-opacity', secondaryOpacity)
        }
    }, [primaryColor, secondaryColor, primaryOpacity, secondaryOpacity,])
    return (
        <div className={`${getContainerStyle()}`}>
            <svg ref={ref} onClick={onClickHandler} className={`icon icon-${name} ${className} ${size}`}>
                <use id={`${name}`} xlinkHref={`#${name}`}></use>
            </svg>
        </div>
    )
}