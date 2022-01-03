import Router from "next/router"
import { TCategory, TPageMeta } from "../../src/a0-common/c1-types/t1-instance"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { Banner } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Banner"
import { Campaign } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Campaign"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"
import campaignkids01 from "../../public/images/campaignkids01.jpg"
import campaignkids02 from "../../public/images/campaignkids02.jpg"
import campaignbaby03 from "../../public/images/campaignbaby03.jpg"
import { MainLayout } from "../../src/a1-ui/u1-components/cp4-layouts/MainLayout"

export default function Kids({ history }: any) {
    const categories = useAppSelector(state => state.categories)
    const category = useAppSelector<TCategory>(state => selectPageCategory(state, "kids"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "kids"))
    return (
        <MainLayout title={pageMeta.title} categories={categories} history={history}>
            <ProductLayout category={category}
                rootCategoryName={pageMeta.path}>
                <div className="page-content">
                    <Banner title="Up to 60% off new-to-sale styles" red />
                    <Campaign
                        preTitle="Online deal"
                        title={`Kids' faves — now from $9.99`}
                        text="Valid on select items at hm.com until 1/12/2022 or while supplies last"
                        img={campaignkids01}
                        imgAltText="campaignkids01" />
                    <Banner title="Become an H&M Member & get 10% off your first purchase + rewards just for shopping!">
                        <p>Don't forget to opt into Fashion News to have your offers and rewards delivered right to your inbox!</p>
                    </Banner>
                    <Campaign
                        preTitle="Online deal"
                        title={`Kids' faves — now from $12.99`}
                        text="Valid on select items at hm.com until 1/12/2022 or while supplies last"
                        img={campaignkids02}
                        imgAltText="campaignkids02" />
                    <Campaign
                        title="Kinder cotton for kids"
                        text="All organic, recycled or sourced through the Better Cotton Initiative (BCI)"
                        buttonTitle="LEARN MORE"
                        img={campaignbaby03}
                        imgAltText="campaignbaby03" />
                    <p className="paragraph">
                        {`Refill on their everyday essentials with our kids' clothes. You'll find an extensive selection of kids' tops and T-Shirts featuring colors that pop, plus adorable designs to suit their personality. Pair their favorite cardigan or sweater with our kids' jeans and pants – you'll find an array of cuts and styles, including chinos and cargo pants, to name a few. outdoor adventures on the cards? No problem. Keep chills at bay and little ones warm with our standout edit of kids' jackets and coats – and don't forget to scroll our kids' shoes for wellington boots, trendy sneakers and summer sandals.`}
                    </p>
                </div>
            </ProductLayout>
        </MainLayout>
    )
}
