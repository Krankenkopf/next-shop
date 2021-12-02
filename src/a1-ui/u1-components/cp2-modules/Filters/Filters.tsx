import React, { useCallback, useState } from "react"
import { FilterNames, SORTTITLES } from "../../../../a0-common/c2-constants"
import { useAppDispatch, useAppSelector } from "../../../../a0-common/c3-hooks"
import { TFacets, TFiltersState } from "../../../../a2-bll/filters-reducer"
import { TNavigationState } from "../../../../a2-bll/navigation-reducer"
import { TSortState } from "../../../../a2-bll/sort-reducer"
import { Radio } from "../../cp1-elements/el07-Radio/Radio"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"
import css from "./Filters.module.scss"

type TFiltersProps = {

}

export const Filters = () => {
    const dispatch = useAppDispatch()
    const { sizes, collection, concepts,
        colorWithNames, contexts, fits,
        functions, qualities } = useAppSelector<TFacets>(state => state.filters.facets)
    const { sortBy, sortValues } = useAppSelector<TSortState>(state => state.sort)
    const totalCount = useAppSelector<number>(state => state.navigation.totalNumberOfResults)
    const [isSortVisible, setIsSortVisible] = useState(false)
    const sortSelect = useCallback(() => {
        const arr = []
        for (const title of SORTTITLES) {
            arr.push(<li>{title}</li>)
        }
        return arr
    }, [])
    const [sortValue, setSortValue] = useState(sortBy)
     
    return <section className={css.sortfilterviewControls}>
        <form>
            <div className={css.sortfilters}>
                <section className={css.sort}>
                    <fieldset className={css.block}
                        onClick={() => { setIsSortVisible(true) }}
                        onBlur={() => { setIsSortVisible(false)} }>
                        <legend>{FilterNames.SORTBY}</legend>
                        <div className={css.dropdown__container}>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right"
                                    size="full"
                                    side="right"
                                    className={css.filter__btn__icon}
                                    containerClassName={css.filter__btn} />
                                <span>{FilterNames.SORTBY}</span>
                            </div>
                            <div className={css.dropdown__menu}>
                                <Radio titles={SORTTITLES}
                                    options={sortValues}
                                    value={sortValue}
                                    onChangeOption={(value) => setSortValue(value)}>
                                    <Icon name="circle"
                                        size="full"
                                        containerClassName={css.radioSplash__container}
                                        className={css.radioSplash} />
                                </Radio>
                            </div>
                        </div>
                    </fieldset>
                </section>
                <section className={css.filters}>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.CONSCIOUS}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right"
                                    size="full"
                                    side="right"
                                    className={css.filter__btn__icon}
                                    containerClassName={css.filter__btn} />
                                <span>{FilterNames.CONSCIOUS}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.SIZE}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right"
                                    size="full"
                                    side="right"
                                    className={css.filter__btn__icon}
                                    containerClassName={css.filter__btn} />
                                <span>{FilterNames.SIZE}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.COLOR}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right"
                                    size="full"
                                    side="right"
                                    className={css.filter__btn__icon}
                                    containerClassName={css.filter__btn} />
                                <span>{FilterNames.COLOR}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.PATTERN}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right"
                                    size="full"
                                    side="right"
                                    className={css.filter__btn__icon}
                                    containerClassName={css.filter__btn} />
                                <span>{FilterNames.PATTERN}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                </section>
                <section className={css.allFilters}>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.ALLFILTERS}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="filters"
                                    size="full"
                                    side="right"
                                    className={css.filter__btn__icon} />
                                <span>{FilterNames.ALLFILTERS}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                </section>
            </div>
            <div>
                <section className={css.view}>
                    <div className={css.block}>
                        <div className={css.textBlock}>
                            <span>{`${totalCount} ${totalCount===1 ? "item" : "items"}`}</span>
                        </div>
                    </div>
                    <fieldset className={css.block}>
                        <legend>Toggle Image Type</legend>
                        <div className={css.textBlock}>
                            <span>Model</span>
                            <span>Product</span>
                        </div>
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>Toggle Image Size</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="grid-2"
                                    size="full"
                                    side="right"
                                    className={css.view__btn__icon} />
                                <span></span>
                            </div>
                            <div className="span__decorated right" >
                                <Icon name="grid"
                                    size="full"
                                    side="right"
                                    className={css.view__btn__icon} />
                                <span></span>
                            </div>
                            <div className="span__decorated right" >
                                <Icon name="grid-4"
                                    size="full"
                                    side="right"
                                    className={css.view__btn__icon} />
                                <span></span>
                            </div>
                            <div className="span__decorated right" >
                                <Icon name="list"
                                    size="full"
                                    side="right"
                                    className={css.view__btn__icon} />
                                <span></span>
                            </div>
                        </div>
                    </fieldset>
                </section>
            </div>

        </form>
    </section>
}