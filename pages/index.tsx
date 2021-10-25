import Link from "next/link"
import React, { MouseEventHandler, useState } from "react";
import Button from "../p-app/a1-ui/u1-components/cp1-elements/el02-Button/Button";
import { Timer } from "../p-app/a1-ui/u1-components/cp1-elements/el20-Timer/Timer";
import { LandingLayout } from "../p-app/a1-ui/u1-components/cp4-layouts/LandingLayout";
import campaign from "../public/images/campaign.jpg"
import { images } from "../public/images/carousel/carousel"
import test from "../public/images/carousel/10201.png"

export default function Index({ history, props }: any) {
    console.log(history);
    const carouselSources = [
        { title: "", p: "", src: images[0]},
        { title: "", p: "", src: images[1]},
        { title: "", p: "", src: images[2]},
        { title: "", p: "", src: images[3]},
        { title: "", p: "", src: images[4]},
        { title: "", p: "", src: images[5]},
        { title: "", p: "", src: images[6]},
        { title: "", p: "", src: images[7]},
        { title: "", p: "", src: images[8]},
        { title: "", p: "", src: images[9]},
        { title: "", p: "", src: images[10]},
        { title: "", p: "", src: images[11]},
        { title: "", p: "", src: images[12]},
        { title: "", p: "", src: images[13]},
        { title: "", p: "", src: images[14]},
        { title: "", p: "", src: images[15]},
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
            <div className="wrapper _container">
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
                                <img src={campaign.src} alt="campaign01"></img>
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
                <section id="carousel">
                    <h3>Trendin' rait nau</h3>
                    <div className="carousel" style={{transform: `translateX(${-100*(+stage)}%)`}} >
                        <ul>
                            {carousel}
                        </ul>
                    </div>
                    <div className="carousel__controls">
                        <ul>
                            <li><button value={'0'}
                                onClick={setStageHandler}
                                style={stage === "0" ? {backgroundColor: "#E50010", borderColor: "#E50010"} : undefined}
                                className="carousel__controls__button" /></li>
                            <li><button value={'1'}
                                onClick={setStageHandler}
                                style={stage === "1" ? {backgroundColor: "#E50010", borderColor: "#E50010"} : undefined}
                                className="carousel__controls__button" /></li>
                            <li><button value={'2'}
                                onClick={setStageHandler}
                                style={stage === "2" ? {backgroundColor: "#E50010", borderColor: "#E50010"} : undefined}
                                className="carousel__controls__button" /></li>
                        </ul>
                    </div>
                </section>
                <section>
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
                </section>
                <h1>Main</h1>
                <p>Lorem ipsum dolor sit amet consectetur.</p>
            </div>
        </LandingLayout>

    )
}