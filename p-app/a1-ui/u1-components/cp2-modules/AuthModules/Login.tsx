import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Button from "../../cp1-elements/el02-Button/Button";
import { TModal } from "../Modal/Modals";
import { LoginForm } from "./Forms/LoginForm";


type TLoginProps = {
    revealModal: (modalType: TModal) => void
}

export const Login = (props: TLoginProps) => {
    return (
        <div className="login">
            <header>
                <h3 className="title center">SIGN IN</h3>
                <p className="text center">Become a Member — you'll enjoy exclusive deals, offers, invites and rewards.</p>
            </header>
            <div className="login__form">
                <LoginForm />
            </div>
            <div className="login__signup">
                <Button onClick={() => props.revealModal("signup")}
                    variant={'ok'}>
                    Become a Member
                </Button>
            </div>
        </div>
    )
}