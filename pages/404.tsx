import Link from "next/link"
import Router, { useRouter } from "next/router"
import { ProductLayout } from "../p-app/a1-ui/u1-components/cp4-layouts/ProductLayout"

export default function NotFound({ history, props }: any) {
    const router = useRouter()
    console.log(history);
    
    const backHadler = () => {
        if (!history || !history.length || history.length === 1) { //fix that!
        router.push('/');
      } else {
        router.push(history[history.length - 1]);
      }
    }
    
    return (
        <ProductLayout title={"Page Not Found"}>
            <main>
                <h2>Page not found</h2>
                <p>Go to <span onClick = {backHadler}>previous</span> 
                </p>
            </main>
        </ProductLayout>
    )
}