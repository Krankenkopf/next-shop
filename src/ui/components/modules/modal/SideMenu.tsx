/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect, MouseEvent, useRef, useLayoutEffect } from 'react';

import { Button } from '../../elements';

import css from './Modal.module.scss';
import { TModal } from './Modals';

type TSideMenuProps = {
  side: 'left' | 'right';
  isOpen: boolean;
  modalType: TModal;
  current: TModal;
  scrollLock: boolean;
  isFreezed?: boolean;
  layout?: number;
  onClose?: (modalType: TModal) => void;
};

export const SideMenu: FC<TSideMenuProps> = ({
  side,
  isOpen,
  modalType,
  current,
  scrollLock,
  layout,
  onClose,
  children,
}) => {
  const handleCloseClick = (e: MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    onClose && onClose(modalType);
    e.preventDefault();
  };
  const body = useRef(null as unknown as HTMLDivElement);

  useLayoutEffect(() => {
    // this because on closing modal with scrollbar animation begin faster than
    // applying overflow hidden => glitch - scrollbar curved.. kurwa!
    // for all modals in container Modals
    if (body.current) {
      // opening | closing | idle
      if (scrollLock) {
        // opening | closing
        // body.current.style.overflow = "hidden"
        // body.current.style.paddingLeft = 10 + "px"
      } else {
        // idle
        body.current.style.overflow = 'auto'; // need to calc scrollbar width
        const width = body.current.clientWidth;

        if (body && isOpen) {
          // idle modal in view, other modals not affected
          if (width < window.innerWidth) {
            // scrollbar will provided
            // body.current.classList.add(css.scrollbarOff)  // scrollbar width: 0
            // body.current.style.paddingLeft = (window.innerWidth - width + 10) + "px"
            // body.current.style.paddingRight = (window.innerWidth - width + 10) + "px"
            setTimeout(() => {
              // without this manipulations with style scrollbarOff,
              // scrollbar will appear faster that left padding => visible glitch
              // body.current.classList.remove(css.scrollbarOff)
              // body.current.style.paddingRight = 10 + "px"
            }, 10);
          } else {
            // no need scrollbar, applied paddings are equal to described in styles
            // body.current.style.paddingLeft = 10 + "px"
            // body.current.style.paddingRight = 10 + "px"
          }
        }
      }
    } // logic is render-dependant. changing window size not lead to recalc styles
  }, [scrollLock]); // if need such functionality - use and implement (in any way i don't understand) windowSize hook

  let currentStyle = `${(current === modalType || isOpen) && css._current}`; // idle view
  currentStyle = `${currentStyle} ${current === modalType && !isOpen && css._closing}`; // closing transition
  currentStyle = `${currentStyle} ${scrollLock && css._scrollLock}`;

  const paperStyle = `${css.modal__paper} ${css.side} ${css[side]} ${
    layout === 2 && css._upper
  }`;

  return (
    <div className={css.modal__area}>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        ref={body}
        onClick={handleCloseClick}
        className={`${css.modal__body} ${css.side} ${css[side]} ${currentStyle}`}
      >
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          className={`${paperStyle} ${currentStyle}`}
          onClick={e => e.stopPropagation()}
        >
          {onClose && (
            <Button
              mode="icon"
              variant="cancel"
              style={{
                position: 'absolute',
                top: '0',
                right: '0',
                fontSize: '40px',
                zIndex: 100,
              }}
              onClick={handleCloseClick}
            >
              &times;
            </Button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
