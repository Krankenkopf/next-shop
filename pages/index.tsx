import Link from "next/link"
import React, { MouseEventHandler, useState } from "react";
import Button from "../src/a1-ui/u1-components/cp1-elements/el02-Button/Button";
import { Timer } from "../src/a1-ui/u1-components/cp1-elements/el20-Timer/Timer";
import { LandingLayout } from "../src/a1-ui/u1-components/cp4-layouts/LandingLayout";
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

export default function Index({ history, props }: any) {
    console.log(history);
    const carouselSources = [
        { title: "", p: "", src: images[0] },
        { title: "", p: "", src: images[1] },
        { title: "", p: "", src: images[2] },
        { title: "", p: "", src: images[3] },
        { title: "", p: "", src: images[4] },
        { title: "", p: "", src: images[5] },
        { title: "", p: "", src: images[6] },
        { title: "", p: "", src: images[7] },
        { title: "", p: "", src: images[8] },
        { title: "", p: "", src: images[9] },
        { title: "", p: "", src: images[10] },
        { title: "", p: "", src: images[11] },
        { title: "", p: "", src: images[12] },
        { title: "", p: "", src: images[13] },
        { title: "", p: "", src: images[14] },
        { title: "", p: "", src: images[15] },
    ]
    const [stage, setStage] = useState('0');
    const setStageHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setStage(e.currentTarget.value)
    }

    const carousel = carouselSources.map((item) => {
        return (
            <li key={item.src} className="carousel__item__container">
                <Link href="/">
                    <a>
                        <div className="carousel__item">
                            <div className="carousel__imgContainer">
                                <img src={item.src} alt="carouselImg" />
                            </div>
                            <h5>{item.title}</h5>
                            <p>{item.p}</p>
                        </div>
                    </a>
                </Link>
            </li>
        )
    })
    return (
        <LandingLayout>
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
            <section id="carousel"> {/*HARDCODED to 16 items, no responsive!!!*/}
                <h3>Trendin' rait nau</h3>
                <div className="carousel" style={{ transform: `translateX(${-100 * (+stage)}%)` }} >
                    <ul>
                        {carousel}
                    </ul>
                </div>
                <div className="carousel__controls">
                    <ul>
                        <li><button value={'0'}
                            onClick={setStageHandler}
                            style={stage === "0" ? { backgroundColor: "#E50010", borderColor: "#E50010" } : undefined}
                            className="carousel__controls__button" /></li>
                        <li><button value={'1'}
                            onClick={setStageHandler}
                            style={stage === "1" ? { backgroundColor: "#E50010", borderColor: "#E50010" } : undefined}
                            className="carousel__controls__button" /></li>
                        <li><button value={'1.333333333'}
                            onClick={setStageHandler}
                            style={stage === "1.333333333" ? { backgroundColor: "#E50010", borderColor: "#E50010" } : undefined}
                            className="carousel__controls__button" /></li>
                    </ul>
                </div>
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
        </LandingLayout>
    )
}