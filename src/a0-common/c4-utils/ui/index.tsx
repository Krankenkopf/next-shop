import Link from "next/link"
import React from "react"

export const toLiLinkA = (src: Array<any>, className: string) => {
    return src.map((item) => {
        return (
            <li key={item.title} className={className}>
                <a href={item.href} title={item.title}>               
                    {item.title}
                </a>
            </li>
        )
    })    
}

export const _toLiLinkA = (src: Array<any>, parentPath: string, className: string) => {
    return src.map((item) => {
        const href = `${parentPath}/${item.CategoryValue}`
        return (
            <li key={item.CategoryValue} className={className}>
                <Link href={href} scroll={false}>
                    <a title={item.CatName}>
                        {item.CatName}
                    </a>
                </Link>  
            </li>
        )
    })
}