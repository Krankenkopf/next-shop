import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { TAuthState } from "../../../../a2-bll/auth-reducer";
import { TState } from "../../../../a2-bll/store";
import { TModal, TRANSITION_TIME } from "../Modal/Modals";
import { SignupForm } from "./Forms/SignupForm";


type TSignupProps = {
    revealModal: (modalType: TModal) => void
    freezePrevious: (modalType: TModal) => void
    closeModal: (modalType: TModal) => void
}

export const Signup = ({revealModal, freezePrevious, closeModal}: TSignupProps) => {
    const { signupUserData, isSignupPassConfirmed, isLoggedIn } = useSelector<TState, TAuthState>((state) => state.auth)
  
    useEffect(() => {
        if (!isSignupPassConfirmed && signupUserData && !isLoggedIn) {
            // when user setted signupData to state
            freezePrevious("signup")
            revealModal("signupPassUnconfirmed")
        }
        if (isLoggedIn) {
            console.log(signupUserData, isSignupPassConfirmed, isLoggedIn)
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
        </div>
    )
}