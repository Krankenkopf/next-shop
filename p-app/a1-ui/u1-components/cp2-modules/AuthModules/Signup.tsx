
import React from "react";
import { TModal } from "../Modal/Modals";
import { SignupForm } from "./Forms/SignupForm";


type SignupFormErrorType = {
    email?: string
    password?: string
    confirmedPassword?: string
}

export type TSignupFormData = {
    email: string
    password: string
}

type TSignupProps = {
    revealModal: (modalType: TModal) => void
    freezeCurrent: () => void
}

export const Signup = ({revealModal, freezeCurrent}: TSignupProps) => {

    return (
        <div className="signup">
            <header>
                <h3 className="title center">BECOME A MEMBER</h3>
                <p className="text center">Become a Member — you'll enjoy exclusive deals, offers, invites and rewards.</p>
            </header>
            <div className="signup__form">
                <SignupForm revealModal={revealModal} freezeCurrent={freezeCurrent}/>
            </div>
            <div className="signup__login">
                <span>Already have an account? </span>
                <a onClick={() => revealModal("login")}><strong>Sign In</strong></a>
            </div>
        </div>
    )
}