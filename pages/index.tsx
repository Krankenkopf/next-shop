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
            <section id="unique_propositions" className="section-container">
                <ul>
                    <li><Link href="/">
                        <a>
                            Free shipping over $40: Select Expedited, Standard Ship to Store or UPS Access Point™ at checkout.
                        </a>
                    </Link></li>
                    <li><Link href="/">
                        <a>Become a Loyalty Member. Join for Free!
                        </a>
                    </Link></li>
                    <li><Link href="/">
                        <a>
                            Gift Card
                        </a>
                    </Link></li>
                </ul>
            </section>
            <section id="banner" className="section-container">
                <Link href="/">
                    <a>
                        <div>
                            <h3 className="banner__title">
                                Member perk: 20% off $75 + free shipping
                            </h3>
                            <div>
                                TIME FLIES:
                            </div>
                            <div>
                                <Timer />
                            </div>
                        </div>
                    </a>
                </Link>
            </section>
            <section id="campaign">
                <Link href="/">
                    <a>
                        <div>
                            <img src={campaign01.src} alt="campaign01"></img>
                        </div>
                        <div></div>
                        <div className="campaign__block">
                            <h2>Cozy Combinashnz</h2>
                            <p>Soft, layerable knits to see you through winter</p>
                            <div>
                                <Button>SCHOP NAU!</Button>
                            </div>
                        </div>
                    </a>
                </Link>
            </section>
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
            <section id="banner" className="section-container">
                <Link href="/">
                    <a>
                        <div>
                            <h3 className="banner__title">
                                Let us upgrade you! Become an H&amp;M Member &amp; get 10% off your first purchase + rewards just for shopping
                            </h3>
                            <p>
                                Don't forget to opt into Fashion News to have your offers and rewards delivered right to your inbox!
                            </p>
                        </div>
                    </a>
                </Link>
            </section>
            <section id="campaign">
                <Link href="/">
                    <a>
                        <div>
                            <img src={campaign02.src} alt="campaign02"></img>
                        </div>
                        <div></div>
                        <div className="campaign__block">
                            <h2>The best kind of basic</h2>
                            <p>Just-in hoodies, joggers, sweatshirts &amp; more</p>
                            <div>
                                <Button>SCHOP NAU!</Button>
                            </div>
                        </div>
                    </a>
                </Link>
            </section>
            <section id="campaign">
                <Link href="/">
                    <a>
                        <div>
                            <img src={campaign03.src} alt="campaign03"></img>
                        </div>
                        <div></div>
                        <div className="campaign__block">
                            <h2>The best kind of basic</h2>
                            <p>Just-in hoodies, joggers, sweatshirts &amp; more</p>
                            <div>
                                <Button>SCHOP NAU!</Button>
                            </div>
                        </div>
                    </a>
                </Link>
            </section>
            <section id="magazine">
                <div>
                    <h2>MAGAZINE</h2>
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
                                    <h4>Presenting: Edition by<br/>John Boyega</h4>
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
                                    <h4>Coming this spring:<br/>Iris Apfel x H&M</h4>
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