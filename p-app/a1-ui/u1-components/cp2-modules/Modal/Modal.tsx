import { FC, useEffect, MouseEvent, useState, useRef, useLayoutEffect } from "react"

import Button from "../../cp1-elements/el02-Button/Button"
import { TModal } from "./Modals"

type TModalProps = {
    isOpen: boolean
    modalType: string
    current: TModal
    scrollLock: boolean
    onClose: (modalType: string) => void
}

export const Modal: FC<TModalProps> = ({ isOpen, modalType, current, scrollLock, onClose, children }) => {

    const handleCloseClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        onClose(modalType)
        e.preventDefault()
    }
    const body = useRef(null as unknown as HTMLDivElement)

    useLayoutEffect(() => {
        if (body.current) {
            if (scrollLock) {
                    body.current.style.overflow = "hidden"
                    body.current.style.paddingLeft = 10 + "px"
                } else {
                    body.current.style.overflow = "auto"
                    const width = body.current.clientWidth
                    body.current.classList.add("scrollbarOff")
                    if (body && isOpen) {
                        if (width < window.innerWidth) {
                            body.current.style.paddingLeft = (window.innerWidth - width + 10) + "px"
                            body.current.style.paddingRight = (window.innerWidth - width + 10) + "px"
                            setTimeout(() => {
                                body.current.classList.remove("scrollbarOff")
                                body.current.style.paddingRight = 10 + "px"
                            }, 10)
                        } else {
                            body.current.style.paddingLeft = 10 + "px"
                            body.current.style.paddingRight = 10 + "px"
                            body.current.style.overflow = "hidden"
                        }
                    } //else {
                      //  body.current.style.paddingLeft = 10 + "px"
                     //   body.current.style.paddingRight = 10 + "px"
                  //  }    
                }
        }
    }, [scrollLock])

    let currentStyle = `${(current === modalType || isOpen) && "_current"}`
    currentStyle = `${currentStyle} ${(current === modalType && !isOpen) && "_closing"}`
    currentStyle = `${currentStyle} ${scrollLock && "_scrollLock"}`

    return (
        <div className={`modal__area`}>
            <div ref={body} onClick={handleCloseClick}
                className={`modal__body ${currentStyle}`}>
                <div className={`modal__paper ${currentStyle}`} onClick={(e) => e.stopPropagation()}>
                    <Button
                        mode="icon"
                        variant="cancel"
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "5px",
                            fontSize: "40px"
                        }}
                        onClick={handleCloseClick}>&times;</Button>
                    {children}
                </div>
            </div>
        </div>
    )
}