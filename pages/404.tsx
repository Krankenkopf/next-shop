import Link from "next/link"
import Router, { useRouter } from "next/router"
import { useAppSelector } from "../src/a0-common/c3-hooks";
import { MainLayout } from "../src/a1-ui/u1-components/cp4-layouts/MainLayout";

export default function NotFound({ history, props }: any) {
    const router = useRouter()
    const categories = useAppSelector(state => state.categories)
    
    const backHadler = () => {
        if (!history || !history.length || history.length === 1) { //fix that!
        router.push('/');
      } else {
        router.push(history[history.length - 1]);
      }
    }
    
    return (
        <MainLayout title={"Page Not Found"} categories={categories} history={history}>
                <h2>Page not found</h2>
                <p>Go to <span onClick = {backHadler}>previous</span> 
                </p>
        </MainLayout>
    )
}