import { FC, useEffect, MouseEvent, useRef, MutableRefObject, useState } from "react"
import ReactDOM, { createPortal } from "react-dom";
import Button from "../../cp1-elements/el02-Button/Button"

type TModalProps = {
    isOpen: boolean
    modalType: string
    onClose: (modalType: string) => void
}

export const Modal: FC<TModalProps> = ({ isOpen, modalType, onClose, children }) => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        setIsBrowser(true);
    }, []);

    const handleCloseClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()
        onClose(modalType)
    }
    console.log("Modal");

    const className = `modal ${isOpen ? "modal__revealed _lock" : ""}`

    if (isBrowser) {
        const modal = (
            <div id={modalType}
                className={className}
                onClick={handleCloseClick}
                style={{ visibility: `${isOpen ? "visible" : "hidden"}` }}>
                <div className="modal__body">
                     <div className="modal__paper" onClick={(e) => e.stopPropagation()}>
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

        const container = document.getElementById("modal-root")
        return container && ReactDOM.createPortal(
            modal,
            container
        )
    } else {
        return null;
    }
}