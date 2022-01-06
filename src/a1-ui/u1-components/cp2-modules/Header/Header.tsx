import Link from "next/link"
import React, { FC, useCallback, useState } from "react"
import { Search } from "./Search"
import { SessionMenu } from "./Menu/SessionMenu"
import { capitalizeFirst } from "../../../../a0-common/c4-utils/ui"
import { BrandIcon } from "../../cp1-elements/el10-Icons/BrandIcon"
import { useAppDispatch, useAppSelector } from "../../../../a0-common/c3-hooks"
import BurgerMenu from "../../cp1-elements/el12-BurgerMenu/BurgerMenu"
import { setModal } from "../../../../a2-bll/app-reducer"
import { Icon } from "../../cp1-elements/el10-Icons/Icon"
import { TCategoriesState } from "../../../../a2-bll/categories-reducer"

type THeaderProps = {
    categories: TCategoriesState
}

export const Header: FC<THeaderProps> = () => {
    const dispatch = useAppDispatch()
    const deviceType = useAppSelector(state => state.layout.device)
    const modal = useAppSelector(state => state.app.modal)
    const { isLoggedIn } = useAppSelector((state) => state.auth)
    const [menuServices, setMenuServices] = useState(() => {
        const menuServicesTitles = ["Customer Service", "Ahrlist Discount", "Find a store"]
        return menuServicesTitles.map((item) => {
            return (<li key={item}>
                <Link href="/"><a><span>{item}</span></a></Link>
            </li>)
        })
    })
    const [categoriesLinks, setCategoriesLinks] = useState(() => {
        const headerLinkNames = ["ladies", "divided", "men", "baby", "kids", "home", "sale"]
        return headerLinkNames.map((name, i, arr) => {
            if (name === "ladies") {
                return <h4 key={name} style={{ width: `calc(100%/${arr.length})`, height: '30px', textAlign: 'center' }}>
                    <Link href="/ladies"><a>Women</a></Link>
                </h4>
            }
            if (name === "home") {
                return <h4 key={name} style={{ width: `calc(100%/${arr.length})`, height: '30px', textAlign: 'center' }}>
                    <Link href="/home"><a>H&M Home</a></Link>
                </h4>
            }
            else return <h4 key={name} style={{ width: `calc(100%/${arr.length})`, height: '30px', textAlign: 'center' }}>
                <Link href={`/${name}`}>
                    <a>{capitalizeFirst(name)}</a>
                </Link>
            </h4>
        })
    })
    const onMenuClick = useCallback(() => {
        dispatch(setModal("mainMenu"))
    }, [dispatch])

    return <>
        {(deviceType === "mobile" || deviceType === "tablet") && <div className="header-overlay" />}
        <header id="header">
            {(deviceType === "laptop" || deviceType === "desktop") && <nav>
                <ul className="header-menu-services">
                    {menuServices}
                </ul>
                <div className="header-logo">
                    <Link href="/">
                        <a>
                            <BrandIcon name="handm" size="max" color="#E50010" />
                        </a>
                    </Link>
                </div>
                <SessionMenu />
                <div className="header-menu-primary">
                    {categoriesLinks}
                </div>
                <Search />
            </nav>}
            {(deviceType === "mobile" || deviceType === "tablet") && <nav className="nav-mobile">
                <div className="header-menu-mobile">
                    <BurgerMenu menuStatus={modal === "mainMenu"} toggleMenu={onMenuClick} />
                </div>
                <div className="header-logo-mobile">
                    <Link href="/">
                        <a>
                            <BrandIcon name="handm" size="max" color="#E50010" />
                        </a>
                    </Link>
                </div>
                <div className="header-menu-session-mobile">
                    <Link href="/account">
                        <a>
                            <div className="iconized right">
                                {isLoggedIn
                                    ? <Icon name="user-check" className="icon__session" />
                                    : <Icon name="user" className="icon__session" />}
                                <span></span>
                            </div>
                        </a>
                    </Link>
                    <a>
                        <div className="iconized right">
                            <Icon name="magnifying-glass" className="icon__session" />
                            <span></span>
                        </div>
                    </a>
                    
                    <Link href="/favorites">
                        <a>
                            <div className="iconized" >
                                <Icon name="heart-solid" className="icon__session" />
                                <span></span>
                            </div>
                        </a>
                    </Link>
                    <Link href="/cart">
                        <a>
                            <div className="iconized">
                                {isLoggedIn
                                    ? <Icon name="cart-shopping" className="icon__session" />
                                    : <Icon name="cart-shopping-fast" className="icon__session"/>}
                                <span></span>
                            </div>
                        </a>
                    </Link>
                </div>
            </nav>}
        </header>
        {(deviceType === "mobile" || deviceType === "tablet") && <>
            <div className="shadow-fade top" />
        </>}
        </>  
}
