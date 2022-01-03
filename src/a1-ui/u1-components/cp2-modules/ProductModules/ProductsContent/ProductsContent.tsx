import { useRouter } from "next/router"
import React, { FC, useEffect, useState } from "react"
import { Nullable } from "../../../../../a0-common/c1-types/t1-instance"
import { TCheckedProduct } from "../../../../../a0-common/c1-types/t1-instance/TCheckedProduct"
import { TProduct } from "../../../../../a0-common/c1-types/t1-instance/TProduct"
import { useAppDispatch, useAppSelector } from "../../../../../a0-common/c3-hooks"
import { TRequestStatus } from "../../../../../a2-bll/app-reducer"
import { setProductsLayout, TLayoutState } from "../../../../../a2-bll/layout-reducer"
import { TNavigationState } from "../../../../../a2-bll/navigation-reducer"
import { clearProducts, getProducts } from "../../../../../a2-bll/products-reducer"
import { selectAppStatus, selectCartItems } from "../../../../../a2-bll/selectors"
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
    const status = useAppSelector<TRequestStatus>(selectAppStatus)
    const { currentPage, category, pageSize, numberOfPages, totalNumberOfResults } = useAppSelector<TNavigationState>(state => state.navigation)
    const { device, productsLayout, productsFirstImage } = useAppSelector<TLayoutState>(state => state.layout)
    const products = useAppSelector<Nullable<Array<TProduct>>>(state => state.products.products)
    const cart = useAppSelector<Array<TCheckedProduct>>(selectCartItems).map((product) => product.code)
    const [favorites, setFavorites] = useState<Array<string>>([]);
    
    useEffect(() => {
        const onLoad = async () => {
            const queryCategories = query.categories as Array<string>
            dispatch(getProducts(pathname, queryCategories))
        }
        if (!productsSS) {
            console.log("client");
            onLoad()
        }
    }, [asPath])
    
    useEffect(() => {
        switch (device) {
            case ("mobile"): {
                if (productsLayout !== "list1") {
                    dispatch(setProductsLayout("list1"))
                }
                break
            }
            case ("tablet"): {
                if (productsLayout !== "grid2") {
                    dispatch(setProductsLayout("grid2"))
                }
                break
            }
            case ("laptop"): {
                if (productsLayout !== "grid3") {
                    dispatch(setProductsLayout("grid3"))
                }
                break
            }
            case ("desktop"): {
                if (productsLayout !== "grid4") {
                    dispatch(setProductsLayout("grid4"))
                }
                break
            }
        }
    }, [device])

    return <>
        {products && <>
        <header style={{paddingLeft: "15px", marginBottom: "25px"}}>
            <h3>{category?.CatName}</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque voluptate, veritatis exercitationem ipsam atque quos ut molestias id possimus dolores dicta nemo! Nemo, asperiores cumque. Optio quibusdam molestias reprehenderit explicabo?</p>
        </header>
            <Filters />
        </>}
        <div className="products-list__container">
            {products && <ProductsList products={products} favorites={favorites} cart={cart} device={device} layout={productsLayout} firstImg={productsFirstImage}/>}
            {products && <div className="products-list__paginator">
            <Paginator currentPage={currentPage+1}
                itemsPerPage={pageSize}
                itemsTotalCount={totalNumberOfResults}
                setCurrentPage={() => { }} />
            </div>}
            <Preloader isVisible={status === "content loading"} />   
        </div>
    </>
}
