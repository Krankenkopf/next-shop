import React, { FC, useCallback, useEffect, useState } from "react"
import { Login } from "../AuthModules/Login";
import { Signup } from "../AuthModules/Signup";
import { Modal } from "./Modal"

export type TModal = "signup" | "login" | "cart" | null

type TModalsProps = {
    modal: TModal
    revealModal: (modalType: TModal) => void
    onClose: () => void
}

export const Modals: FC<TModalsProps> = React.memo(({modal, revealModal, onClose}) => {
    const [modalsState, setModalsState] = useState({
        signup: false,
        login: false,
        cart: false
    })
    //const [lock, setLock] = useState(false)
    const [current, setCurrent] = useState<TModal>(null);
    

    useEffect(() => {
        if (modal && !current) {
            const lockPadding = window.innerWidth - document.body.offsetWidth
            document.body.style.overflowY = "hidden"
            document.body.style.paddingRight = lockPadding + "px"
            setModalsState((prev) => ({ ...prev, [modal]: !prev[modal] }))
            setCurrent(modal)
            //setLock(true)
        } else if (modal && current && modal !== current) {
            setModalsState((prev) => ({ ...prev, [modal]: !prev[modal], [current]: !prev[current] }))
            setCurrent(modal)
        }
    }, [modal])

    const closeModal = useCallback((modalType: string) => {
        if (modal) {
            document.body.style.overflowY = "inherit"
            document.body.style.paddingRight = 0 + "px"
            setModalsState((prev) => ({ ...prev, [modal]: !prev[modal] }))
            setCurrent(null)
            //setLock(false)
            onClose()
        }
    }, [modal])
    console.log("Modals")
    console.log(modalsState);
    
    
    return (
        <>
            <Modal modalType={"signup"} isOpen={modalsState.signup} onClose={closeModal}>
                <Signup revealModal={revealModal} />
            </Modal>
            <Modal modalType={"login"} isOpen={modalsState.login} onClose={closeModal}>
                <Login />
            </Modal>
        </>
    )
})