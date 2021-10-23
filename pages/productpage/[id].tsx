import { useRouter } from "next/dist/client/router"
import Router from "next/router";
import { ProductDetail } from "../../p-app/a1-ui/u1-components/cp2-modules/ProductDetail/ProductDetail";
import { MainLayout } from "../../p-app/a1-ui/u1-components/cp4-layouts/MainLayout";

export default function ProductPage({ history }: any) {
    const router = useRouter()
    console.log(history);
    
    const backHadler = () => {
        if (!history || !history.length || history.length === 1) { //fix that!
            router.push('/');
        } else {
            router.push(history[history.length - 2]);
        }
    }
    return (
        <MainLayout>
            <h1>{`Product ${router.query.id}`}</h1>
            <button onClick={backHadler}>Go back</button>
            <ProductDetail />
        </MainLayout>
    )
}

// ProductPage.getInitialProps = async () => {
//     const response = await 
// }
