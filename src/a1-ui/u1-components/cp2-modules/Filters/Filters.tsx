import React, { useCallback, useState, FocusEvent, useRef } from "react"
import { Nullable } from "../../../../a0-common/c1-types/t1-instance"
import { TSortValue } from "../../../../a0-common/c1-types/t2-request"
import { FilterNames, SORTTITLES } from "../../../../a0-common/c2-constants"
import { useAppDispatch, useAppSelector, useOnMouseDownOutside } from "../../../../a0-common/c3-hooks"
import { setFilter, TFacets, TFilters, TFiltersState } from "../../../../a2-bll/filters-reducer"
import { TNavigationState } from "../../../../a2-bll/navigation-reducer"
import { setSortBy, TSortState } from "../../../../a2-bll/sort-reducer"
import { Checkbox } from "../../cp1-elements/el03-Checkbox/Checkbox"
import { Radio } from "../../cp1-elements/el07-Radio/Radio"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"
import { DropMenuOnClick } from "../DropMenu/DropMenuOnClick"
import { ColorsMenu } from "./ColorsMenu/ColorsMenu"
import css from "./Filters.module.scss"
import { SizesMenu } from "./SizesMenu/SizesMenu"

type TFiltersProps = {

}

export const Filters = () => {
    const dispatch = useAppDispatch()
    // filters: sizes, collection, concepts, colorWithNames, contexts, fits, functions, qualities
    const { current, facets } = useAppSelector<TFiltersState>(state => state.filters)

    const { sortBy, sortValues } = useAppSelector<TSortState>(state => state.sort)
    const totalCount = useAppSelector<number>(state => state.navigation.totalNumberOfResults)



    //sortDropmenu =======================================================================================
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
    //colorMenu =======================================================================================
    const [isColorMenuVisible, setIsColorMenuVisible] = useState(false)
    const onColorMenuToggle = useCallback((state) => {
        setIsColorMenuVisible(state)
    }, [])
    const onColorOptionChange = (state: boolean, value: string) => {
        state
            ? dispatch(setFilter({ colorWithNames: [...current.colorWithNames, value] }))
            : dispatch(setFilter({ colorWithNames: [...current.colorWithNames.filter((color) => color !== value)] }))
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
        menu: facets.colorWithNames &&
            <ColorsMenu colors={facets.colorWithNames}
                selected={current.colorWithNames}
                onOptionChange={onColorOptionChange} />,
    }), [isColorMenuVisible, facets.colorWithNames, current.colorWithNames])

    //sustainMenu =======================================================================================
    const [isSustainMenuVisible, setIsSustainMenuVisible] = useState(false)
    const onSustainMenuToggle = useCallback((state) => {
        setIsSustainMenuVisible(state)
    }, [])
    const onSustainOptionChange = (state: boolean, value: string) => {
        console.log("Not implemented")
    }
    const getSustainMenu = useCallback(() => ({
        toggle: <div className="span__decorated right" >
            <Icon name="chevron-right"
                size="full"
                side="right"
                rotate={isSustainMenuVisible ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isSustainMenuVisible
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{FilterNames.CONSCIOUS}</span>
        </div>,
        menu: <ul style={{ padding: "10px" }}>
            <li>
                <Checkbox
                    onChangeChecked={onSustainOptionChange}
                    className={`${css.checkbox} ${css.active}`}
                    titleClassName={css.checkbox__inner}>
                    <div className={css.checkbox__text}>
                        Conscious
                    </div>
                </Checkbox>
                <p style={{ color: "#f00", fontSize: "60%" }}>Not implemented</p>
            </li>
        </ul>,
    }), [isSustainMenuVisible])

    //sizesMenu =========================================================================================

    const [isSizesMenuVisible, setIsSizesMenuVisible] = useState(false)
    const onSizesMenuToggle = useCallback((state) => {
        setIsSizesMenuVisible(state)
    }, [])
    const onSizesOptionChange = (state: boolean, value: string) => {
        state
            ? dispatch(setFilter({ sizes: [...current.sizes, value] }))
            : dispatch(setFilter({ sizes: [...current.sizes.filter((size) => size !== value)] }))
    }
    const getSizesMenu = useCallback(() => ({
        toggle: <div className="span__decorated right" >
            <Icon name="chevron-right"
                size="full"
                side="right"
                rotate={isSizesMenuVisible ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isSizesMenuVisible
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{FilterNames.SIZE}</span>
        </div>,
        menu: facets.sizes &&
            <SizesMenu sizes={facets.sizes}
                selected={current.sizes}
                onOptionChange={onSizesOptionChange} />,
    }), [isSizesMenuVisible, facets.sizes, current.sizes])


    return <section className={css.sortfilterviewControls}>
        <form>
            <div className={css.sortfilters}>
                <section className={css.sort}>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.SORTBY}</legend>
                        <DropMenuOnClick id={FilterNames.SORTBY}
                            toggle={sortMenu.toggle}
                            menu={sortMenu.menu}
                            onToggle={onSortMenuToggle} />
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.SIZE}</legend>
                        <DropMenuOnClick id={FilterNames.SIZE}
                            toggle={getSizesMenu().toggle}
                            menu={getSizesMenu().menu}
                            onToggle={onSizesMenuToggle} />
                    </fieldset>
                </section>
                <section className={css.filters}>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.CONSCIOUS}</legend>
                        <DropMenuOnClick id={FilterNames.CONSCIOUS} toggle={getSustainMenu().toggle}
                            menu={getSustainMenu().menu}
                            onToggle={onSustainMenuToggle} />
                    </fieldset>
                    {/* <fieldset className={css.block}>
                        <legend>{FilterNames.SIZE}</legend>
                        <DropMenuOnClick id={FilterNames.SIZE} toggle={getSizesMenu().toggle}
                            menu={getSizesMenu().menu}
                            onToggle={onSizesMenuToggle} />
                    </fieldset> */}
                    <fieldset className={css.block}>
                        <legend>{FilterNames.COLOR}</legend>
                        <DropMenuOnClick id={FilterNames.COLOR} toggle={getColorMenu().toggle}
                            menu={getColorMenu().menu}
                            onToggle={onColorMenuToggle} />
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