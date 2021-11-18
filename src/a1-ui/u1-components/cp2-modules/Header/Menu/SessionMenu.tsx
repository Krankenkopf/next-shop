import Link from "next/link"
import React, { FC, useState } from "react"
import Button from "../../../cp1-elements/el02-Button/Button"
import { Icon } from "../../../cp1-elements/el10-Icons/Icon"
import { DropMenu } from "../../DropMenu/DropMenu"

import { TModal } from "../../Modal/Modals"
import { MiniCart } from "../MiniCart/MiniCart"

type TSessionMenuProps = {
    revealModal: (modalType: TModal) => void
}

export const SessionMenu: FC<TSessionMenuProps> = ({ revealModal }) => {
    const authMenu = {
        toggle: <a onClick={() => revealModal("signup")}>
            <div className="link__decorated">
                <Icon name="user" className="icon__session" />
                <span>Sign Up</span>
            </div>
        </a>,
        menu: <div className="session">
            <div className="button-container">
                <Button variant="ok" onClick={() => revealModal("signup")}>
                    Sign up
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
        toggle: <Link href="/">
            <a>
                <div className="link__decorated">
                    <Icon name="cart-shopping-fast" className="icon__session" />
                    <span>Cart</span>
                </div>
            </a>
        </Link>,
        menu: <MiniCart />
    }
    return (
        <ul className="header-menu-session">
            <li style={{ display: "inline-block"}}>
                <DropMenu toggle={authMenu.toggle} menu={authMenu.menu} />
            </li>
            <li style={{ display: "inline-block" }}>
                <a onClick={() => revealModal("login")}>
                    <div className="link__decorated" >
                        <Icon name="heart" className="icon__session" />
                        <span>Favorites</span>
                    </div>
                </a>
            </li>
            <li style={{ display: "inline-block"}}>
                <DropMenu toggle={minicartMenu.toggle} menu={minicartMenu.menu} />
            </li>
        </ul>
    )
}