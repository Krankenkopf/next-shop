import React, { FC } from "react"
import { TFacet } from "../../../../../a0-common/c1-types/t3-response/TProductsResponse"
import { capitalizeFirst, getBrightness, sortNonZeroFirst } from "../../../../../a0-common/c4-utils/ui"
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
    const sortedColors = sortNonZeroFirst(colors.values, "count")
    const mappedColors = sortedColors.map((color) => {
        //extract data from string like "black_000000"
        const colorParsedData = { colorName: "", hexColor: "" }
        getKeys(colorParsedData).forEach((key, i) => {
            colorParsedData[key] = color.code.split("_")[i]
        })
        const colorData = {
            ...colorParsedData,
            textColor: getBrightness(colorParsedData.hexColor) > 40 ? "#000" : "#fff"
        }
        const isActive = color.count !== 0

        //
        return (
            <li key={color.code} className={isActive ? `${gcss.menuoption} ${gcss.active}` : `${gcss.menuoption}`}>
                <Checkbox name={colorData.colorName}
                    disabled={!isActive}
                    checked={selected.some((item) => item === color.code)}
                    value={color.code}
                    onChangeChecked={onOptionChange}
                    className={gcss.checkbox}
                    titleClassName={gcss.checkbox__inner}>
                    <div className={gcss.checkbox__text}>
                        {capitalizeFirst(colorData.colorName)}
                    </div>
                   
                    <div className={gcss.checkbox__item}>
                        {/* one of them */}
                        {(colorData.colorName !== "transparent") && (colorData.colorName !== "multi") && <>
                        <div className={gcss.checkbox__item__color}
                                style={{ backgroundColor: `#${colorData.hexColor}`, }}></div>
                            <div className={gcss.checkbox__count}
                                style={{ color: isActive ? colorData.textColor : "#666", }}>
                                <strong>{color.count}</strong>
                            </div>
                        </>}
                        
                        {colorData.colorName === "multi" && <>
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
                            </div>
                            <div className={gcss.checkbox__count}>
                                <strong>{color.count}</strong>
                            </div>
                        </>}
                        
                        {colorData.colorName === "transparent" && <>
                            <div className={`${gcss.checkbox__item__color} ${css.transparent}`}>
                            </div>
                            <div className={gcss.checkbox__count}>
                                <strong>{color.count}</strong>
                            </div>
                        </>}
                    </div>
                </Checkbox>
            </li>
        )
    })
    return (
        <>
            {mappedColors}
            {mappedColors.length % 2 && mappedColors.length > 2 &&
                <li>
                    <div className={sortedColors[sortedColors.length - 1].count ? `${gcss.checkbox} ${gcss.active}` : `${gcss.checkbox}`}>
                    {/*  {sortedColors[sortedColors.length - 1].count && <div className={css.overlay}></div>} */}
                        <div className={gcss.overlay}></div>
                    </div>
                </li>}
        </>
    )
}