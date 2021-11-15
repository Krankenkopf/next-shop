import React, { FC, useCallback, useEffect, useRef, MouseEvent, SVGAttributes, DetailedHTMLProps } from "react"
import { TIconName } from "../../cp2-modules/IconSpritesMaps/IconSpritesMap"

type TDefaulSVGProps = DetailedHTMLProps<SVGAttributes<SVGSVGElement>, SVGSVGElement>

type TIconProps = TDefaulSVGProps & {
    name: TIconName
    className?: string
    side?: "top" | "right" | "bottom" | "left"
    size?: "normal" | "full" //normal is full divided by sqrt(2) for proper rotating anims and/or nesting
    primaryColor?: string
    secondaryColor?: string
    primaryOpacity?: string
    secondaryOpacity?: string
    //onClick?: () => void
}

export const Icon: FC<TIconProps> = ({
    name,
    className,
    side = "left",
    size = "normal",
    primaryColor,
    secondaryColor,
    primaryOpacity,
    secondaryOpacity,
    onClick
}) => {
    const getContainerStyle = useCallback(() => {
        switch (side) {
            case "top": return "icon__container _top"
            case "right": return "icon__container _right"
            case "bottom": return "icon__container _bottom"
            case "left": return "icon__container _left"
        }
    }, [side])

    const onClickHandler = (e: MouseEvent<SVGSVGElement>) => {
        onClick && onClick(e)
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
        <div className={getContainerStyle()}>
            <svg ref={ref} onClick={onClickHandler} className={`icon icon-${name} ${className} ${size}`}>
                <use id={`${name}`} xlinkHref={`#${name}`}></use>
            </svg>
        </div>
    )
}