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