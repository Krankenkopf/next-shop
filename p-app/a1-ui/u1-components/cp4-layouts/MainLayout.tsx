import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import logo from "./../../../../public/images/handm.svg"
import Head from "next/head"

export const MainLayout = ({ children, title = 'Noname Shop' }: any) => {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{title} | Noname Shop</title>
                <meta name="keywords" content="some_keyword,another_keyword"></meta>
                <meta name="description" content="some description"></meta>
                <meta charSet="utf-8" />
            </Head>
            <header style={{ display: "flex", justifyContent: "space-around" }}>
                <Link href="/">
                <div id="logo">
                    <svg width="93" height="61" viewBox="0 0 370 244">
                        <title>H&amp;M</title>
                        <path className="logo" d="M259.895 7.413c13.424-6.618 20.087-5.737 20.232.946.19 8.7-1.098 20.23-2.016 28.604-4.983 45.423-13.32 82.543-13.954 129.19 21.94-56.802 40.345-96.278 64.03-144.909 7.53-15.47 12.325-12.593 18.503-15.343 24.082-10.715 24.984-4.133 21.837 8.95-11.686 48.552-41.54 201.376-46.114 224.907-1.328 6.807-8.715 3.923-10.644 1.26-8.57-11.85-18.225-12.036-17.14-19.919 5.37-39.233 24.71-137.666 29.75-160.863-25.719 52.696-52.37 118.566-66.053 155.914-2.907 7.931-8.188 7.35-11.48 1.546-4.63-8.15-13.61-12.312-15.093-21.943-4.702-30.628 5.37-89.003 6.773-125.936-13.994 40.342-37.49 118.67-47.782 154.057-4.256 14.643-18.382 12.253-14.627-2.018 15.642-59.389 49.326-164.425 63.915-202.198 3.427-8.874 12.406-8.569 19.863-12.245zM174.6.115c4.26 1.025 3.913 6.05 1.31 12.912-7.682 20.247-18.335 46.847-30.516 78.212 7.658-.874 11.811-1.17 11.811-1.17 10.994-1.358 13.041 4.139 9.946 9.99-2.466 4.664-5.436 1.554-15.724 16.89-5.796 8.642-15.259 10.924-20.515 12.076-12.662 33.523-26.23 70.916-39.415 110.77-1.919 5.804-7.524 4.532-9.209 2.174-6.192-8.647-10.758-8.933-15.558-15.927-.577-1.132-1.706-2.672-1.027-5.448 3.53-14.425 12.901-44.067 27.156-83.091-17.958 3.892-37.387 8.076-45.408 9.94-9.626 25.445-19.014 50.967-27.908 76.18-5.518 15.64-19.88 12.617-14.84-2.165 8.028-23.548 16.89-48.004 25.776-71.72-9.948-1.063-13.313-8.088-18.873-13.958-2.147-2.267-6.828-1.948-9.12-5.127-4.123-5.711-3.712-8.248 5.81-10.996a955.318 955.318 0 0 1 37.464-9.998c16.09-41.524 30.63-77.144 38.38-96.151C90.114-1.138 105.514.226 99.664 14.674c-11.889 29.363-24.079 59.867-36.11 90.799a880.98 880.98 0 0 1 44.748-8.87 2312.644 2312.644 0 0 1 34.62-83.968c.845-1.937 3.31-4.678 5.878-5.118 8.092-1.385 21.251-8.498 25.8-7.402zm-27.552 190.077c1.265-.773 2.524-1.715 3.767-2.75a756.514 756.514 0 0 1-2.82-8.468 139.528 139.528 0 0 0-2.752 3.638c-5.386 7.396-2.197 10.028 1.805 7.58zm7.167-35.065c6.67-7.53-6.516-10.681-3.48.836.17.65.382 1.413.62 2.254a98.19 98.19 0 0 0 2.86-3.09zm6.941 22.695c6.602-5.721 12.908-.046 6.38 9.628-1.404 2.08-2.99 4.318-4.729 6.522a193.17 193.17 0 0 0 2.146 5.877c3.375 8.654-5.488 10.824-8.345 3.656-.25-.626-.51-1.297-.778-1.995-5.387 4.772-11.618 7.777-18.275 5.707-10.954-3.407-13.74-18.83-3.514-30.711 4.103-4.767 7.191-8.074 9.771-10.716a251.947 251.947 0 0 1-1.819-6.17c-1.328-4.81-2.527-10.416 2.287-16.13 9.027-10.712 29.971-1.203 19.377 15.289-2.552 3.972-5.535 7.724-8.647 11.527a979.555 979.555 0 0 0 3.26 10.18 78.304 78.304 0 0 1 2.886-2.664z"/>
                    </svg>
                </div>
                </Link>
                <div id="search"></div>
                <div id="userbar"></div>
            </header>
            <nav style={{display: "flex", justifyContent: "space-around"}}>
                <div><Link href="/ladies">Ladies</Link></div>
                <div><Link href="/divided">Divided</Link></div>
                <div><Link href="/men">Men</Link></div>
                <div><Link href="/babies">Babies</Link></div>
                <div><Link href="/kids">Kids</Link></div>
                <div><Link href="/household">H&M Home</Link></div>
                <div><Link href="/sale">Sale</Link></div>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}