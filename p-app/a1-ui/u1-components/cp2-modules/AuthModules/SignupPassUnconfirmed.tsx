import React from "react"
import Button from "../../cp1-elements/el02-Button/Button"
import { TModal } from "../Modal/Modals"

type TSignupPassUnconfirmedProps = {
    revealModal: (modalType: TModal) => void
    freezeCurrent: () => void
}

export const SignupPassUnconfirmed = ({revealModal, freezeCurrent}: TSignupPassUnconfirmedProps) => {
    return (
        <div className="info">
            <header>
                <h3 className="title center">Password unconfirmed!</h3>
                <p className="text center">Password confirmation is preferable to avoid mistakes when typing</p>
                <p className="text center">Are you sure you don't want to confirm your password?</p>
            </header>
            <div className="info__signup">
                <Button onClick={() => revealModal("signup")}
                    variant={'ok'}>
                    Back to Confirm
                </Button>
                <Button onClick={() => revealModal("signup")}
                    variant={'active'}>
                    Proceed anyway
                </Button>
            </div>
        </div>
    )
}