import Link from "next/link"
import React, { FC } from "react"
import css from "./Ads.module.scss"

type TBannerProps = {
    link?: string
    title: string
}

export const Banner: FC<TBannerProps> = React.memo(({link = "/", title, children}) => {
    return <section className="section-container">
        <Link href={link}>
            <a>
                <div className={css.banner}>
                    <h3 className={css.banner__title}>
                        { title }
                    </h3>
                    {children}
                </div>
            </a>
        </Link>
    </section>
})