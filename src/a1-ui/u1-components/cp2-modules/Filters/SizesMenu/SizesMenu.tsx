import React, { FC, useCallback, useState } from "react"
import { TFacet } from "../../../../../a0-common/c1-types/t3-response/TProductsResponse"
import { capitalizeFirst } from "../../../../../a0-common/c4-utils/ui"
import { Checkbox } from "../../../cp1-elements/el03-Checkbox/Checkbox"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import css from "./SizesMenu.module.scss"
import gcss from "../Filters.module.scss"
import { DropMenuOnClick } from "../../DropMenu/DropMenuOnClick"
import { getKeys } from "../../../../../a0-common/c4-utils/state"
import { SIZETITLES } from "../../../../../a0-common/c2-constants"

type TFacetValue = {
    code: string
    count: number
    selected: boolean

    title: string
}

type TSizesMenuProps = {
    sizes: TFacet
    selected: Array<string>
    onOptionChange: (state: boolean, value: string) => void
}

export const SizesMenu: FC<TSizesMenuProps> = ({ selected, sizes, onOptionChange }) => {
    const [isAnyOpen, setIsAnyOpen] = useState(false);
    const initialVisibility = {
        womenswear: false,
        menswear: false,
        waist: false,
        footwear: false,
    }
    const [isCategoryVisible, setIsCategoryVisible] = useState(initialVisibility)
    const onCategoryToggle = (state: boolean, type: string | undefined) => {
        setIsAnyOpen(state)
        type && setIsCategoryVisible((prev) => ({ ...initialVisibility, [type]: state }))
    }

    const sortedSizes = [
        ...sizes.values.filter((size) => size.count),
        ...sizes.values.filter((size) => !size.count)
    ]

    const getCategorizedSizes = useCallback(() => {
        const initial = {
            womenswear: [] as Array<TFacetValue>,
            menswear: [] as Array<TFacetValue>,
            waist: [] as Array<TFacetValue>,
            footwear: [] as Array<TFacetValue>,
        }
        sortedSizes.forEach((value) => {
            const key = value.code.split("_")[3] //"366_s_1_womenswear"
            initial[key as keyof typeof initial].push({ ...value, title: value.code.split("_")[1] })
        })
        return initial
    }, [sizes])

    const getMappedCategories = useCallback(() => {
        const categorizedSizes = getCategorizedSizes()
        return getKeys(categorizedSizes).map((category, i) => {
            const menu = {
                toggle: <div className="span__decorated right" >
                    <Icon name="chevron-right"
                        size="full"
                        side="right"
                        rotate={isCategoryVisible[category] ? 4 : 2}
                        className={gcss.filter__btn__icon}
                        containerClassName={isCategoryVisible[category]
                            ? `${gcss.filter__btn} ${gcss._close}`
                            : gcss.filter__btn} />
                    <span>{SIZETITLES[i]}</span>
                </div>,
                menu: () => {
                    const sizes = categorizedSizes[category]
                    const mappedSizes = sizes.map((size) => {
                        const isActive = size.count !== 0
                        //
                        return (
                            <li key={size.code}>
                                <Checkbox name={size.title}
                                    disabled={!isActive}
                                    checked={selected.some((item) => item === size.code)}
                                    value={size.code}
                                    onChangeChecked={onOptionChange}
                                    className={isActive ? `${gcss.checkbox} ${gcss.active}` : `${gcss.checkbox}`}
                                    titleClassName={gcss.checkbox__inner}>
                                    <div className={gcss.checkbox__text}>
                                        {size.title.toUpperCase()}
                                    </div>

                                    <div className={gcss.checkbox__item}>
                                        <div className={gcss.checkbox__count}>
                                            <strong>{size.count}</strong>
                                        </div>
                                    </div>
                                </Checkbox>
                            </li>
                        )
                    })
                    return <ul className={css.dropdown__menu}>
                        {mappedSizes}
                    </ul>
                },
            }
            return <li>
                <DropMenuOnClick id={category} toggle={menu.toggle}
                    menu={menu.menu()}
                    type={category}
                    className={css.dropdown__container}
                    isNeedToClosePrevious={isAnyOpen}
                    onToggle={onCategoryToggle} />
            </li>
        })
    }, [sizes, selected, isCategoryVisible])



    return (
        <ul className={css.sizesMenu}>
            {getMappedCategories()}
        </ul>

    )
}

{/* <ul className={css.sizesMenu}>
            {mappedSizes}
            {mappedSizes.length % 2 && mappedSizes.length > 2 &&
                <li>
                    <div className={sortedSizes[sortedSizes.length - 1].count ? `${gcss.checkbox} ${gcss.active}` : `${gcss.checkbox}`}>
                        {/*  {sortedSizes[sortedSizes.length - 1].count && <div className={css.overlay}></div>} */}
{/* <div className={gcss.overlay}></div>
                    </div>
                </li>}
        </ul> */}