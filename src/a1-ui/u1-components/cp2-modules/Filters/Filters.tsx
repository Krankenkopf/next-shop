import React, { ReactElement, useCallback, useEffect, useMemo, useState } from "react"
import { TSortValue } from "../../../../a0-common/c1-types/t2-request"
import { FilterNames, SORTTITLES } from "../../../../a0-common/c2-constants"
import { useAppDispatch, useAppSelector } from "../../../../a0-common/c3-hooks"
import { setModal } from "../../../../a2-bll/app-reducer"
import { setFilter, TFiltersState } from "../../../../a2-bll/filters-reducer"
import { selectFilters, selectSort } from "../../../../a2-bll/selectors"
import { setSortBy, TSortState } from "../../../../a2-bll/sort-reducer"
import { Checkbox } from "../../cp1-elements/el03-Checkbox/Checkbox"
import { Radio } from "../../cp1-elements/el07-Radio/Radio"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"
import { DropMenuOnClick } from "../DropMenu/DropMenuOnClick"
import { ColorsMenu } from "./ColorsMenu/ColorsMenu"
import { SizesMenu } from "./SizesMenu/SizesMenu"
import css from "./Filters.module.scss"
import { DefaultFilterMenu } from "./DefaultFilterMenu/DefaultFilterMenu"
import { Toggle } from "../../cp1-elements/el06-Toggle/Toggle"
import { setProductsFirstImage, setProductsLayout, TLayoutState, TProductsLayout } from "../../../../a2-bll/layout-reducer"

type TMenuFlags = {
    sort: boolean
    sustain: boolean
    size: boolean
    color: boolean
    pattern: boolean
    fits: boolean
}

export const Filters = () => {
    const dispatch = useAppDispatch()
    // filters: sizes, collection, concepts, colorWithNames, contexts, fits, functions, qualities
    const { current, facets } = useAppSelector<TFiltersState>(selectFilters)

    const { productsLayout, productsFirstImage } = useAppSelector<TLayoutState>(state => state.layout)
    const device = useAppSelector(state => state.layout.device)
    const { sortBy, sortValues } = useAppSelector<TSortState>(selectSort)
    const totalCount = useAppSelector<number>(state => state.navigation.totalNumberOfResults)

    //menus togglers
    const [isAnyOpen, setIsAnyOpen] = useState(false);
    const initialVisibility = {
        sort: false,
        sustain: false,
        size: false,
        color: false,
        pattern: false,
        fits: false,
    } as TMenuFlags
    const [isMenuVisible, setIsMenuVisible] = useState(initialVisibility)
    const onMenuToggle = (state: boolean, type: keyof TMenuFlags | undefined) => {
        setIsAnyOpen(state)
        type && setIsMenuVisible((prev) => ({ ...initialVisibility, [type]: state }))
    }

    //view toggler
    const onViewToggle = (view: "Model" | "Product") => {
        dispatch(setProductsFirstImage(view))
    }

    //layout toggler
    const layoutTogglers = useMemo(() => {
        return [<div className="iconized narrow" >
            <Icon name="list"
                side="right"
                width="narrow"
                className={`icon__layout ${productsLayout === "list1" && "active"}`} />
        </div>,
        <div className="iconized narrow" >
            <Icon name="grid-2"
                side="right"
                width="narrow"
                className={`icon__layout ${productsLayout === "grid2" && "active"}`} />
        </div>,
        <div className="iconized narrow" >
            <Icon name="grid"
                side="right"
                width="narrow"
                className={`icon__layout ${productsLayout === "grid3" && "active"}`} />
        </div>,
        <div className="iconized narrow" >
            <Icon name="grid-4"
                side="right"
                width="narrow"
                className={`icon__layout ${productsLayout === "grid4" && "active"}`} />
        </div>,]
    }, [productsLayout])
    const [layoutVariants, setLayoutVariants] = useState<Array<ReactElement>>(() => {
        switch (device) {
            case ("mobile"): {
                return [layoutTogglers[0]]
            }
            case ("tablet"): {
                return [layoutTogglers[0], layoutTogglers[1],]
            }
            case ("laptop"): {
                return [layoutTogglers[0], layoutTogglers[1], layoutTogglers[3],]
            }
            case ("desktop"): {
                return layoutTogglers
            }
        }
    })
    const onLayoutToggle = (layout: TProductsLayout) => {
        dispatch(setProductsLayout(layout))
    }
    useEffect(() => {
        switch (device) {
            case ("mobile"): {
                setLayoutVariants([layoutTogglers[0]])
                if (productsLayout !== "list1") {
                    dispatch(setProductsLayout("list1"))
                }
                break
            }
            case ("tablet"): {
                setLayoutVariants([layoutTogglers[0], layoutTogglers[1],])
                if (productsLayout !== "grid2") {
                    dispatch(setProductsLayout("grid2"))
                }
                break
            }
            case ("laptop"): {
                setLayoutVariants([layoutTogglers[0], layoutTogglers[1], layoutTogglers[2],])
                if (productsLayout !== "grid3") {
                    dispatch(setProductsLayout("grid3"))
                }
                break
            }
            case ("desktop"): {
                setLayoutVariants(layoutTogglers)
                if (productsLayout !== "grid4") {
                    dispatch(setProductsLayout("grid4"))
                }
                break
            }
        }
    }, [device])

    //sortDropmenu =======================================================================================
    const onSortOptionChange = (value: TSortValue) => {
        dispatch(setSortBy(value))
    }
    const getSortMenu = useCallback(() => ({
        toggle: <div className="iconized wide right">
            <Icon name="chevron-right"
                size="max"
                side="right"
                rotate={isMenuVisible.sort ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isMenuVisible.sort
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{FilterNames.SORTBY}</span>
        </div>,
        menu: <Radio titles={SORTTITLES}
            options={sortValues}
            value={sortBy}
            className={css.radio}
            onChangeOption={onSortOptionChange}>
            <Icon name="circle"
                size="max"
                containerClassName={css.radioSplash__container}
                className={css.radioSplash} />
        </Radio>
    }), [isMenuVisible.sort, sortValues, sortBy])
    //colorMenu =======================================================================================
    const onColorOptionChange = (state: boolean, value: string) => {
        state
            ? dispatch(setFilter({ colorWithNames: [...current.colorWithNames, value] }))
            : dispatch(setFilter({ colorWithNames: [...current.colorWithNames.filter((color) => color !== value)] }))
    }
    const getColorMenu = useCallback(() => ({
        toggle: <div className="iconized wide right" >
            <Icon name="chevron-right"
                size="max"
                side="right"
                rotate={isMenuVisible.color ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isMenuVisible.color
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{FilterNames.COLOR}</span>
        </div>,
        menu: facets.colorWithNames && <ul className={css.colorsMenu}>
            <ColorsMenu colors={facets.colorWithNames}
                selected={current.colorWithNames}
                onOptionChange={onColorOptionChange} />
        </ul>
        ,
    }), [isMenuVisible.color, facets.colorWithNames, current.colorWithNames])

    //sustainMenu =======================================================================================

    const onSustainOptionChange = (state: boolean, value: string) => {
        console.log("Not implemented")
    }
    const getSustainMenu = useCallback(() => ({
        toggle: <div className="iconized wide right" >
            <Icon name="chevron-right"
                size="max"
                side="right"
                rotate={isMenuVisible.sustain ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isMenuVisible.sustain
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{FilterNames.CONSCIOUS}</span>
        </div>,
        menu: <ul style={{ display: "grid", gridTemplateColumns: "1fr" }}>
            <li className={css.menuoption}>
                <Checkbox name={FilterNames.CONSCIOUS}
                    disabled
                    onChangeChecked={onSustainOptionChange}
                    className={`${css.checkbox}`}
                    titleClassName={css.checkbox__inner}>
                    <div className={css.checkbox__text}>
                        <p style={{ color: "#f00", fontSize: "75%" }}>Not available</p>
                    </div>
                </Checkbox>
            </li>
        </ul>,
    }), [isMenuVisible.sustain])

    //sizesMenu =========================================================================================

    const onSizesOptionChange = (state: boolean, value: string) => {
        state
            ? dispatch(setFilter({ sizes: [...current.sizes, value] }))
            : dispatch(setFilter({ sizes: [...current.sizes.filter((size) => size !== value)] }))
    }
    const getSizesMenu = useCallback(() => ({
        toggle: <div className="iconized wide right" >
            <Icon name="chevron-right"
                size="max"
                side="right"
                rotate={isMenuVisible.size ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isMenuVisible.size
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{FilterNames.SIZE}</span>
        </div>,
        menu: facets.sizes &&
            <SizesMenu sizes={facets.sizes}
                selected={current.sizes}
                onOptionChange={onSizesOptionChange} />,
    }), [isMenuVisible.size, facets.sizes, current.sizes])

    //patternsMenu
    const onPatternsOptionChange = (state: boolean, value: string) => {
        console.log("Not implemented");
    }
    const getPatternsMenu = useCallback(() => ({
        toggle: <div className="iconized wide right" >
            <Icon name="chevron-right"
                size="max"
                side="right"
                rotate={isMenuVisible.pattern ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isMenuVisible.pattern
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{FilterNames.PATTERN}</span>
        </div>,
        menu: <ul style={{ display: "grid", gridTemplateColumns: "1fr" }}>
            <li className={css.menuoption}>
                <Checkbox name={FilterNames.PATTERN}
                    disabled
                    onChangeChecked={onPatternsOptionChange}
                    className={`${css.checkbox}`}
                    titleClassName={css.checkbox__inner}>
                    <div className={css.checkbox__text}>
                        <p style={{ color: "#f00", fontSize: "75%" }}>Not available</p>
                    </div>
                </Checkbox>
            </li>
        </ul>,
    }), [isMenuVisible.pattern])

    //fitsMenu
    const onFitsOptionChange = (state: boolean, value: string) => {
        state
            ? dispatch(setFilter({ fits: [...current.fits, value] }))
            : dispatch(setFilter({ fits: [...current.fits.filter((fit) => fit !== value)] }))
    }
    const getFitsMenu = useCallback(() => ({
        toggle: <div className="iconized wide right" >
            <Icon name="chevron-right"
                size="max"
                side="right"
                rotate={isMenuVisible.fits ? 4 : 2}
                className={css.filter__btn__icon}
                containerClassName={isMenuVisible.fits
                    ? `${css.filter__btn} ${css._close}`
                    : css.filter__btn} />
            <span>{"FITS"}</span>
        </div>,
        menu: facets.fits &&
            <DefaultFilterMenu categoryOptions={facets.fits}
                selected={current.fits}
                onOptionChange={onFitsOptionChange} />,
    }), [isMenuVisible.fits, facets.fits, current.fits])

    const onFiltersMenuClick = useCallback(() => {
        dispatch(setModal("filtersMenu"))
    }, [dispatch])

    return <section className={css.sortfilterviewControls}>
        <form>
            <div className={css.sortfilters}>
                <section className={css.sort}>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.SORTBY}</legend>
                        <DropMenuOnClick type="sort"
                            toggle={getSortMenu().toggle}
                            menu={getSortMenu().menu}
                            isNeedToClosePrevious={isAnyOpen}
                            onToggle={onMenuToggle} />
                    </fieldset>
                </section>
                <section className={css.filters}>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.CONSCIOUS}</legend>
                        <DropMenuOnClick type="sustain"
                            toggle={getSustainMenu().toggle}
                            menu={getSustainMenu().menu}
                            isNeedToClosePrevious={isAnyOpen}
                            onToggle={onMenuToggle} />
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.SIZE}</legend>
                        <DropMenuOnClick type="size"
                            toggle={getSizesMenu().toggle}
                            menu={getSizesMenu().menu}
                            isNeedToClosePrevious={isAnyOpen}
                            onToggle={onMenuToggle} />
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.COLOR}</legend>
                        <DropMenuOnClick type="color"
                            toggle={getColorMenu().toggle}
                            menu={getColorMenu().menu}
                            isNeedToClosePrevious={isAnyOpen}
                            onToggle={onMenuToggle} />
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.PATTERN}</legend>
                        <DropMenuOnClick type="pattern"
                            toggle={getPatternsMenu().toggle}
                            menu={getPatternsMenu().menu}
                            isNeedToClosePrevious={isAnyOpen}
                            onToggle={onMenuToggle} />
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{"FITS"}</legend>
                        <DropMenuOnClick type="fits"
                            toggle={getFitsMenu().toggle}
                            menu={getFitsMenu().menu}
                            isNeedToClosePrevious={isAnyOpen}
                            onToggle={onMenuToggle} />
                    </fieldset>
                </section>
                <section className={css.allFilters}>
                    <fieldset className={css.block}>
                        <legend>{FilterNames.ALLFILTERS}</legend>
                        <div>
                            <div className="iconized wide right"
                                onClick={onFiltersMenuClick}>
                                <Icon name="filters"
                                    size="max"
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
                        <Toggle options={["Model", "Product"]}
                            className={css.toggle}
                            frameClassName={css.toggle__frame__view}
                            value={productsFirstImage}
                            onChangeOption={onViewToggle} />
                    </fieldset>
                    {device !== "mobile" && <fieldset className={css.block}>
                        <legend>Toggle Image Size</legend>
                        <Toggle options={["list1", "grid2", "grid3", "grid4",]}
                            value={productsLayout}
                            className={css.layout__toggle}
                            frameClassName={css.toggle__frame__layout}
                            onChangeOption={onLayoutToggle}
                            titles={layoutVariants} />
                    </fieldset>}                
                </section>
            </div>
        </form>
    </section>
}
