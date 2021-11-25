import React, { FC, useCallback, useEffect, useState } from "react"
import ReactDOM from "react-dom";
import { Login } from "../AuthModules/Login";
import { Signup } from "../AuthModules/Signup";
import css from "./Modal.module.scss"
import { Modal } from "./Modal"
import { SignupPassUnconfirmed } from "../AuthModules/SignupPassUnconfirmed";
import { TAuthState } from "../../../../a2-bll/auth-reducer";
import { TState } from "../../../../a2-bll/store";
import { useSelector } from "react-redux";
import { PassRecovery } from "../AuthModules/PassRecovery";

export type TModal = "signup" | "signupPassUnconfirmed" | "login" | "passRecovery" | "cart" | null

type TModalsProps = {
    modal: TModal
    revealModal: (modalType: TModal) => void
    onClose: () => void
}
export const TRANSITION_TIME = 600

export const Modals: FC<TModalsProps> = ({ modal, revealModal, onClose }) => {
    //==========================================================
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(true);
    }, []);
    //==========================================================
    const { isLoggedIn } = useSelector<TState, TAuthState>((state) => state.auth)
    const [modalsState, setModalsState] = useState({
        signup: false,
        signupPassUnconfirmed: false,
        login: false,
        passRecovery: false,
        cart: false
    })
    const [closingModal, setClosingModal] = useState(false)
    const [current, setCurrent] = useState<TModal>(null);
    const [freezed, setFreezed] = useState<TModal>(null);
    
    const [scrollLock, setScrollLock] = useState(false);
    

    useEffect(() => {
        if (modal && !current) { //no opened modals
            const lockPadding = window.innerWidth - document.body.offsetWidth
            document.body.style.overflowY = "hidden"
            document.body.style.paddingRight = lockPadding + "px"
            setModalsState((prev) => ({ ...prev, [modal]: true }))
            setCurrent(modal)
            setScrollLock(true)
            setTimeout(() => {
                setScrollLock(false)
            }, TRANSITION_TIME)
        }
        if (modal && current && modal !== current && !freezed) { //need to close previous and open current
            setModalsState((prev) => ({ ...prev, [modal]: true, [current]: false }))
            setScrollLock(true)
            setTimeout(() => {
                setCurrent(modal)
                setScrollLock(false)
            }, TRANSITION_TIME)
        }
        if (modal && current && modal !== current && freezed) { // no need to close previous and open current
            setModalsState((prev) => ({ ...prev, [modal]: true }))
            setScrollLock(true)           
            setTimeout(() => {
                setCurrent(modal)
                //setScrollLock(false) // it's considered that upper modal will be not scrollable 
            }, TRANSITION_TIME)
        }
    }, [modal])
    
    const closeModal = useCallback((modalToClose: TModal) => {
        if (modal && modalToClose) {
            
            //setScrollLock(true)   
            if (freezed && modalToClose !== freezed) {  // now is two modals in view
                setModalsState((prev) => ({ ...prev, [modalToClose]: false }))
                console.log("closed " + modalToClose)
                revealModal(freezed) // set global toggler to lower modal
                //setScrollLock(false)
                setTimeout(() => {
                    setFreezed(null)  // lower modal unfreezed...
                    setCurrent(freezed)
                    setScrollLock(false) // not tested if it neccesary
                }, TRANSITION_TIME)
            }
            if (!freezed || modalToClose === freezed) {
                //setScrollLock(true)
                if (modalToClose === freezed) {
                    //setFreezed(null)
                    //setCurrent(freezed)
                    setTimeout(() => {
                        setModalsState((prev) => ({ ...prev, [modalToClose]: false }))
                        setScrollLock(true)
                        setClosingModal(true) // closing modals component
                        setTimeout(() => {
                            document.body.style.overflowY = "inherit"
                            document.body.style.paddingRight = 0 + "px"
                            setCurrent(null)
                            setClosingModal(false)
                            setScrollLock(false)
                        }, TRANSITION_TIME)
                        onClose()
                    }, TRANSITION_TIME)
                }
                if (!freezed) {
                    setScrollLock(true)
                    setModalsState((prev) => ({ ...prev, [modalToClose]: false }))
                    setClosingModal(true) // closing modals component
                    setTimeout(() => {
                        document.body.style.overflowY = "inherit"
                        document.body.style.paddingRight = 0 + "px"
                        setCurrent(null)
                        setClosingModal(false)
                        setScrollLock(false)
                    }, TRANSITION_TIME)
                    onClose()
                }
                
            }
        }
    }, [modal, freezed])

    const className = `${css.modal} ${current
        ? closingModal
            ? css.modal__closing
            : css.modal__revealed
        : ""}`

    if (isBrowser) {
        const modals = (
            <div className={className}>
                <Modal modalType={"signup"}
                    scrollLock={scrollLock}
                    current={current}
                    isOpen={modalsState.signup}
                    isFreezed={freezed === "signup"}
                    onClose={closeModal}>
                    <Signup revealModal={revealModal}
                        freezePrevious={(modal) => setFreezed(modal)}
                        closeModal={closeModal} />
                </Modal>
               <Modal modalType={"login"}
                    scrollLock={scrollLock}
                    current={current}
                    isOpen={modalsState.login}
                    onClose={closeModal}>
                    <Login revealModal={revealModal} />
                </Modal>
                <Modal modalType={"signupPassUnconfirmed"}
                    scrollLock={scrollLock}
                    current={current}
                    layout={2}
                    isOpen={modalsState.signupPassUnconfirmed}
                    onClose={closeModal}>
                    <SignupPassUnconfirmed
                        revealModal={revealModal}
                        closeModal={closeModal} />
                </Modal>
                <Modal modalType={"passRecovery"}
                    scrollLock={scrollLock}
                    current={current}
                    layout={2}
                    isOpen={modalsState.passRecovery}
                    onClose={closeModal}>
                    <PassRecovery
                        revealModal={revealModal}
                        closeModal={closeModal} />
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
