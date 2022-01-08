import Link from "next/link"
import React, { MouseEventHandler, useEffect, useMemo, useState } from "react";
import Button from "../src/a1-ui/u1-components/cp1-elements/el02-Button/Button";
import { Timer } from "../src/a1-ui/u1-components/cp1-elements/el20-Timer/Timer";
import { MainLayout } from "../src/a1-ui/u1-components/cp4-layouts/MainLayout";
import campaign01 from "../public/images/campaign01.jpg"
import campaign02 from "../public/images/campaign02.jpg"
import campaign03 from "../public/images/campaign03.jpg"
import { images } from "../public/images/carousel/carousel"
import magazine01 from "../public/images/magazine01.jpg"
import magazine02 from "../public/images/magazine02.jpg"
import magazine03 from "../public/images/magazine03.jpg"
import { Usp } from "../src/a1-ui/u1-components/cp2-modules/Ads/Usp";
import { Banner } from "../src/a1-ui/u1-components/cp2-modules/Ads/Banner";
import { Campaign } from "../src/a1-ui/u1-components/cp2-modules/Ads/Campaign";
import { useAppSelector } from "../src/a0-common/c3-hooks";
import { useRouter } from "next/router";
import { Carousel } from "../src/a1-ui/u1-components/cp1-elements/el13-Carousel/Carousel";
import { Icon } from "../src/a1-ui/u1-components/cp1-elements/el10-Icons/Icon";

const carouselSources = [
        { title: "Women", p: "Pants", src: images[0], link: "/ladies", },
        { title: "Women", p: "Tops", src: images[1], link: "/ladies", },
        { title: "Women", p: "Shirts & Blouses", src: images[2], link: "/ladies", },
        { title: "Women", p: "Jeans", src: images[3], link: "/ladies", },
        { title: "Women", p: "Jackets & Coats", src: images[4], link: "/ladies", },
        { title: "Women", p: "Hoodies & Sweatshirts", src: images[5], link: "/ladies", },
        { title: "Women", p: "Dresses", src: images[6], link: "/ladies", },
        { title: "Women", p: "Cardigans & Sweaters", src: images[7], link: "/ladies", },
        { title: "Men", p: "T-shirts & Tanks", src: images[8], link: "/men", },
        { title: "Men", p: "Pants", src: images[9], link: "/men", },
        { title: "Men", p: "Cardigans & Sweaters", src: images[10], link: "/men", },
        { title: "Baby", p: "Clothing", src: images[11], link: "/baby", },
        { title: "Kids", p: "New Arrivals", src: images[12], link: "/kids", },
        { title: "Kids", p: "Outerwear", src: images[13], link: "/kids", },
        { title: "Kids", p: "Girls", src: images[14], link: "/kids", },
        { title: "Kids", p: "Boys", src: images[15], link: "/kids", },
    ]

export default function Index({ history, props }: any) {
    const router = useRouter()
    const device = useAppSelector(state => state.layout.device)
    const categories = useAppSelector(state => state.categories)
    
    const carouselItems = carouselSources.map((item) => {
        return (
            <Link href={item.link} >
                <a className="carousel-item">
                    <div className="carousel__imgContainer">
                        <img src={item.src} alt="carouselImg" />
                    </div>
                    <h4>{item.title}</h4>
                    <p>{item.p}</p>
                </a>
            </Link>
        )
    })
    const carouselArrows = [
        <div className="iconized">
            <Icon name="chevron-right" side="left" rotate={3} />
        </div>,
        <div className="iconized right">
            <Icon name="chevron-right" side="right" />
        </div>
    ]
    const carouselViewSize = useMemo(() => {
        switch (device) {
            case ("mobile"): return 2
            case ("tablet"): return 4
            case ("laptop"): return 6
            case ("desktop"): return 8
        }
    }, [device])


    useEffect(() => {
        if (router.asPath !== "/") {
            router.push("/")
        }
    }, [router.asPath])
    return (
        <MainLayout title="H&M" categories={categories} history={history}>
            <Usp />
            <Banner title="Member perk: 20% off $75 + free shipping">
                <div>
                    TIME FLIES:
                </div>
                <div>
                    <Timer endDate={"Jan 18, 2022 00:00:00"} />
                </div>
            </Banner>
            <Campaign title="Cozy Combinashnz"
                text="Soft, layerable knits to see you through winter"
                img={campaign01}
                imgAltText="campaign01" />
            <section id="carousel">
                <h3>Trendin' rite now</h3>
                <Carousel items={carouselItems} itemsPerView={carouselViewSize} arrows={carouselArrows} />
            </section>
            <Banner title="Let us upgrade you! Become an H&amp;M Member &amp; get 10% off your first purchase + rewards just for shopping">
                <p>
                    Don't forget to opt into Fashion News to have your offers and rewards delivered right to your inbox!
                </p>
            </Banner>
            <Campaign title="The best kind of basic"
                text="Just-in hoodies, joggers, sweatshirts &amp; more"
                img={campaign02}
                imgAltText="campaign02" />
            <Campaign title="The best kind of basic"
                text="Just-in hoodies, joggers, sweatshirts &amp; more"
                img={campaign03}
                imgAltText="campaign03" />
            <section id="magazine">
                <div>
                    <h3>MAGAZINE</h3>
                    <h6>A WORLD OF INSPIRATION</h6>
                    <Link href="/">
                        <a className="dashed">READ H&M MAGAZINE</a>
                    </Link>
                    <div className="magazine__articles">
                        <ul>
                            <li>
                                <Link href="/"><a>
                                    <div className="magazine__imgContainer">
                                        <img src={magazine01.src} alt="magazine01" />
                                    </div>
                                    <h5>INSIDE H&M</h5>
                                    <h4>Presenting: Edition by<br />John Boyega</h4>
                                    <span>READ THE EX₡ITIN' STORI →</span>
                                </a></Link>
                            </li>
                            <li>
                                <Link href="/"><a>
                                    <div className="magazine__imgContainer">
                                        <img src={magazine02.src} alt="magazine02" />
                                    </div>
                                    <h5>INSIDE H&M</h5>
                                    <h4>Designed by</h4>
                                    <span>READ THE EX₡ITIN' STORI →</span>
                                </a></Link>
                            </li>
                            <li>
                                <Link href="/"><a>
                                    <div className="magazine__imgContainer">
                                        <img src={magazine03.src} alt="magazine03" />
                                    </div>
                                    <h5>INSIDE H&M</h5>
                                    <h4>Coming this spring:<br />Iris Apfel x H&M</h4>
                                    <span>READ THE EX₡ITIN' STORI →</span>
                                </a></Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}
