import React, { FC, useCallback, useEffect, useLayoutEffect, useState } from "react"
import ReactDOM from "react-dom";
import { Login } from "../AuthModules/Login";
import { Signup } from "../AuthModules/Signup";
import { Modal } from "./Modal"

export type TModal = "signup" | "login" | "cart" | null

type TModalsProps = {
    modal: TModal
    revealModal: (modalType: TModal) => void
    onClose: () => void
}

export const Modals: FC<TModalsProps> = ({ modal, revealModal, onClose }) => {

    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const [modalsState, setModalsState] = useState({
        signup: false,
        login: false,
        cart: false
    })
    const [closingModal, setClosingModal] = useState(false)
    const [current, setCurrent] = useState<TModal>(null);
    const [scrollLock, setScrollLock] = useState(false);
    const transitionTime = 600

    useEffect(() => {
        if (modal && !current) { //no opened modals
            const lockPadding = window.innerWidth - document.body.offsetWidth
            document.body.style.overflowY = "hidden"
            document.body.style.paddingRight = lockPadding + "px"
            setModalsState((prev) => ({ ...prev, [modal]: !prev[modal] }))
            setCurrent(modal)
            setScrollLock(true)
            setTimeout(() => {
                setScrollLock(false)
            }, transitionTime)
        } else if (modal && current && modal !== current) { //need to close previous and open current
            setModalsState((prev) => ({ ...prev, [modal]: !prev[modal], [current]: !prev[current] }))
            setScrollLock(true)
            setTimeout(() => {
                setCurrent(modal)
                setScrollLock(false)
            }, transitionTime)
        }
    }, [modal])

    const closeModal = useCallback((modalType: string) => {
        if (modal) {
            setModalsState((prev) => ({ ...prev, [modal]: !prev[modal] }))
            setClosingModal(true)
            setScrollLock(true)
            setTimeout(() => {
                document.body.style.overflowY = "inherit"
                document.body.style.paddingRight = 0 + "px"
                setCurrent(null)
                setClosingModal(false)
                setScrollLock(false)
            }, transitionTime)
            onClose()
        }
    }, [modal])

    const className = `modal ${current
        ? closingModal
            ? "modal__closing"
            : "modal__revealed"
        : ""}`

    if (isBrowser) {
        const modals = (
            <div className={className}>
                <Modal modalType={"signup"}
                    scrollLock={scrollLock}
                    current={current}
                    isOpen={modalsState.signup}
                    onClose={closeModal}>
                    <Signup revealModal={revealModal} />
                </Modal>
               <Modal modalType={"login"}
                    scrollLock={scrollLock}
                    current={current}
                    isOpen={modalsState.login}
                    onClose={closeModal}>
                    <Login revealModal={revealModal} />
                </Modal>
            </div>
        )
        const container = document.getElementById("modal-root")
        return container && ReactDOM.createPortal(
            modals,
            container
        )
    } else {
        return null
    }
}
