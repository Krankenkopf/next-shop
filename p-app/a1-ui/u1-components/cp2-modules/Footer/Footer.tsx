import Link from "next/link"
import React from "react"
import icon_fb from "../../../../../public/images/socials/icon_fb.svg"
import icon_tw from "../../../../../public/images/socials/icon_tw.svg"
import icon_ig from "../../../../../public/images/socials/icon_ig.svg"
import icon_yt from "../../../../../public/images/socials/icon_yt.svg"
import icon_pi from "../../../../../public/images/socials/icon_pi.svg"

export const Footer = React.memo(() => {
    const corporateTitles = ["Career at H&M", "About H&M", "Sustainability", "Press", "Investor Relations", "Corporate Governance"]
    const corporateMenu = corporateTitles.map((item) => {
        return (<li key={item}>
            <Link href="/"><a>{item}</a></Link>
        </li>)
    })
    const socialSrcs = [
        { src: icon_fb, title: "Facebook", href: "https://www.facebook.com/hmtheus" },
        { src: icon_tw, title: "Twitter", href: "https://twitter.com/hmusa" },
        { src: icon_ig, title: "Instagram", href: "https://www.instagram.com/hm/" },
        { src: icon_yt, title: "YouTube", href: "http://www.youtube.com/user/hennesandmauritz" },
        { src: icon_pi, title: "Pinterest", href: "https://www.pinterest.com/hm/" },
    ]
    const socialsList = socialSrcs.map((item) => {
        return (
            <li key={item.title}>
                <a href={item.href} title={item.title}>               
                    <div className="icon-socials">
                        <object type="image/svg+xml" data={item.src.src}></object>
                    </div>
                    <div></div>
                </a>
            </li>
        )
    })
    const helpTitles = ["Customer Service", "My Account", "Find a Store", "Legal & Privacy", "Contact", "Gift Card", "CA Supply Chains Act", "California Privacy Rights", "Cookie Settings"]
    const helpMenu = helpTitles.map((item) => {
        return (<li key={item}>
            <Link href="/"><a>{item}</a></Link>
        </li>)
    })
    const shopCategories = [
        { href: "/ladies", title: "Ladies" },
        { href: "/divided", title: "Divided" },
        { href: "/men", title: "Men" },
        { href: "/babies", title: "Babies" },
        { href: "/kids", title: "Kids" },
        { href: "/household", title: "H&M HOME" },
        { href: "/unidays", title: "Student Discount" },
    ]
    const shopLinks = shopCategories.map((item, i, arr) => {
        return <li key={item.title}>
                    <Link href={item.href}>
                        <a>{item.title}</a>
                    </Link>
                </li>
    })
    return (
        <footer className="footer">
            <div className="footer-content">
                <nav className="footer-menu-shop">
                    <h4>SHOP</h4>
                    <ul>
                        {shopLinks}
                    </ul>
                </nav>
                <nav className="footer-menu-corporate">
                    <h4>CORPORATE INFO</h4>
                    <ul>
                        {corporateMenu}
                    </ul>
                </nav>
                <nav className="footer-menu-help">
                    <h4>HELP</h4>
                    <ul>
                        {helpMenu}
                    </ul>
                </nav>
                <section className="footer-newsletter">
                    <h4>Become a member</h4>
                    <p>
                        Join now and get 10% off your next purchase!
                    </p>
                    <Link href="/"><a>
                        READ MORE →
                    </a></Link>
                </section>
            </div>
            <div className="footer-social">
                <ul>
                    {socialsList}
                </ul>
            </div>
            <div className="footer-copyright">
                <p>
                    The content of this site is copyright-protected and is the property of H&M Hennes & Mauritz AB. Used for nonprofit educational purposes.
                </p>
            </div>
            <div className="footer-logo">
                <Link href="/">
                    <div id="logo">
                        <svg width="323" height="42" viewBox="0 0 323 42" fill="#222">
                            <title>H&amp;M</title>
                            <path className="logo" d="M172.407 1.439c.031 1.497-.19 3.483-.347 4.925-.855 7.82-2.284 14.21-2.393 22.24 3.762-9.78 6.92-16.575 10.982-24.947 1.29-2.663 2.112-2.168 3.173-2.642 4.129-1.844 4.284-.71 3.744 1.542-2.004 8.358-7.125 34.668-7.908 38.718-.228 1.173-1.496.676-1.826.218-1.47-2.04-3.126-2.071-2.94-3.428.922-6.756 4.238-23.702 5.102-27.695-4.41 9.072-8.98 20.412-11.327 26.842-.497 1.365-1.404 1.266-1.969.266-.794-1.403-2.333-2.12-2.588-3.778-.807-5.273.922-15.323 1.162-21.68-2.4 6.944-6.429 20.429-8.194 26.522-.73 2.52-3.152 2.11-2.508-.348 2.682-10.224 8.459-28.307 10.96-34.81.589-1.527 2.127-1.475 3.406-2.108 2.302-1.14 3.446-.988 3.471.163zm-22.522-.145c1.387-.239 3.644-1.463 4.424-1.274.73.176.671 1.04.225 2.222-1.318 3.486-3.145 8.065-5.234 13.465 1.314-.15 2.027-.2 2.027-.2 1.884-.235 2.236.711 1.705 1.719-.423.803-.933.268-2.696 2.907-.996 1.488-2.617 1.881-3.519 2.08-2.172 5.77-4.497 12.208-6.76 19.07-.328.998-1.289.78-1.578.373-1.062-1.489-1.845-1.537-2.67-2.741-.097-.195-.291-.46-.174-.939.605-2.484 2.212-7.586 4.657-14.304-3.08.67-6.412 1.39-7.787 1.712a614.858 614.858 0 0 0-4.786 13.114c-.946 2.693-3.41 2.172-2.545-.372a442.816 442.816 0 0 1 4.42-12.348c-1.706-.182-2.283-1.392-3.236-2.402-.369-.391-1.172-.336-1.564-.883-.708-.984-.637-1.42.996-1.893a161.61 161.61 0 0 1 6.425-1.721c2.76-7.149 5.253-13.281 6.582-16.553 1.024-2.522 3.665-2.287 2.662.2-2.039 5.055-4.13 10.307-6.192 15.632 2.885-.65 5.467-1.148 7.673-1.527a396.956 396.956 0 0 1 5.937-14.456c.145-.333.568-.806 1.008-.88zm1.624 29.78c.169-.163.334-.323.494-.461 1.134-.985 2.215-.008 1.095 1.658-.24.358-.514.742-.812 1.122.141.404.268.754.369 1.012.578 1.49-.94 1.863-1.431.63l-.135-.346c-.923.821-1.991 1.34-3.132.984-1.88-.586-2.356-3.241-.602-5.287a38.362 38.362 0 0 1 1.675-1.844 43.18 43.18 0 0 1-.312-1.062c-.228-.829-.434-1.794.392-2.777 1.547-1.845 5.14-.208 3.323 2.631-.438.684-.95 1.33-1.484 1.985.178.566.369 1.164.56 1.755zM10.519 21.29H2.147v7.165H0V13.256h2.147v5.971h8.372v-5.97h2.147v15.198h-2.147V21.29zm17.171-2.063v2.063h-4.936v5.102h6.654v2.064h-8.8v-15.2h8.585v2.062h-6.44v3.91h4.937zm10.71-1.932v11.16h-2.146V13.256h1.501l9.017 11.161v-11.16h2.147v15.198h-1.502L38.4 17.295zm20.607 0v11.16h-2.146V13.256h1.501l9.015 11.161v-11.16h2.148v15.198h-1.503l-9.015-11.16zm25.543 1.932v2.063h-4.937v5.102h6.654v2.064h-8.802v-15.2h8.588v2.062h-6.44v3.91h4.937zm8.778 5.429c.88 1.085 2.124 1.954 3.67 1.954 1.396 0 2.62-.912 2.62-2.28 0-2.323-3.178-2.584-5.174-3.91-1.074-.716-1.911-1.758-1.911-3.343 0-2.214 1.932-4.038 4.55-4.038 1.912 0 3.242.847 4.038 1.52l-1.267 1.585c-.816-.695-1.74-1.042-2.683-1.042-1.246 0-2.49.716-2.49 2.04 0 1.933 3.197 2.345 5.13 3.649 1.009.673 1.953 1.736 1.953 3.474 0 2.67-2.04 4.407-4.657 4.407-2.062 0-3.93-.912-5.26-2.54l1.481-1.476zm124.56.542h-1.502l-4.4-6.97v10.227h-2.147V13.256h1.503l5.795 9.271 5.796-9.27h1.502v15.198h-2.147V18.228l-4.4 6.97zm31.98-3.04v-8.902h2.147v9.01c0 1.434.344 2.324.945 2.997.752.847 1.868 1.347 3.134 1.347 1.267 0 2.383-.5 3.134-1.347.601-.673.945-1.563.945-2.997v-9.01h2.147v8.903c0 2.04-.601 3.452-1.567 4.516-1.138 1.237-2.813 1.997-4.659 1.997-1.846 0-3.52-.76-4.659-1.997-.965-1.064-1.566-2.475-1.566-4.516zm-9.184 2.389h-6.334l-1.567 3.909h-2.232l6.225-15.2h1.503l6.226 15.2h-2.234l-1.587-3.91zm-5.475-2.063h4.637l-2.318-5.646-2.319 5.646zm52.631 5.97V13.257h2.147v15.199h-2.147zm8.457-15.198H306.6v2.063h-4.078v13.136h-2.146V15.319h-4.08v-2.063zm16.184 0h10.089v1.411l-7.813 11.725H323v2.063h-11.162v-1.411l7.856-11.725h-7.213v-2.063zm-40.288 8.034v7.166h-2.147v-15.2h5.26c1.374 0 2.232.325 2.918.89a4.032 4.032 0 0 1 1.481 3.127c0 1.26-.577 2.389-1.48 3.127a3.588 3.588 0 0 1-1.76.803l5.387 7.253h-2.597l-5.345-7.166h-1.717zm3.006-2.063c.966 0 1.458-.217 1.803-.564.343-.348.557-.848.557-1.39 0-.542-.214-1.043-.557-1.39-.345-.348-.837-.565-1.803-.565h-3.006v3.91h3.006zm-125.924 12.21c-.924 1.274-.377 1.727.31 1.306.217-.133.432-.296.646-.474-.164-.48-.326-.97-.481-1.45-.16.205-.32.405-.475.619zm1.047-4.2c.16-.167.32-.337.491-.532 1.144-1.295-1.117-1.838-.596.145.028.11.065.244.105.386z" />
                        </svg>
                    </div>
                </Link>
            </div>
            <div className="country-info">
                United States | $
            </div>
        </footer >
    )
})