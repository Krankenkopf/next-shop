import Link from "next/link"
import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout, TAuthState } from "../../../../../a2-bll/auth-reducer"
import { TState } from "../../../../../a2-bll/store"
import Button from "../../../cp1-elements/el02-Button/Button"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import { DropMenu } from "../../DropMenu/DropMenu"

import { TModal } from "../../Modal/Modals"
import { MiniCart } from "../MiniCart/MiniCart"

type TSessionMenuProps = {
    revealModal: (modalType: TModal) => void
}

export const SessionMenu: FC<TSessionMenuProps> = ({ revealModal }) => {
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector<TState, TAuthState>((state) => state.auth)
    const handleLogout = () => {
        dispatch(logout())
    }
    const authMenu = isLoggedIn
        ? {
            toggle: <Link href="/account">
                <a>
                    <div className="link__decorated">
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
            toggle: <a onClick={() => revealModal("login")}>
                <div className="link__decorated">
                    <Icon name="user" className="icon__session" />
                    <span>Sign In</span>
                </div>
            </a>,
            menu: <div className="session-auth">
                <div className="button-container">
                    <Button variant="ok" onClick={() => revealModal("login")}>
                        Sign in
                    </Button>
                </div>
                <ul>
                    <li>
                        <Link href="/"><a><span>Loyalty Program Info</span></a></Link>
                    </li>
                    <li style={{ fontSize: "90%" }}>
                        <a onClick={() => revealModal("signup")}>
                            <em>Not a Member yet? Join here!</em>
                        </a>
                    </li>
                </ul>
            </div>
        }
    const minicartMenu = {
        toggle: <Link href="/cart">
            <a>
                <div className="link__decorated">
                    {isLoggedIn
                        ? <Icon name="cart-shopping" className="icon__session" />
                        : <Icon name="cart-shopping-fast" className="icon__session" />}
                    <span>Cart</span>
                </div>
            </a>
        </Link>,
        menu: <MiniCart />
    }
    return (
        <ul className="header-menu-session">
            <li style={{ display: "inline-block" }}>
                <DropMenu toggle={authMenu.toggle} menu={authMenu.menu} />
            </li>
            <li style={{ display: "inline-block" }}>
                <Link href="/favorites">
                    <a>
                        <div className="link__decorated" >
                            <Icon name="heart" className="icon__session" />
                            <span>Favorites</span>
                        </div>
                    </a>
                </Link>
            </li>
            <li style={{ display: "inline-block" }}>
                <DropMenu toggle={minicartMenu.toggle} menu={minicartMenu.menu} />
            </li>
        </ul>
    )
}