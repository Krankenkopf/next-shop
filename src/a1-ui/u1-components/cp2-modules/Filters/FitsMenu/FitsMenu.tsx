import React, { FC } from "react"
import { TFacet } from "../../../../../a0-common/c1-types/t3-response/TProductsResponse"
import { capitalizeFirst } from "../../../../../a0-common/c4-utils/ui"
import { Checkbox } from "../../../cp1-elements/el03-Checkbox/Checkbox"
import css from "./FitsMenu.module.scss"
import gcss from "../Filters.module.scss"

type TFitsMenuProps = {
    fits: TFacet
    selected: Array<string>
    onOptionChange: (state: boolean, value: string) => void
}

export const FitsMenu: FC<TFitsMenuProps> = ({ selected, fits, onOptionChange }) => {
    const sortedFits = [
        ...fits.values.filter((fit) => fit.count),
        ...fits.values.filter((fit) => !fit.count)
    ]
    const mappedFits = sortedFits.map((fit) => {
        const fitTitle = fit.code.replace(" ", "")
        
        const isActive = fit.count !== 0

        //
        return (
            <li key={fit.code}>
                <Checkbox name={fitTitle}
                    disabled={!isActive}
                    checked={selected.some((item) => item === fit.code)}
                    value={fit.code}
                    onChangeChecked={onOptionChange}
                    className={isActive ? `${gcss.checkbox} ${gcss.active}` : `${gcss.checkbox}`}
                    titleClassName={gcss.checkbox__inner}>
                    <div className={gcss.checkbox__text}>
                        {capitalizeFirst(fit.code)}
                    </div>

                    <div className={gcss.checkbox__item}>
                        <div className={gcss.checkbox__item__fit}></div>
                        <div className={gcss.checkbox__count}>
                            <strong>{fit.count}</strong>
                        </div>
                    </div>
                </Checkbox>
            </li>
        )
    })
    return (
        <ul className={css.fitsMenu}>
            {mappedFits}
        </ul>
    )
}
