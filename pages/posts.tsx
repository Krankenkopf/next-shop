import Router from "next/router";
import Link from "next/link"

export default function Posts() {
    return <>
    <div>Posts</div>
    <button onClick = {() => Router.push("/")}>Go to main</button>
    <p><Link href="/post/1">Post1</Link></p>
    <p><Link href="/post/2">Post2</Link></p>
    <p><Link href="/post/3">Post3</Link></p>
    </>
}