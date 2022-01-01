import Router from "next/router"
import { Nullable, TCategory, TPageMeta } from "../../src/a0-common/c1-types/t1-instance"
import { TProduct } from "../../src/a0-common/c1-types/t1-instance/TProduct"
import { useAppSelector } from "../../src/a0-common/c3-hooks"
import { Banner } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Banner"
import { Campaign } from "../../src/a1-ui/u1-components/cp2-modules/Ads/Campaign"
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout"
import { selectPageCategory, selectPageMeta } from "../../src/a2-bll/selectors"
import campaignmen01 from "../../public/images/campaignmen01.jpg"
import campaignmen02 from "../../public/images/campaignmen02.jpg"
import campaignmen03 from "../../public/images/campaignmen03.jpg"

type TMenSSProps = {
    products: Nullable<Array<TProduct>>
}
type TMenProps = {
    history: Array<string>
}

export default function Men(props: TMenSSProps & TMenProps) {
    const category = useAppSelector<TCategory>(state => selectPageCategory(state, "men"))
    const pageMeta = useAppSelector<TPageMeta>(state => selectPageMeta(state, "men"))   
    return (
        <ProductLayout title={pageMeta.title}
                category={category}
                rootCategoryName={pageMeta.path}>
            <div className="page-content">
                <Banner title="Up to 60% off new-to-sale styles" red />
                <Campaign
                    title="We have a soft spot for knitwear"
                    text="New-season sweaters, turtlenecks, accessories & more"
                    img={campaignmen01}
                    imgAltText="campaignmen01" />
                <Banner title="Become an H&M Member & get 10% off your first purchase + rewards just for shopping!">
                    <p>Don't forget to opt into Fashion News to have your offers and rewards delivered right to your inbox!</p>
                </Banner>
                <Campaign
                    title="Easy does it"
                    text="Laid-back styles  for everyday wear"
                    img={campaignmen02}
                    imgAltText="campaignmen02" />
                <Campaign
                    title="Max legroom"
                    text="Give yourself some space. Casual pants in a contemporary, relaxed fit"
                    img={campaignmen03}
                    imgAltText="campaignmen03" />
                <p className="paragraph">
                    {`Check out all the freshest styles your closet needs in our men's clothing range. You'll find a roundup of everyday essentials, including tops and T-Shirts, as well as comfy lounge sets and underwear. Formal event coming up? Scroll no further than our men's blazers and suits for the sharpest looks and nail the dress code. When it comes to men's pants, there's chinos, joggers and cargo styles in all the staple colors. dreaming of denim? our men's jeans offer a range of fits to suit your style, including skinny, straight and tapered, to name just a few. Wear yours with a trendy oversized shirt or a classic denim number from our men's shirts edit. and when it comes to chilly weather, our men's jackets and coats have you covered – we've got puffer jackets and trench coats, as well as leather jackets and bomber jackets in year-round colors.`}
                </p>
            </div>   
        </ProductLayout>
    )
}
