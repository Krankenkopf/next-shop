import Link from "next/link"
import React, { FC } from "react"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"
import css from "./Ads.module.scss"

type TBannerProps = {
    link?: string
    title: string
    red?: boolean
}

export const Banner: FC<TBannerProps> = React.memo(({link = "/", title, red = false, children}) => {
    return <section className="section-container">
        <Link href={link}>
            <a>
                <div className={`${css.banner} ${red ? css.red : ""}`}>
                    <h3 className={css.banner__title}>
                        { title }
                    </h3>
                    {children}
                    <div className={css.icon}>
                        <Icon name="circle" size="full"/>
                    </div>
                </div>
            </a>
        </Link>
    </section>
})