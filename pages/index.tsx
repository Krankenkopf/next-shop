import Link from "next/link"
import { MainLayout } from "../p-app/a1-ui/u1-components/cp4-layouts/MainLayout"

export default function Index({ history, props }: any) {
    console.log(history);
    
    return (
        <MainLayout>
            <div className="wrapper">
                <header>
                    <div>
                        <Link href="/posts">
                            <a>Posts</a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/about">
                            About
                        </Link>
                    </div>
                </header>
                <h1>Main</h1>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
        </MainLayout>
        
    )
}