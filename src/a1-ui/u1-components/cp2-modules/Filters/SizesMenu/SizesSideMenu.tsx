import React, { FC, useCallback, useState } from "react"
import { TFacet } from "../../../../../a0-common/c1-types/t3-response/TProductsResponse"
import { SIZETITLES } from "../../../../../a0-common/c2-constants"
import { sortNonZeroFirst } from "../../../../../a0-common/c4-utils/ui"
import { Checkbox } from "../../../cp1-elements/el03-Checkbox/Checkbox"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import gcss from "../Filters.module.scss"

type TFacetValue = {
    code: string
    count: number
    selected: boolean

    title: string
}

type TSizesSideMenuProps = {
    sizes: TFacet
    selected: Array<string>
    onOptionChange: (state: boolean, value: string) => void
}

type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const SizesSideMenu: FC<TSizesSideMenuProps> = ({sizes, selected, onOptionChange}) => {
    const rootTitle = "Filter&Sort"
    const [title, setTitle] = useState(rootTitle);
    const menuTypes = ["womenswear", "menswear", "waist", "footwear",] as const
    const [currentMenu, setCurrentMenu] = useState<"" | ArrayElement<typeof menuTypes>>("")
    const onMenuToggle = (type: "" | ArrayElement<typeof menuTypes>) => {
        setCurrentMenu(type)
        setTitle(SIZETITLES.find(filter => filter.code === type)?.title || rootTitle)
    }

    const sortedSizes = sortNonZeroFirst(sizes.values, "count")
    const getCategorizedSizes = useCallback(() => {
        const initial = {
            womenswear: [] as Array<TFacetValue>,
            menswear: [] as Array<TFacetValue>,
            waist: [] as Array<TFacetValue>,
            footwear: [] as Array<TFacetValue>,
        }
        sortedSizes.forEach((value) => {
            const parsedCode = value.code.split("_")//"366_s_1_womenswear" => [366, s, 1, womenswear]
            const key = parsedCode[3]
            initial[key as keyof typeof initial].push({ ...value, title: parsedCode[1] + parsedCode[2] })
        })
        return initial
    }, [sizes])

    const mappedTitles = SIZETITLES.map((title) => ((
            <li onClick={() => {onMenuToggle(title.code)}} className={gcss.menuTitle}>
                <div className="iconized right" >
                    <Icon name="chevron-right"
                    size="max"
                        side="right"
                        className={gcss.filter__btn__icon}
                        containerClassName={gcss.filter__btn} />
                    <span>{title.title}</span>
                </div>
            </li>
        )))
    const getMenu = () => {
        switch (currentMenu) {
            case "womenswear":
            case "menswear":
            case "waist":
            case "footwear":
                const categorizedSizes = getCategorizedSizes()
                return (
                <>
                    <header>
                        <h5>{title}</h5>
                    </header>
                    <ul>
                            {categorizedSizes[currentMenu].map(size => {
                                const isActive = size.count !== 0
                                return (
                                    <li key={size.code} className={isActive ? `${gcss.menuoption} ${gcss.active}` : `${gcss.menuoption}`}>
                                        <Checkbox name={size.title}
                                            disabled={!isActive}
                                            checked={selected.some((item) => item === size.code)}
                                            value={size.code}
                                            onChangeChecked={onOptionChange}
                                            className={gcss.checkbox}
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
                        })}
                    </ul>
                </>
            )
            default: return (
                <ul>
                    {mappedTitles}
                </ul>
            )
        }
    }    
    return (<>
        {getMenu()}
    </>)
}
