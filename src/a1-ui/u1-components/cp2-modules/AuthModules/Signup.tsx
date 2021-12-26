import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../../a0-common/c3-hooks";
import { TRequestStatus } from "../../../../a2-bll/app-reducer";
import { TAuthState } from "../../../../a2-bll/auth-reducer";
import { selectAppStatus } from "../../../../a2-bll/selectors";
import { TState } from "../../../../a2-bll/store";
import { Preloader } from "../../cp1-elements/el11-Preloader/Preloader";
import { TModal, TRANSITION_TIME } from "../Modal/Modals";
import { ErrorMessage } from "./ErrorMessage";
import { SignupForm } from "./Forms/SignupForm";


type TSignupProps = {
    revealModal: (modalType: TModal) => void
    freezePrevious: (modalType: TModal) => void
    closeModal: (modalType: TModal) => void
}

export const Signup = ({revealModal, freezePrevious, closeModal}: TSignupProps) => {
    const { signupUserData, isSignupPassConfirmed, isLoggedIn } = useSelector<TState, TAuthState>((state) => state.auth)
    const status = useAppSelector<TRequestStatus>(selectAppStatus)
    
    useEffect(() => {
        if (!isSignupPassConfirmed && signupUserData && !isLoggedIn) {
            // when user setted signupData to state
            freezePrevious("signup")
            revealModal("signupPassUnconfirmed")
        }
        if (isLoggedIn) {
            closeModal("signup")  
        }
    }, [signupUserData, isSignupPassConfirmed, isLoggedIn])
    return (
        <div className="signup">
            <header>
                <h3 className="title center">BECOME A MEMBER</h3>
                <p className="text center">Become a Member — you'll enjoy exclusive deals, offers, invites and rewards.</p>
            </header>
            <div className="signup__form">
                <SignupForm revealModal={revealModal}/>
            </div>
            <div className="signup__login">
                <span>Already have an account? </span>
                <a onClick={() => revealModal("login")}><strong>Sign In</strong></a>
            </div>
            {status === "auth loading" && <Preloader background="#ffccfc" />}
            {status === "auth failed" && <ErrorMessage />}
        </div>
    )
}