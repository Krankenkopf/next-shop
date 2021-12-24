import Link from "next/link"
import React, { FC } from "react"
import Button from "../../cp1-elements/el02-Button/Button"
import css from "./Ads.module.scss"

type TCampaignProps = {
    link?: string
    title: string
    text: string
    img: StaticImageData
    imgAltText: string
}

export const Campaign: FC<TCampaignProps> = React.memo(({link = "/", title, text, img, imgAltText}) => {
    return <section className={css.campaign}>
        <Link href={link}>
            <a>
                <div>
                    <img src={img.src} alt="campaign01"></img>
                </div>
                <div></div>
                <div className={css.campaign__block}>
                    <h2>{title}</h2>
                    <p>{text}</p>
                    <div>
                        <Button>SHOP NOW!</Button>
                    </div>
                </div>
            </a>
        </Link>
    </section>
})