import { NextPageContext } from "next";
import { AppContext } from "next/app";
import { useRouter } from "next/dist/client/router"
import Router from "next/router";
import { TProduct } from "../../src/a0-common/c1-types/t1-instance/TProduct";
import { jsonParser } from "../../src/a0-common/c4-utils/jsonParser";
import { ProductDetail } from "../../src/a1-ui/u1-components/cp2-modules/ProductModules/ProductDetail/ProductDetail";
import { ProductLayout } from "../../src/a1-ui/u1-components/cp4-layouts/ProductLayout";

type TProductPage = {
    history: Array<string>
    product: TProduct
}

export default function ProductPage({ history, product }: TProductPage)  {
    const router = useRouter()
    console.log(history);
    console.log(jsonParser());
    
    const backHadler = () => {
        if (!history || !history.length || history.length === 1) { // TODO: fix that!
            router.push('/');
        } else {
            router.push(history[history.length - 2]);
        }
    }
    return (
        <ProductLayout title={product.name}>
            <h1>{`Product ${router.query.id}`}</h1>
            <button onClick={backHadler}>Go back</button>
            <ProductDetail code={product.articles[0].code}
            name={product.name}
            price={product.price.formattedValue}
            imgSrc={product.images[0].url}/>
        </ProductLayout>
    )
}

ProductPage.getInitialProps = async (ctx: NextPageContext) => {
    const query = ctx.query
    try {
        const response = await fetch("http://localhost:4200/results")
        const products: TProduct[] = await response.json()
        const product = products && products.find(p => p.articles[0].code === query.id)
        return {product}
    }
    catch (e) {
        console.log(e);
        return {articles: ['0'], name: 'Not found', price: '0', imgSrc: ''}
    }
    
    
}
