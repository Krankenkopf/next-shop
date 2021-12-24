import Router from "next/router"
import { TCategory, TPageMeta } from "../../src/a0-common/c1-types/t1-instance"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { UnderConstruction } from "../../src/a1-ui/u1-components/cp1-elements/el19-UnderConstruction/UnderConstruction"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"

export default function Ladies() {
    const category = useAppSelector<TCategory>(state => selectPageCategory(state, "ladies"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "ladies"))
    return (
        <ProductLayout title={pageMeta.title}
            category={category}
            rootCategoryName={pageMeta.path}>
            <main>
              <UnderConstruction />  
            </main>
        </ProductLayout>
    )
}