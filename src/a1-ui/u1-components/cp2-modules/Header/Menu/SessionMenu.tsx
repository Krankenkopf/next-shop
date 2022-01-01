import Link from "next/link"
import React, { FC, useCallback, useEffect, useState } from "react"
import { TCheckedProduct } from "../../../../../a0-common/c1-types/t1-instance/TCheckedProduct"
import { useAppDispatch, useAppSelector } from "../../../../../a0-common/c3-hooks"
import { setModal } from "../../../../../a2-bll/app-reducer"
import { logout, TAuthState } from "../../../../../a2-bll/auth-reducer"
import { selectCartItems } from "../../../../../a2-bll/selectors"
import Button from "../../../cp1-elements/el02-Button/Button"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import { DropMenuOnHover } from "../../DropMenu/DropMenuOnHover"
import { MiniCart } from "../MiniCart/MiniCart"

type TSessionMenuProps = {
    
}

export const SessionMenu: FC<TSessionMenuProps> = ({}) => {
    const dispatch = useAppDispatch()
    const { isLoggedIn } = useAppSelector<TAuthState>((state) => state.auth)
    const cartProducts = useAppSelector<Array<TCheckedProduct>>(selectCartItems)
    const handleLogout = useCallback(() => {
        dispatch(logout())
    }, [dispatch])
    const onLoginClick = useCallback(() => {
        dispatch(setModal("login"))
    }, [dispatch])
    const onSignupClick = useCallback(() => {
        dispatch(setModal("signup"))
    }, [dispatch])
    const authMenu = isLoggedIn
        ? {
            toggle: <Link href="/account">
                <a>
                    <div className="iconized">
                        <Icon name="user-check" className="icon__session" />
                        <span>My Account</span>
                    </div>
                </a>
            </Link>,
            menu: <div className="session-auth">
                <ul className="logged-in">
                    <li>
                        <Link href="/account"><a><span>My Account</span></a></Link>
                    </li>
                    <li>
                        <Link href="/"><a><span>Loyalty Program Info</span></a></Link>
                    </li>
                    <li style={{ fontSize: "90%" }}>
                        <a onClick={handleLogout}>
                            <em>Sign out</em>
                        </a>
                    </li>
                </ul>
            </div>,
        }
        : {
            toggle: <a onClick={onLoginClick}>
                <div className="iconized">
                    <Icon name="user" className="icon__session" />
                    <span>Sign In</span>
                </div>
            </a>,
            menu: <div className="session-auth">
                <div className="button-container">
                    <Button variant="ok" onClick={onLoginClick}>
                        Sign in
                    </Button>
                </div>
                <ul>
                    <li>
                        <Link href="/"><a><span>Loyalty Program Info</span></a></Link>
                    </li>
                    <li style={{ fontSize: "90%" }}>
                        <a onClick={onSignupClick}>
                            <em>Not a Member yet? Join here!</em>
                        </a>
                    </li>
                </ul>
            </div>
        }
    const minicartMenu = {
        toggle: <Link href="/cart">
            <a>
                <div className="iconized">
                    {isLoggedIn
                        ? <Icon name="cart-shopping" className="icon__session" />
                        : <Icon name="cart-shopping-fast" className="icon__session" />}
                    <span>Cart</span>
                </div>
            </a>
        </Link>,
        menu: <MiniCart items={ cartProducts }/>
    }
    return (
        <ul className="header-menu-session">
            <li style={{ display: "inline-block" }}>
                <DropMenuOnHover toggle={authMenu.toggle} menu={authMenu.menu} />
            </li>
            <li style={{ display: "inline-block" }}>
                <Link href="/favorites">
                    <a>
                        <div className="iconized" >
                            <Icon name="heart-solid" className="icon__session" />
                            <span>Favorites</span>
                        </div>
                    </a>
                </Link>
            </li>
            <li style={{ display: "inline-block" }}>
                <DropMenuOnHover toggle={minicartMenu.toggle} menu={minicartMenu.menu} />
            </li>
        </ul>
    )
}