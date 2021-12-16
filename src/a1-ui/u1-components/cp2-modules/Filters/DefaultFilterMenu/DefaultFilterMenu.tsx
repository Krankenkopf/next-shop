import React, { PropsWithChildren } from "react"
import { TFacet } from "../../../../../a0-common/c1-types/t3-response/TProductsResponse"
import { capitalizeFirst, sortNonZeroFirst } from "../../../../../a0-common/c4-utils/ui"
import { Checkbox } from "../../../cp1-elements/el03-Checkbox/Checkbox"
import gcss from "../Filters.module.scss"

type TDefaultFilterMenuProps<TValue> = {
    categoryOptions: TFacet
    selected: Array<TValue>
    onOptionChange: (state: boolean, value: TValue) => void
}

export const DefaultFilterMenu = <TValue extends string>({
    categoryOptions, selected, onOptionChange
}: PropsWithChildren<TDefaultFilterMenuProps<TValue>>) => {
    const sortedOptions = sortNonZeroFirst(categoryOptions.values, "count")
    const mappedOptions = sortedOptions.map((option) => {
        const optionTitle = option.code.replace(" ", "")
        const isActive = option.count !== 0

        return (
            <li key={option.code} className={isActive ? `${gcss.menuoption} ${gcss.active}` : `${gcss.menuoption}`}>
                <Checkbox name={optionTitle}
                    disabled={!isActive}
                    checked={selected.some((item) => item === option.code)}
                    value={option.code}
                    onChangeChecked={onOptionChange}
                    className={gcss.checkbox}
                    titleClassName={gcss.checkbox__inner}>
                    <div className={gcss.checkbox__text}>
                        {capitalizeFirst(option.code)}
                    </div>

                    <div className={gcss.checkbox__item}>
                        <div className={gcss.checkbox__item__fit}></div>
                        <div className={gcss.checkbox__count}>
                            <strong>{option.count}</strong>
                        </div>
                    </div>
                </Checkbox>
            </li>
        )
    })
    return (
        <ul>
            {mappedOptions}
        </ul>
    )
}