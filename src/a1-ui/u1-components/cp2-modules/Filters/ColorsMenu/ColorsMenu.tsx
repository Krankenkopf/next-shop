import React, { FC } from "react"
import { TFacet } from "../../../../../a0-common/c1-types/t3-response/TProductsResponse"
import { capitalizeFirst } from "../../../../../a0-common/c4-utils/ui"
import { Checkbox } from "../../../cp1-elements/el03-Checkbox/Checkbox"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import css from "./ColorsMenu.module.scss"
import gcss from "../Filters.module.scss"
import { getKeys } from "../../../../../a0-common/c4-utils/state"


type TColorsMenuProps = {
    colors: TFacet
    selected: Array<string>
    onOptionChange: (state: boolean, value: string) => void
}

export const ColorsMenu: FC<TColorsMenuProps> = ({ selected, colors, onOptionChange }) => {
    const sortedColors = [
        ...colors.values.filter((color) => color.count),
        ...colors.values.filter((color) => !color.count)
    ]
    const mappedColors = sortedColors.map((color) => {
        //extract data from string like "black_000000"
        const colorData = { colorName: "", hexColor: "" }
        getKeys(colorData).forEach((key, i) => {
            colorData[key] = color.code.split("_")[i]
        })
        const isActive = color.count !== 0

        //
        return (
            <li key={color.code}>
                <Checkbox name={colorData.colorName}
                    disabled={!isActive}
                    checked={selected.some((item) => item === color.code)}
                    value={color.code}
                    onChangeChecked={onOptionChange}
                    className={isActive ? `${gcss.checkbox} ${gcss.active}` : `${gcss.checkbox}`}
                    titleClassName={gcss.checkbox__inner}>
                    <div className={gcss.checkbox__text}>
                        {capitalizeFirst(colorData.colorName)}
                    </div>
                   
                    <div className={gcss.checkbox__item}>
                        {(colorData.colorName !== "transparent") && (colorData.colorName !== "multi") &&
                            <div className={gcss.checkbox__item__color}
                                style={{ backgroundColor: `#${colorData.hexColor}`, }}></div>}
                        {colorData.colorName === "multi" &&
                            <div className={`${gcss.checkbox__item__color} ${css.multi}`}>
                                <ul className={css.umbrella}>
                                    <li className={css.color}></li>
                                    <li className={css.color}></li>
                                    <li className={css.color}></li>
                                    <li className={css.color}></li>
                                    <li className={css.color}></li>
                                    <li className={css.color}></li>
                                    <li className={css.color}></li>
                                    <li className={css.color}></li>
                                </ul>
                            </div>}
                        {colorData.colorName === "transparent" &&
                            <div className={`${gcss.checkbox__item__color} ${css.transparent}`}>
                            </div>}
                        <div className={gcss.checkbox__count}
                            style={colorData.colorName === "black" ? { color: `#fff`, } : {}}>
                            <strong>{color.count}</strong>
                        </div>
                        {/* <div className={css.checkbox__count}
                            style={{ color: `#${colorData.hexColor}`, }}>
                            <strong>{color.count}</strong>
                        </div> */}
                    </div>
                </Checkbox>
            </li>
        )
    })
    return (
        <ul className={css.colorsMenu}>
            {mappedColors}
            {mappedColors.length % 2 && mappedColors.length > 2 &&
                <li>
                    <div className={sortedColors[sortedColors.length - 1].count ? `${gcss.checkbox} ${gcss.active}` : `${gcss.checkbox}`}>
                    {/*  {sortedColors[sortedColors.length - 1].count && <div className={css.overlay}></div>} */}
                        <div className={gcss.overlay}></div>
                    </div>
                </li>}
        </ul>
    )
}