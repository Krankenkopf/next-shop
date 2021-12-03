import React, { useCallback, useState, FocusEvent, useRef } from "react"
import { TSortValue } from "../../../../a0-common/c1-types/t2-request"
import { FilterNames, SORTTITLES } from "../../../../a0-common/c2-constants"
import { useAppDispatch, useAppSelector, useOnMouseDownOutside } from "../../../../a0-common/c3-hooks"
import { setFilter, TFacets, TFilters, TFiltersState } from "../../../../a2-bll/filters-reducer"
import { TNavigationState } from "../../../../a2-bll/navigation-reducer"
import { setSortBy, TSortState } from "../../../../a2-bll/sort-reducer"
import { Radio } from "../../cp1-elements/el07-Radio/Radio"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"
import { DropMenuOnClick } from "../DropMenu/DropMenuOnClick"
import css from "./Filters.module.scss"

type TFiltersProps = {

}

export const Filters = () => {
    const dispatch = useAppDispatch()
    // filters: sizes, collection, concepts, colorWithNames, contexts, fits, functions, qualities
    const { current, facets } = useAppSelector<TFiltersState>(state => state.filters)

    const { sortBy, sortValues } = useAppSelector<TSortState>(state => state.sort)
    const totalCount = useAppSelector<number>(state => state.navigation.totalNumberOfResults)

    

    //sortDropmenu
    const [isSortMenuVisible, setIsSortMenuVisible] = useState(false)
    const onSortMenuToggle = useCallback((state) => {
        setIsSortMenuVisible(state)
    }, [])
    const onSortOptionChange = (value: TSortValue) => {
        dispatch(setSortBy(value))
    }
    const sortMenu = {
        toggle: <div className="span__decorated right">
            <Icon name="chevron-right"
                size="full"
                side="right"
                rotate={isSortMenuVisible ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isSortMenuVisible
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{FilterNames.SORTBY}</span>
        </div>,
        menu: <Radio titles={SORTTITLES}
            options={sortValues}
            value={sortBy}
            onChangeOption={onSortOptionChange}>
            <Icon name="circle"
                size="full"
                containerClassName={css.radioSplash__container}
                className={css.radioSplash} />
        </Radio>
    }
    //colorMenu
    const [isColorMenuVisible, setIsColorMenuVisible] = useState(false)
    const onColorMenuToggle = useCallback((state) => {
        setIsColorMenuVisible(state)
    }, [])
    const onColorOptionChange = (value: string) => {
        dispatch(setFilter({ colorWithNames: [ ...current.colorWithNames, value] }))
    }
    const getColorMenu = useCallback(() => ({
        toggle: <div className="span__decorated right" >
                                <Icon name="chevron-right"
                                    size="full"
                                    side="right"
                                    rotate={isColorMenuVisible ? 4 : 2}
                                    className={css.filter__btn__icon}
                                    containerClassName={isColorMenuVisible
                                        ? `${css.filter__btn} ${css._close}`
                                        : css.filter__btn} />
                                <span>{FilterNames.COLOR}</span>
                            </div>,
        menu: facets.colorWithNames && facets.colorWithNames.values.map((color) => (
            <div key={color.code}>{color.code}</div>
        )),
    }), [isColorMenuVisible, facets.colorWithNames])


    return <section className={css.sortfilterviewControls}>
        <form>
            <div className={css.sortfilters}>
                <section className={css.sort}>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.SORTBY}</legend>
                        <DropMenuOnClick toggle={sortMenu.toggle}
                            menu={sortMenu.menu}
                            onToggle={onSortMenuToggle} />
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.COLOR}</legend>
                        <DropMenuOnClick toggle={getColorMenu().toggle}
                            menu={getColorMenu().menu}
                            onToggle={onColorMenuToggle} />
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
                            <span>{`${totalCount} ${totalCount === 1 ? "item" : "items"}`}</span>
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