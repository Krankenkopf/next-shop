import { useRouter } from "next/dist/client/router"
import Router from "next/router";

export default function Post() {
    const router = useRouter()
    // ----
    const a = !'ss' ? 'f' : 'f'
    let f = '5'
    f = f + "#FF00AA"
    const obj = new Object()
    // ----
    return <>
     <h1>{`Post ${router.query.id}`}</h1>
     <button onClick = {() => Router.push("/")}>Go to main</button>
     <button onClick = {() => Router.push("/posts")}>Go to posts</button>
    </>
   
}
