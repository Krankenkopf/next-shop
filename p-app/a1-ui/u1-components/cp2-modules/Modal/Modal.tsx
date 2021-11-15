import { FC, useEffect, MouseEvent, useRef, useLayoutEffect } from "react"
import css from "./Modal.module.scss"
import Button from "../../cp1-elements/el02-Button/Button"
import { TModal } from "./Modals"

type TModalProps = {
    isOpen: boolean
    modalType: string
    current: TModal
    scrollLock: boolean
    onClose?: (modalType: string) => void
}

export const Modal: FC<TModalProps> = ({ isOpen, modalType, current, scrollLock, onClose, children }) => {

    const handleCloseClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        onClose && onClose(modalType)
        e.preventDefault()
    }
    const body = useRef(null as unknown as HTMLDivElement)

    useLayoutEffect(() => { // this because on closing modal with scrollbar animation begin faster than
                            // applying overflow hidden => glitch - scrollbar curved.. kurwa! 
        // for all modals in container Modals
        if (body.current) { // opening | closing | idle
            if (scrollLock) { // opening | closing
                body.current.style.overflow = "hidden" 
                body.current.style.paddingLeft = 10 + "px"
            } else {            // idle
                body.current.style.overflow = "auto"    // need to calc scrollbar width
                const width = body.current.clientWidth
               
                if (body && isOpen) {  // idle modal in view, other modals not affected
                    if (width < window.innerWidth) {   // scrollbar will provided
                        body.current.classList.add(css.scrollbarOff)  // scrollbar width: 0
                        body.current.style.paddingLeft = (window.innerWidth - width + 10) + "px"
                        body.current.style.paddingRight = (window.innerWidth - width + 10) + "px"
                        setTimeout(() => { // without this manipulations with style scrollbarOff,
                                        // scrollbar will appear faster that left padding => visible glitch
                            body.current.classList.remove(css.scrollbarOff)
                            body.current.style.paddingRight = 10 + "px"
                        }, 10)
                    } else {  // no need scrollbar, applied paddings are equal to described in styles
                        body.current.style.paddingLeft = 10 + "px"
                        body.current.style.paddingRight = 10 + "px"
                    }
                }
            }
        }       // logic is render-dependant. changing window size not lead to recalc styles        
    }, [scrollLock]) // if need such functionality - use and implement (in any way i don't understand) windowSize hook
                    
    let currentStyle = `${(current === modalType || isOpen) && css._current}`
    currentStyle = `${currentStyle} ${(current === modalType && !isOpen) && css._closing}`
    currentStyle = `${currentStyle} ${scrollLock && css._scrollLock}`

    return (
        <div className={css.modal__area}>
            <div ref={body} onClick={handleCloseClick}
                className={`${css.modal__body} ${currentStyle}`}>
                <div className={`${css.modal__paper} ${currentStyle}`} onClick={(e) => e.stopPropagation()}>
                    {onClose && <Button
                        mode="icon"
                        variant="cancel"
                        style={{
                            position: "absolute",
                            top: "0",
                            right: "0",
                            fontSize: "40px"
                        }}
                        onClick={handleCloseClick}>&times;</Button>}
                    {children}
                </div>
            </div>
        </div>
    )
}