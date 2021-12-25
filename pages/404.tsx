import Link from "next/link"
import Router, { useRouter } from "next/router"
import { LandingLayout } from "../src/a1-ui/u1-components/cp4-layouts/LandingLayout";

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
        <LandingLayout title={"Page Not Found"}>
                <h2>Page not found</h2>
                <p>Go to <span onClick = {backHadler}>previous</span> 
                </p>
        </LandingLayout>
    )
}