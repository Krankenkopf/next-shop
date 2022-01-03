import Head from "next/head"
import Router from "next/router"
import { TCategory, TPageMeta } from "../../src/a0-common/c1-types/t1-instance"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { UnderConstruction } from "../../src/a1-ui/u1-components/cp1-elements/el19-UnderConstruction/UnderConstruction"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"

export default function Sale(props: any) {
    const categories = useAppSelector(state => state.categories)
    const category = useAppSelector<TCategory>(state => selectPageCategory(state, "sale"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "sale"))
    return (
        <MainLayout title={pageMeta.title} categories={categories} history={props.history}>
            <ProductLayout>
                <Head>
                    <title>Sale | Noname Shop</title>
                </Head>
                <UnderConstruction />
            </ProductLayout>
        </MainLayout>
    )
}