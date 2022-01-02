import Head from "next/head"
import Router from "next/router"
import { TCategory, TPageMeta } from "../../src/a0-common/c1-types/t1-instance"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { UnderConstruction } from "../../src/a1-ui/u1-components/cp1-elements/el19-UnderConstruction/UnderConstruction"
import { Banner } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Banner"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"
import campaigndivided01 from "../../public/images/campaigndivided01.jpg"
import campaigndivided02 from "../../public/images/campaigndivided02.jpg"
import campaigndivided03 from "../../public/images/campaigndivided03.jpg"
import { Campaign } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Campaign"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"

export default function Divided({history}: any) {
    const categories = useAppSelector(state => state.categories)
    const category = useAppSelector<TCategory>(state => selectPageCategory(state, "divided"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "divided"))
    return (
        <MainLayout title={pageMeta.title} categories={categories} history={history}>
            <ProductLayout
            category={category}
            rootCategoryName={pageMeta.path}>
            <div className="page-content">
                <Banner title="Up to 60% off new-to-sale styles" red />
                <Campaign
                    title="True to You denim"
                    text="The skinny fit that adapts to your body"
                    buttonTitle="SHOP SKINNY JEANS"
                    img={campaigndivided01}
                    imgAltText="campaigndivided01" />
                <Banner title="Become an H&M Member & get 10% off your first purchase + rewards just for shopping!">
                    <p>Don't forget to opt into Fashion News to have your offers and rewards delivered right to your inbox!</p>
                </Banner>
                <Campaign
                    title="Winter dresses"
                    text="Add some drama to every day & holidays"
                    img={campaigndivided02}
                    imgAltText="campaigndivided02" />
                <Campaign
                    title="A wintry mix"
                    text="An après ski-inspired collection with Y2K influences & monochrome graphics"
                    img={campaigndivided03}
                    imgAltText="campaigndivided03" />
            </div>
        </ProductLayout>
        </MainLayout>
        
    )
}