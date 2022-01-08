import Link from "next/link"
import React from "react"
import icon_fb from "../../../../../public/images/socials/icon_fb.svg"
import icon_tw from "../../../../../public/images/socials/icon_tw.svg"
import icon_ig from "../../../../../public/images/socials/icon_ig.svg"
import icon_yt from "../../../../../public/images/socials/icon_yt.svg"
import icon_pi from "../../../../../public/images/socials/icon_pi.svg"
import { Accordeon } from "../../cp1-elements/el05-Accordeon/Accordeon"
import { BrandIcon } from "../../cp1-elements/el10-Icons/BrandIcon"

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
        { href: "/baby", title: "Babies" },
        { href: "/kids", title: "Kids" },
        { href: "/home", title: "H&M HOME" },
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
            <div className="footer-content-mobile">
                <nav>
                    <Accordeon toggle={<h4>SHOP</h4>}>
                        {shopLinks}
                        <li className="dash"></li>
                    </Accordeon>
                </nav>
                <nav>
                    <Accordeon toggle={<h4>CORPORATE INFO</h4>}>
                        {corporateMenu}
                        <li className="dash"></li>
                    </Accordeon>
                </nav>
                <nav>
                    <Accordeon toggle={<h4>HELP</h4>}>
                        {helpMenu}
                        <li className="dash"></li>
                    </Accordeon>
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
                    <div className="iconized">
                        <BrandIcon name="handmfull" size="full"/>
                    </div>
                </Link>
            </div>
            <div className="country-info">
                United States | $
            </div>
        </footer >
    )
})
