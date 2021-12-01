import React from "react"
import { FilterName } from "../../../../a0-common/c2-constants"
import { useAppDispatch, useAppSelector } from "../../../../a0-common/c3-hooks"
import { TFacets, TFiltersState } from "../../../../a2-bll/filters-reducer"
import { TNavigationState } from "../../../../a2-bll/navigation-reducer"
import { TSortState } from "../../../../a2-bll/sort-reducer"
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

    return <section className={css.sortfilterviewControls}>
        <form>
            <div className={css.sortfilters}>
                <section className={css.sort}>
                    <fieldset className={css.block}>
                        <legend>{FilterName.SORTBY}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right" size="full" side="right" className="icon__session" />
                                <span>{FilterName.SORTBY}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                </section>
                <section className={css.filters}>
                    <fieldset className={css.block}>
                        <legend>{FilterName.CONSCIOUS}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right" size="full" side="right" className="icon__session" />
                                <span>{FilterName.CONSCIOUS}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterName.SIZE}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right" size="full" side="right" className="icon__session" />
                                <span>{FilterName.SIZE}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterName.COLOR}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right" size="full" side="right" className="icon__session" />
                                <span>{FilterName.COLOR}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                    <fieldset className={css.block}>
                        <legend>{FilterName.PATTERN}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="chevron-right" size="full" side="right" className="icon__session" />
                                <span>{FilterName.PATTERN}</span>
                            </div>
                            <div></div>
                        </div>
                    </fieldset>
                </section>
                <section className={css.allFilters}>
                    <fieldset className={css.block}>
                        <legend>{FilterName.ALLFILTERS}</legend>
                        <div>
                            <div className="span__decorated right" >
                                <Icon name="filters" size="full" side="right" className="icon__session" />
                                <span>{FilterName.ALLFILTERS}</span>
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
                                <Icon name="grid-2" size="full" side="right" className="icon__session" />
                                <span></span>
                            </div>
                            <div className="span__decorated right" >
                                <Icon name="grid" size="full" side="right" className="icon__session" />
                                <span></span>
                            </div>
                            <div className="span__decorated right" >
                                <Icon name="grid-4" size="full" side="right" className="icon__session" />
                                <span></span>
                            </div>
                            <div className="span__decorated right" >
                                <Icon name="list" size="full" side="right" className="icon__session" />
                                <span></span>
                            </div>
                        </div>
                    </fieldset>
                </section>
            </div>

        </form>
    </section>
}