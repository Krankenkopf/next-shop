import React from "react"
import { useDispatch } from "react-redux"
import { signup } from "../../../../a2-bll/auth-reducer"
import Button from "../../cp1-elements/el02-Button/Button"
import { TModal } from "../Modal/Modals"
import { PassRecoveryForm } from "./Forms/PassRecoveryForm"

type TPassRecoveryProps = {
    revealModal: (modalType: TModal) => void
    closeModal: (modalType: TModal) => void
}

export const PassRecovery = ({ revealModal, closeModal }: TPassRecoveryProps) => {
    
    return (
        <div className="info">
            <header>
                <h3 className="title center">Forgot password?</h3>
                <p className="text center">Please enter the email address you used to create your account, and we'll send you a link to reset your password</p>
            </header>
            <PassRecoveryForm revealModal={revealModal} closeModal={closeModal}/>
        </div>
    )
}