import { useRouter } from "next/router"
import React, { FC, useEffect } from "react"
import { Nullable } from "../../../../../a0-common/c1-types/t1-instance"
import { TProduct } from "../../../../../a0-common/c1-types/t1-instance/TProduct"
import { useAppDispatch, useAppSelector } from "../../../../../a0-common/c3-hooks"
import { TRequestStatus } from "../../../../../a2-bll/app-reducer"
import { TNavigationState } from "../../../../../a2-bll/navigation-reducer"
import { clearProducts, getProducts } from "../../../../../a2-bll/products-reducer"
import { Paginator } from "../../../cp1-elements/el08-Paginator/Paginator"
import { Preloader } from "../../../cp1-elements/el11-Preloader/Preloader"
import { Filters } from "../../Filters/Filters"
import { ProductsList } from "../ProductsList/ProductsList"

type TProductsContentProps = {
    productsSS: Nullable<Array<TProduct>>
}

export const ProductsContent: FC<TProductsContentProps> = ({ productsSS }) => {
    const dispatch = useAppDispatch()
    const { pathname, query, asPath } = useRouter()
    const status = useAppSelector<TRequestStatus>(state => state.app.status)
    const { currentPage, category, pageSize, numberOfPages, totalNumberOfResults } = useAppSelector<TNavigationState>(state => state.navigation)
    const products = useAppSelector<Nullable<Array<TProduct>>>(state => state.products.products)

    useEffect(() => {
        const onLoad = async () => {
            const queryCategories = query.categories as Array<string>
            dispatch(getProducts(pathname, queryCategories))
        }
        if (!productsSS) {
            console.log("client");
            onLoad()
        }
        return () => { dispatch(clearProducts()) }
    }, [asPath])
    //useEffect(() => , [])

    return <>
        <header style={{paddingLeft: "15px", marginBottom: "25px"}}>
            <h3>{category?.CatName}</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque voluptate, veritatis exercitationem ipsam atque quos ut molestias id possimus dolores dicta nemo! Nemo, asperiores cumque. Optio quibusdam molestias reprehenderit explicabo?</p>
        </header>
        <Filters />
        <div className="products-list__container">
            {products && <ProductsList products={products} />}
            {products && <div className="products-list__paginator">
            <Paginator currentPage={currentPage+1}
                itemsPerPage={pageSize}
                itemsTotalCount={totalNumberOfResults}
                setCurrentPage={() => { }} />
            </div>}
            <Preloader isVisible={status === "loading"} />
        </div>
    </>
}