
import React, { FC, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from "../../../../a0-common/c3-hooks";
import { TRequestStatus } from "../../../../a2-bll/app-reducer";
import { selectAppStatus } from "../../../../a2-bll/selectors";
import Button from "../../cp1-elements/el02-Button/Button";
import { Preloader } from "../../cp1-elements/el11-Preloader/Preloader";
import { TModal } from "../Modal/Modals";
import { ErrorMessage } from "./ErrorMessage";
import { LoginForm } from "./Forms/LoginForm";


type TLoginProps = {
    revealModal: (modalType: TModal) => void
}

export const Login: FC<TLoginProps> = ({ revealModal }) => {
    const status = useAppSelector<TRequestStatus>(selectAppStatus)
    const onButtonSignupClick = useCallback(() => {
        revealModal("signup")
    }, [])
    return (
        <div className="login">
            <header>
                <h3 className="title center">SIGN IN</h3>
                <p className="text center">Become a Member — you'll enjoy exclusive deals, offers, invites and rewards.</p>
            </header>
            <div className="login__form">
                <LoginForm revealModal={revealModal}/>
            </div>
            <div className="login__signup">
                <Button onClick={onButtonSignupClick}
                    variant={'ok__alt'}>
                    Become a Member
                </Button>
            </div>
            {status === "auth loading" && <Preloader background="#ffccfc" />}
            {status === "auth failed" && <ErrorMessage />}
        </div>
    )
}