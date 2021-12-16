import React, { FC } from "react"
import { TFacet } from "../../../../../a0-common/c1-types/t3-response/TProductsResponse"
import { capitalizeFirst, sortNonZeroFirst } from "../../../../../a0-common/c4-utils/ui"
import { Checkbox } from "../../../cp1-elements/el03-Checkbox/Checkbox"
import gcss from "../Filters.module.scss"

type TCollectionsMenuProps = {
    collections: TFacet
    selected: Array<string>
    onOptionChange: (state: boolean, value: string) => void
}

export const CollectionsMenu: FC<TCollectionsMenuProps> = ({ selected, collections, onOptionChange }) => {
    const sortedCollections = sortNonZeroFirst(collections.values, "count")
    const mappedCollections = sortedCollections.map((collection) => {
        const collectionCCName = collection.code.replace(" ", "")
        const title = collection.code.split("_")[1]
        const isActive = collection.count !== 0

        //
        return (
            <li key={collection.code} className={isActive ? `${gcss.menuoption} ${gcss.active}` : `${gcss.menuoption}`}>
                <Checkbox name={collectionCCName}
                    disabled={!isActive}
                    checked={selected.some((item) => item === collection.code)}
                    value={collection.code}
                    onChangeChecked={onOptionChange}
                    className={gcss.checkbox}
                    titleClassName={gcss.checkbox__inner}>
                    <div className={gcss.checkbox__text}>
                        {capitalizeFirst(title)}
                    </div>

                    <div className={gcss.checkbox__item}>
                        <div className={gcss.checkbox__item__collection}></div>
                        <div className={gcss.checkbox__count}>
                            <strong>{collection.count}</strong>
                        </div>
                    </div>
                </Checkbox>
            </li>
        )
    })
    return (
        <ul>
            {mappedCollections}
        </ul>
    )
}
