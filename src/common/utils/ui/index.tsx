import Link from "next/link"
import React from "react"


export const categoryToLiLinkA = (src: Array<any>, parentPath: string, className: string, scroll: boolean) => {
    return src.map((item) => {
        const href = `${parentPath}/${item.CategoryValue}`
        return (
            <li key={item.CategoryValue} className={className}>
                <Link href={"/[category]/[...categories]"} as={href} scroll={scroll}>
                    <a title={item.CatName}>
                        {item.CatName}
                    </a>
                </Link>  
            </li>
        )
    })
}

//=============================================================================================

export const capitalizeFirst = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || ""

//=============================================================================================

export const sortNonZeroFirst = <T extends Object>(arr: Array<T>, criteriaName: keyof T) => {
    return [
        ...arr.filter((item) => item[criteriaName]),
        ...arr.filter((item) => !item[criteriaName])
    ]      
}

//=============================================================================================

export const getBrightness = (hex: string) => {
    let rgb = parseInt(hex.substring(1), 16);   // convert rrggbb to decimal
    let r = (rgb >> 16) & 0xff;  // extract red
    let g = (rgb >> 8) & 0xff;  // extract green
    let b = (rgb >> 0) & 0xff;  // extract blue
    return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
}